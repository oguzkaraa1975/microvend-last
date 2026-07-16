// A11 güvenlik turu: /basvuru formunun tek yazma yolu. applications tablosuna
// anon/authenticated INSERT erişimi kapatıldı (bkz. 0003 migration) — bu
// fonksiyon service_role client ile yazar. Güvenlik katmanları: Turnstile
// (action + hostname doğrulamalı), sunucu tarafı allowlist doğrulama, Postgres
// tabanlı IP-hash rate-limit. CORS yalnızca header hijyeni için uygulanır,
// güvenlik sınırı olarak kabul edilmez.
import { createClient } from "npm:@supabase/supabase-js@2.110.6";

const GENERIC_ERROR = "Başvuru gönderilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;
const TURNSTILE_ACTION = "submit_application";
const ALLOWED_CATEGORY_SLUGS = new Set([
  "seramik",
  "ev-yasam",
  "tekstil",
  "taki",
  "dogal-urunler",
  "kirtasiye",
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_STRING_FIELDS = [
  "fullName",
  "brandName",
  "categorySlug",
  "city",
  "email",
  "description",
  "turnstileToken",
] as const;
const OPTIONAL_STRING_FIELDS = ["phone", "instagram", "website"] as const;
const ALLOWED_KEYS = new Set<string>([...REQUIRED_STRING_FIELDS, ...OPTIONAL_STRING_FIELDS]);

type ValidatedApplication = {
  fullName: string;
  brandName: string;
  categorySlug: string;
  city: string;
  email: string;
  description: string;
  turnstileToken: string;
  phone: string | null;
  instagram: string | null;
  website: string | null;
};

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");
const RATE_LIMIT_SALT = Deno.env.get("RATE_LIMIT_SALT");
const ALLOWED_ORIGINS_RAW = Deno.env.get("ALLOWED_ORIGINS");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CONFIG_READY = Boolean(TURNSTILE_SECRET_KEY && RATE_LIMIT_SALT && ALLOWED_ORIGINS_RAW);

const ALLOWED_ORIGINS = (ALLOWED_ORIGINS_RAW ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const ALLOWED_HOSTNAMES = ALLOWED_ORIGINS.map((origin) => {
  try {
    return new URL(origin).hostname;
  } catch {
    return null;
  }
}).filter((hostname): hostname is string => Boolean(hostname));

// service_role client: yalnızca bu fonksiyon içinde kullanılır, gelen isteğin
// Authorization header'ı asla bu client'a aktarılmaz. SUPABASE_URL ve
// SUPABASE_SERVICE_ROLE_KEY, Supabase platformu tarafından her Edge
// Function'a otomatik enjekte edilir.
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function jsonResponse(status: number, body: unknown, extraHeaders: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

function buildCorsHeaders(origin: string | null): HeadersInit {
  const headers: Record<string, string> = { Vary: "Origin" };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Headers"] = "authorization, x-client-info, apikey, content-type";
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
  }

  return headers;
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function validateBody(body: unknown): { data: ValidatedApplication } | { error: string } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { error: "Geçersiz istek gövdesi." };
  }

  const record = body as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    if (!ALLOWED_KEYS.has(key)) {
      return { error: `Beklenmeyen alan: ${key}` };
    }
  }

  for (const key of REQUIRED_STRING_FIELDS) {
    if (typeof record[key] !== "string" || !(record[key] as string).trim()) {
      return { error: "Zorunlu alan eksik." };
    }
  }

  for (const key of OPTIONAL_STRING_FIELDS) {
    if (key in record && record[key] !== null && typeof record[key] !== "string") {
      return { error: "Geçersiz alan tipi." };
    }
  }

  const fullName = (record.fullName as string).trim();
  const brandName = (record.brandName as string).trim();
  const categorySlug = (record.categorySlug as string).trim();
  const city = (record.city as string).trim();
  const email = (record.email as string).trim();
  const description = (record.description as string).trim();
  const turnstileToken = (record.turnstileToken as string).trim();
  const phone = typeof record.phone === "string" ? record.phone.trim() : "";
  const instagram = typeof record.instagram === "string" ? record.instagram.trim() : "";
  const website = typeof record.website === "string" ? record.website.trim() : "";

  if (fullName.length < 2 || fullName.length > 120) {
    return { error: "Ad soyad geçersiz." };
  }
  if (brandName.length < 2 || brandName.length > 120) {
    return { error: "Marka adı geçersiz." };
  }
  if (!ALLOWED_CATEGORY_SLUGS.has(categorySlug)) {
    return { error: "Kategori geçersiz." };
  }
  if (city.length < 2 || city.length > 80) {
    return { error: "Şehir geçersiz." };
  }
  if (email.length > 200 || !EMAIL_PATTERN.test(email)) {
    return { error: "E-posta geçersiz." };
  }
  if (phone.length > 30) {
    return { error: "Telefon geçersiz." };
  }
  if (instagram.length > 120) {
    return { error: "Instagram geçersiz." };
  }
  if (website.length > 300) {
    return { error: "Web sitesi geçersiz." };
  }
  if (description.length < 10 || description.length > 2000) {
    return { error: "Açıklama geçersiz." };
  }
  if (!turnstileToken) {
    return { error: "Güvenlik doğrulaması eksik." };
  }

  return {
    data: {
      fullName,
      brandName,
      categorySlug,
      city,
      email,
      description,
      turnstileToken,
      phone: phone || null,
      instagram: instagram || null,
      website: website || null,
    },
  };
}

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const params = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY as string,
    response: token,
  });
  if (remoteIp !== "unknown") {
    params.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success?: boolean;
    action?: string;
    hostname?: string;
  };

  return Boolean(
    result.success &&
      result.action === TURNSTILE_ACTION &&
      result.hostname &&
      ALLOWED_HOSTNAMES.includes(result.hostname)
  );
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" }, { ...corsHeaders, Allow: "POST, OPTIONS" });
  }

  if (!CONFIG_READY) {
    return jsonResponse(500, { error: GENERIC_ERROR }, corsHeaders);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "Geçersiz istek gövdesi." }, corsHeaders);
  }

  const validation = validateBody(body);
  if ("error" in validation) {
    return jsonResponse(400, { error: validation.error }, corsHeaders);
  }

  const application = validation.data;
  const clientIp = getClientIp(req);

  const turnstileOk = await verifyTurnstile(application.turnstileToken, clientIp);
  if (!turnstileOk) {
    return jsonResponse(403, { error: "Güvenlik doğrulaması başarısız." }, corsHeaders);
  }

  const ipHash = await hashIp(clientIp, RATE_LIMIT_SALT as string);

  const { data: withinLimit, error: rateLimitError } = await supabaseAdmin.rpc(
    "check_application_rate_limit",
    {
      p_ip_hash: ipHash,
      p_limit: RATE_LIMIT_MAX,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
    }
  );

  if (rateLimitError) {
    return jsonResponse(500, { error: GENERIC_ERROR }, corsHeaders);
  }

  if (!withinLimit) {
    return jsonResponse(429, { error: "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin." }, corsHeaders);
  }

  const { error: insertError } = await supabaseAdmin.from("applications").insert({
    full_name: application.fullName,
    brand_name: application.brandName,
    category_slug: application.categorySlug,
    city: application.city,
    email: application.email,
    phone: application.phone,
    instagram: application.instagram,
    website: application.website,
    description: application.description,
  });

  if (insertError) {
    return jsonResponse(500, { error: GENERIC_ERROR }, corsHeaders);
  }

  return jsonResponse(200, { ok: true }, corsHeaders);
});
