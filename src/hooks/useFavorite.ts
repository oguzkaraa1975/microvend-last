import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/AuthContext";

export type UseFavoriteResult = {
  isFavorite: boolean;
  /** İlk durum Supabase'den yükleniyor. */
  loading: boolean;
  /** Ekleme/çıkarma isteği sürüyor — buton kilitli tutulur. */
  saving: boolean;
  error: string;
  /** Hedef duruma getirir (toggle değil): true = favoride olsun, false = olmasın. */
  setFavorite: (desired: boolean) => Promise<void>;
};

const GENEL_HATA = "İşlem şu anda tamamlanamadı. Lütfen tekrar deneyin.";

// Sonuç, sorgu kimliğiyle (userId + sellerId) saklanır; isFavorite/loading
// render'da türetilir — effect gövdesinde senkron setState yok.
type FavoriSonucu = {
  userId: string;
  sellerId: string;
  isFavorite: boolean;
};

export function useFavorite(sellerId: string): UseFavoriteResult {
  const { user } = useAuth();
  const [sonuc, setSonuc] = useState<FavoriSonucu | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const userId = user?.id ?? "";

  const guncel =
    sonuc && sonuc.userId === userId && sonuc.sellerId === sellerId
      ? sonuc
      : null;

  const isFavorite = Boolean(guncel?.isFavorite);
  const loading = Boolean(supabase && userId && sellerId && !guncel);

  useEffect(() => {
    if (!supabase || !userId || !sellerId) return;

    let iptal = false;

    supabase
      .from("favorites")
      .select("seller_id")
      .eq("seller_id", sellerId)
      .maybeSingle()
      .then(({ data, error: sorguHatasi }) => {
        if (iptal) return;

        if (sorguHatasi) {
          setError(GENEL_HATA);
          setSonuc({ userId, sellerId, isFavorite: false });
          return;
        }

        setError("");
        setSonuc({ userId, sellerId, isFavorite: Boolean(data) });
      });

    return () => {
      iptal = true;
    };
  }, [userId, sellerId]);

  async function setFavorite(desired: boolean) {
    if (!supabase || !userId || !sellerId || saving) return;

    setSaving(true);
    setError("");

    // user_id gönderilmez: sütun grant edilmedi, sunucu default auth.uid() doldurur.
    const { error: istekHatasi } = desired
      ? await supabase.from("favorites").insert({ seller_id: sellerId })
      : await supabase.from("favorites").delete().eq("seller_id", sellerId);

    // 23505 (duplicate insert): satır zaten var, istenen durum sağlanmış — hata değil.
    if (istekHatasi && istekHatasi.code !== "23505") {
      setError(GENEL_HATA);
    } else {
      setSonuc({ userId, sellerId, isFavorite: desired });
    }

    setSaving(false);
  }

  return { isFavorite, loading, saving, error, setFavorite };
}
