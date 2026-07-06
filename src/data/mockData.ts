export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sellerCount: number;
  featured: boolean;
};

export type Seller = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  city: string;
  shortDescription: string;
  fullDescription: string;
  story: string;
  coverImage: string;
  logoImage: string;
  tags: string[];
  instagramUrl: string;
  whatsappUrl: string;
  websiteUrl: string;
  featured: boolean;
  planType: "silver" | "gold" | "premium";
  foundedYear: number;
  location: string;
};

export const sellers: Seller[] = [
  {
    id: "s1",
    slug: "luna-atolye",
    name: "Luna Atölye",
    categoryId: "c1",
    categoryName: "El Yapımı",
    city: "İstanbul",
    shortDescription:
      "Modern yaşam alanları için üretilen minimalist seramik ürünler.",
    fullDescription:
      "Luna Atölye, modern yaşam alanları için minimalist seramik ürünler üretir. Her parça elde şekillendirilir ve sınırlı sayıda hazırlanır.",
    story:
      "Luna Atölye, seramik sanatına duyulan tutkuyla küçük bir atölyede doğdu. Her parça elde şekillendirilir, doğal sırlarla kaplanır ve sınırlı sayıda üretilir. Amacımız, günlük yaşamın içine sakin ve zamansız objeler yerleştirmek.",
    coverImage:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=200&h=200&q=80",
    instagramUrl: "https://instagram.com/lunaatolye",
    whatsappUrl: "https://wa.me/905321234567",
    websiteUrl: "https://lunaatolye.com",
    featured: true,
    planType: "premium",
    foundedYear: 2019,
    location: "Kadıköy, İstanbul",
    tags: ["Seramik", "El yapımı", "Minimal"],
  },

  {
    id: "s2",
    slug: "north-craft",
    name: "North Craft",
    categoryId: "c2",
    categoryName: "Ev Dekorasyonu",
    city: "Ankara",
    shortDescription:
      "Doğal ahşap ve premium dekoratif yaşam ürünleri üreten butik marka.",
    fullDescription:
      "North Craft, doğal ahşap ve premium dekoratif yaşam ürünleri üreten butik bir markadır. Sürdürülebilir malzeme seçimi ve sade estetik ön plandadır.",
    story:
      "North Craft, Anadolu'nun ahşap işçiliği geleneğini çağdaş ev dekorasyonuyla buluşturur. Her ürün, sürdürülebilir kaynaklardan seçilen malzemelerle atölyemizde tek tek işlenir. Doğallık, dayanıklılık ve sade estetik markamızın temel taşlarıdır.",
    coverImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&h=200&q=80",
    instagramUrl: "https://instagram.com/northcrafttr",
    whatsappUrl: "https://wa.me/905331234567",
    websiteUrl: "https://northcraft.com.tr",
    featured: true,
    planType: "gold",
    foundedYear: 2017,
    location: "Çankaya, Ankara",
    tags: ["Ahşap", "Dekorasyon", "Doğal"],
  },

  {
    id: "s3",
    slug: "mora-studio",
    name: "Mora Studio",
    categoryId: "c3",
    categoryName: "Moda",
    city: "İzmir",
    shortDescription:
      "Zamansız tasarımlara odaklanan bağımsız yavaş moda markası.",
    fullDescription:
      "Mora Studio, zamansız tasarımlara odaklanan bağımsız bir yavaş moda markasıdır. Koleksiyonlar küçük seriler halinde üretilir.",
    story:
      "Mora Studio, hızlı modanın ötesinde, gardıroba yıllarca eşlik edecek parçalar tasarlar. Kumaş seçiminden dikiş detayına kadar her adımda kalite ve özen ön plandadır. Küçük seriler halinde üretilen koleksiyonlarımız, bireysel ifadeyi destekler.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=200&h=200&q=80",
    instagramUrl: "https://instagram.com/morastudio",
    whatsappUrl: "https://wa.me/905341234567",
    websiteUrl: "https://morastudio.co",
    featured: true,
    planType: "gold",
    foundedYear: 2020,
    location: "Alsancak, İzmir",
    tags: ["Moda", "Yavaş moda", "Butik"],
  },

  {
    id: "s4",
    slug: "verde-organik",
    name: "Verde Organik",
    categoryId: "c5",
    categoryName: "Organik Ürünler",
    city: "Muğla",
    shortDescription:
      "Küçük üreticilerden doğal, katkısız ve yerel organik ürünler.",
    fullDescription:
      "Verde Organik, küçük üreticilerden doğal, katkısız ve yerel organik ürünleri doğrudan sofranıza ulaştırır. Ürünler mevsimsel hasat döngüsüne göre sunulur.",
    story:
      "Verde Organik, Ege'nin verimli topraklarında yetişen ürünleri doğrudan üreticiden sofranıza ulaştırır. Kimyasal gübre ve katkı maddesi kullanılmadan yetiştirilen ürünler, mevsimsel hasat döngüsüne uygun şekilde sunulur. Yerel ekonomiyi desteklemek misyonumuzun merkezindedir.",
    coverImage:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=200&h=200&q=80",
    instagramUrl: "https://instagram.com/verdeorganik",
    whatsappUrl: "https://wa.me/905351234567",
    websiteUrl: "https://verdeorganik.com",
    featured: false,
    planType: "silver",
    foundedYear: 2018,
    location: "Fethiye, Muğla",
    tags: ["Organik", "Yerel", "Doğal"],
  },

  {
    id: "s5",
    slug: "atelier-moni",
    name: "Atelier Moni",
    categoryId: "c4",
    categoryName: "Takı",
    city: "Eskişehir",
    shortDescription:
      "Minimal ve modern çizgilere sahip el yapımı takı koleksiyonları.",
    fullDescription:
      "Atelier Moni, minimal ve modern çizgilere sahip el yapımı takı koleksiyonları hazırlar. Her parça el işçiliğiyle şekillendirilir.",
    story:
      "Atelier Moni, günlük hayatta taşınabilir sanat parçaları yaratmayı hedefler. Her takı, el işçiliğiyle şekillendirilir ve dayanıklı malzemelerle tamamlanır. Minimal formlar, güçlü ifade arayan modern kadınlar için tasarlanır.",
    coverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&h=200&q=80",
    instagramUrl: "https://instagram.com/ateliermoni",
    whatsappUrl: "https://wa.me/905361234567",
    websiteUrl: "https://ateliermoni.com",
    featured: false,
    planType: "silver",
    foundedYear: 2021,
    location: "Odunpazarı, Eskişehir",
    tags: ["Takı", "Minimal", "El yapımı"],
  },

  {
    id: "s6",
    slug: "nora-wear",
    name: "Nora Wear",
    categoryId: "c3",
    categoryName: "Moda",
    city: "İstanbul",
    shortDescription:
      "Küçük ölçekli üretim yapan bağımsız kadın giyim markası.",
    fullDescription:
      "Nora Wear, küçük ölçekli üretim yapan bağımsız bir kadın giyim markasıdır. Koleksiyonlar sınırlı adetlerle, bilinçli tüketimi destekleyecek şekilde hazırlanır.",
    story:
      "Nora Wear, kadınların kendilerini özgürce ifade edebileceği parçalar üretir. Atölyemizde her koleksiyon sınırlı adetlerle hazırlanır; kalıp israfını azaltmak ve bilinçli tüketimi desteklemek önceliğimizdir. Konfor, zarafet ve sürdürülebilir üretim bir arada.",
    coverImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=200&h=200&q=80",
    instagramUrl: "https://instagram.com/norawear",
    whatsappUrl: "https://wa.me/905371234567",
    websiteUrl: "https://norawear.com",
    featured: false,
    planType: "silver",
    foundedYear: 2022,
    location: "Beşiktaş, İstanbul",
    tags: ["Moda", "Kadın giyim", "Butik"],
  },
];

