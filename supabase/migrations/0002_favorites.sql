-- A10: favoriler tablosu — yalnız authenticated, satır sahipliği RLS + sütun bazlı grant.
-- Supabase SQL Editor'de veya CLI ile elle çalıştırılır.

create table public.favorites (
  -- Sunucu kontrollü: istemci user_id göndermez (sütun grant edilmez), default doldurur.
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  -- Kanonik metin id'ler (s1…); sellers tablosu henüz yok, FK data-layer aşamasında eklenir.
  seller_id text not null
    check (char_length(seller_id) between 1 and 64),
  created_at timestamptz not null default now(),
  primary key (user_id, seller_id)
);

alter table public.favorites enable row level security;

-- Satır sahipliği üç işlemde de auth.uid(); UPDATE policy'si bilerek yok.
create policy favorites_select
  on public.favorites
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy favorites_insert
  on public.favorites
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy favorites_delete
  on public.favorites
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Anon'a hiçbir yetki yok; authenticated'a UPDATE ve user_id/created_at insert'i grant edilmez.
revoke all on public.favorites from anon, authenticated;
grant select on public.favorites to authenticated;
grant insert (seller_id) on public.favorites to authenticated;
grant delete on public.favorites to authenticated;
