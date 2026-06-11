export type Kategori = {
  isim: string;
  slug: string;
};

export const kategoriler: Kategori[] = [
  { isim: "El Yapımı", slug: "seramik" },
  { isim: "Ev Dekorasyonu", slug: "dekorasyon" },
  { isim: "Moda", slug: "moda" },
  { isim: "Takı", slug: "taki" },
  { isim: "Organik Ürünler", slug: "dogal-urunler" },
  { isim: "Sanat & Tasarım", slug: "sanat" },
];

export type Satici = {
  isim: string;
  slug: string;
  kategori: string;
  sehir: string;
  aciklama: string;
  etiketler: string[];
  kapakGorseli: string;
  logo: string;
  instagram: string;
  whatsapp: string;
  website: string;
  kurulusYili: number;
  konum: string;
  hikaye: string;
};

export const saticilar: Satici[] = [
  {
    isim: "Luna Atölye",
    slug: "luna-atolye",
    kategori: "El Yapımı",
    sehir: "İstanbul",
    aciklama:
      "Modern yaşam alanları için üretilen minimalist seramik ürünler.",
    etiketler: ["Seramik", "El yapımı", "Minimal"],
    kapakGorseli:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=80",
    logo: "https://images.unsplash.com/photo-1578746353430-b0968754cc13?auto=format&fit=crop&w=200&h=200&q=80",
    instagram: "https://instagram.com/lunaatolye",
    whatsapp: "https://wa.me/905321234567",
    website: "https://lunaatolye.com",
    kurulusYili: 2019,
    konum: "Kadıköy, İstanbul",
    hikaye:
      "Luna Atölye, seramik sanatına duyulan tutkuyla küçük bir atölyede doğdu. Her parça elde şekillendirilir, doğal sırlarla kaplanır ve sınırlı sayıda üretilir. Amacımız, günlük yaşamın içine sakin ve zamansız objeler yerleştirmek.",
  },

  {
    isim: "North Craft",
    slug: "north-craft",
    kategori: "Ev Dekorasyonu",
    sehir: "Ankara",
    aciklama:
      "Doğal ahşap ve premium dekoratif yaşam ürünleri üreten butik marka.",
    etiketler: ["Ahşap", "Dekorasyon", "Doğal"],
    kapakGorseli:
      "https://images.unsplash.com/photo-1616046229472-7d476e6222c9?auto=format&fit=crop&w=1600&q=80",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&h=200&q=80",
    instagram: "https://instagram.com/northcrafttr",
    whatsapp: "https://wa.me/905331234567",
    website: "https://northcraft.com.tr",
    kurulusYili: 2017,
    konum: "Çankaya, Ankara",
    hikaye:
      "North Craft, Anadolu'nun ahşap işçiliği geleneğini çağdaş ev dekorasyonuyla buluşturur. Her ürün, sürdürülebilir kaynaklardan seçilen malzemelerle atölyemizde tek tek işlenir. Doğallık, dayanıklılık ve sade estetik markamızın temel taşlarıdır.",
  },

  {
    isim: "Mora Studio",
    slug: "mora-studio",
    kategori: "Moda",
    sehir: "İzmir",
    aciklama:
      "Zamansız tasarımlara odaklanan bağımsız yavaş moda markası.",
    etiketler: ["Moda", "Yavaş moda", "Butik"],
    kapakGorseli:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    logo: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=200&h=200&q=80",
    instagram: "https://instagram.com/morastudio",
    whatsapp: "https://wa.me/905341234567",
    website: "https://morastudio.co",
    kurulusYili: 2020,
    konum: "Alsancak, İzmir",
    hikaye:
      "Mora Studio, hızlı modanın ötesinde, gardıroba yıllarca eşlik edecek parçalar tasarlar. Kumaş seçiminden dikiş detayına kadar her adımda kalite ve özen ön plandadır. Küçük seriler halinde üretilen koleksiyonlarımız, bireysel ifadeyi destekler.",
  },

  {
    isim: "Verde Organik",
    slug: "verde-organik",
    kategori: "Organik Ürünler",
    sehir: "Muğla",
    aciklama:
      "Küçük üreticilerden doğal, katkısız ve yerel organik ürünler.",
    etiketler: ["Organik", "Yerel", "Doğal"],
    kapakGorseli:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80",
    logo: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=200&h=200&q=80",
    instagram: "https://instagram.com/verdeorganik",
    whatsapp: "https://wa.me/905351234567",
    website: "https://verdeorganik.com",
    kurulusYili: 2018,
    konum: "Fethiye, Muğla",
    hikaye:
      "Verde Organik, Ege'nin verimli topraklarında yetişen ürünleri doğrudan üreticiden sofranıza ulaştırır. Kimyasal gübre ve katkı maddesi kullanılmadan yetiştirilen ürünler, mevsimsel hasat döngüsüne uygun şekilde sunulur. Yerel ekonomiyi desteklemek misyonumuzun merkezindedir.",
  },

  {
    isim: "Atelier Moni",
    slug: "atelier-moni",
    kategori: "Takı",
    sehir: "Eskişehir",
    aciklama:
      "Minimal ve modern çizgilere sahip el yapımı takı koleksiyonları.",
    etiketler: ["Takı", "Minimal", "El yapımı"],
    kapakGorseli:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    logo: "https://images.unsplash.com/photo-1611591437281-460bfac7a2c2?auto=format&fit=crop&w=200&h=200&q=80",
    instagram: "https://instagram.com/ateliermoni",
    whatsapp: "https://wa.me/905361234567",
    website: "https://ateliermoni.com",
    kurulusYili: 2021,
    konum: "Odunpazarı, Eskişehir",
    hikaye:
      "Atelier Moni, günlük hayatta taşınabilir sanat parçaları yaratmayı hedefler. Her takı, el işçiliğiyle şekillendirilir ve dayanıklı malzemelerle tamamlanır. Minimal formlar, güçlü ifade arayan modern kadınlar için tasarlanır.",
  },

  {
    isim: "Nora Wear",
    slug: "nora-wear",
    kategori: "Moda",
    sehir: "İstanbul",
    aciklama:
      "Küçük ölçekli üretim yapan bağımsız kadın giyim markası.",
    etiketler: ["Moda", "Kadın giyim", "Butik"],
    kapakGorseli:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=200&h=200&q=80",
    instagram: "https://instagram.com/norawear",
    whatsapp: "https://wa.me/905371234567",
    website: "https://norawear.com",
    kurulusYili: 2022,
    konum: "Beşiktaş, İstanbul",
    hikaye:
      "Nora Wear, kadınların kendilerini özgürce ifade edebileceği parçalar üretir. Atölyemizde her koleksiyon sınırlı adetlerle hazırlanır; kalıp israfını azaltmak ve bilinçli tüketimi desteklemek önceliğimizdir. Konfor, zarafet ve sürdürülebilir üretim bir arada.",
  },
];