const categoryDefinitions: Omit<Category, "sellerCount">[] = [
  {
    id: "c1",
    slug: "seramik",
    name: "El Yapımı",
    description:
      "El Yapımı alanındaki butik markaları, bağımsız üreticileri ve mikro ölçekli işletmeleri keşfedin.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c2",
    slug: "dekorasyon",
    name: "Ev Dekorasyonu",
    description:
      "Ev Dekorasyonu alanındaki butik markaları, bağımsız üreticileri ve mikro ölçekli işletmeleri keşfedin.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c3",
    slug: "moda",
    name: "Moda",
    description:
      "Moda alanındaki butik markaları, bağımsız üreticileri ve mikro ölçekli işletmeleri keşfedin.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c4",
    slug: "taki",
    name: "Takı",
    description:
      "Takı alanındaki butik markaları, bağımsız üreticileri ve mikro ölçekli işletmeleri keşfedin.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c5",
    slug: "dogal-urunler",
    name: "Organik Ürünler",
    description:
      "Organik Ürünler alanındaki butik markaları, bağımsız üreticileri ve mikro ölçekli işletmeleri keşfedin.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c6",
    slug: "sanat",
    name: "Sanat & Tasarım",
    description:
      "Sanat & Tasarım alanındaki butik markaları, bağımsız üreticileri ve mikro ölçekli işletmeleri keşfedin.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
];

export const categories: Category[] = categoryDefinitions.map((category) => ({
  ...category,
  sellerCount: sellers.filter((seller) => seller.categoryId === category.id)
    .length,
}));
