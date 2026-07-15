-- A9: başvuru tablosu — anon için yalnızca insert, RLS + sütun bazlı grant + CHECK kısıtları.
-- Supabase SQL Editor'de veya CLI ile elle çalıştırılır.

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),

  full_name text not null
    check (char_length(trim(full_name)) between 2 and 120),
  brand_name text not null
    check (char_length(trim(brand_name)) between 2 and 120),
  category_slug text not null
    check (category_slug in ('seramik', 'ev-yasam', 'tekstil', 'taki', 'dogal-urunler', 'kirtasiye')),
  city text not null
    check (char_length(trim(city)) between 2 and 80),
  email text not null
    check (char_length(email) <= 200 and email like '%_@_%._%'),
  phone text
    check (phone is null or char_length(phone) <= 30),
  instagram text
    check (instagram is null or char_length(instagram) <= 120),
  website text
    check (website is null or char_length(website) <= 300),
  description text not null
    check (char_length(trim(description)) between 10 and 2000)
);

alter table public.applications enable row level security;

-- Anon yalnız insert; select/update/delete policy'si yok.
create policy applications_anon_insert
  on public.applications
  for insert
  to anon
  with check (true);

-- Sütun bazlı grant: id/status/created_at anon'a asla grant edilmez.
revoke all on public.applications from anon, authenticated;
grant insert (
  full_name, brand_name, category_slug, city, email,
  phone, instagram, website, description
) on public.applications to anon;
