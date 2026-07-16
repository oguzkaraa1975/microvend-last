-- A11 güvenlik turu: applications tablosuna doğrudan anon/authenticated INSERT
-- erişimi kapatılır. Tek yazma yolu artık submit-application Edge Function'ı
-- (service_role client) olur; CHECK kısıtları son savunma katmanı olarak kalır.

drop policy if exists applications_anon_insert on public.applications;

revoke all on public.applications from anon, authenticated;
