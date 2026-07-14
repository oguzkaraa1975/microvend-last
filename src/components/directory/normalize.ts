// Aksan/harf toleranslı arama normalizasyonu.
// URL'deki kullanıcı sorgusu DEĞİŞMEZ; bu fonksiyon yalnız eşleştirme anında
// hem sorguyu hem aranabilir içeriği aynı biçime indirger. Böylece aksansız
// klavye kullanımı da eşleşir: "atolye" -> "Atölye", "kagit" -> "Kağıt",
// "dogal" -> "Doğal", "kisiye ozel" -> "Kişiye özel".
export function normalizeSearch(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    // birleşik aksan işaretlerini (combining diacritical marks) kaldır
    .replace(/[̀-ͯ]/g, "")
    // Türkçe noktasız "ı" harfini "i" ile eşle
    .replace(/ı/g, "i")
    .trim()
    // birden fazla boşluğu tek boşluğa indir
    .replace(/\s+/g, " ");
}
