-- A11 güvenlik turu: başvuru formu için Postgres tabanlı, atomik IP-hash +
-- zaman penceresi rate-limit sayacı. Ham IP hiçbir yerde saklanmaz; Edge
-- Function HMAC-SHA256(ip, RATE_LIMIT_SALT) ile hash'leyip yalnızca hash'i
-- gönderir. Sayaç private şemada, yalnızca service_role erişebilir (RLS +
-- grant yok; ayrıca private şeması PostgREST'e açık değildir).

create schema if not exists private;

create table private.application_rate_limit (
  ip_hash text not null,
  window_bucket bigint not null,
  request_count integer not null default 0,
  primary key (ip_hash, window_bucket)
);

alter table private.application_rate_limit enable row level security;

revoke all on private.application_rate_limit from public, anon, authenticated;

-- Atomik increment+kontrol: pencere ve zaman tamamen sunucu tarafında now()
-- ile hesaplanır, istemciden hiçbir zaman değeri kabul edilmez.
create or replace function public.check_application_rate_limit(
  p_ip_hash text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_bucket bigint;
  v_count integer;
begin
  v_bucket := floor(extract(epoch from now()) / p_window_seconds)::bigint;

  -- Not: on conflict do update içinde hedef tablonun bu bağlamdaki geçerli
  -- takma adı şema önekisiz "application_rate_limit"tir; şema önekiyle
  -- yazmak (private.application_rate_limit.request_count) çözümlenemez.
  insert into private.application_rate_limit (ip_hash, window_bucket, request_count)
  values (p_ip_hash, v_bucket, 1)
  on conflict (ip_hash, window_bucket)
    do update set request_count = application_rate_limit.request_count + 1
  returning request_count into v_count;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.check_application_rate_limit(text, integer, integer) from public;
revoke execute on function public.check_application_rate_limit(text, integer, integer) from anon, authenticated;
grant execute on function public.check_application_rate_limit(text, integer, integer) to service_role;
