export type ShippingScope = "local" | "regional" | "nationwide";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sellerCount: number;
  featured: boolean;
};

export type SellerGalleryImage = {
  url: string;
  alt: string;
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
  galleryImages: SellerGalleryImage[];
  tags: string[];
  instagramUrl: string;
  whatsappUrl: string;
  websiteUrl: string;
  featured: boolean;
  planType: "silver" | "gold" | "premium";
  foundedYear: number;
  location: string;
  joinedAt: string;
  shippingScope: ShippingScope;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  intro: string;
  coverImage: string;
  sellerIds: string[];
  sponsored: boolean;
  publishedAt: string;
};

export type FeaturedStory = {
  sellerId: string;
  title: string;
  excerpt: string;
  quote?: string;
  image: string;
};

export const sellers: Seller[] = [
  {
    id: "s1",
    slug: "luna-atolye",
    name: "Luna Atölye",
    categoryId: "c1",
    categoryName: "Seramik",
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
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=80",
        alt: "El yapımı seramik şekillendirme",
      },
      {
        url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
        alt: "Minimalist seramik vazolar",
      },
      {
        url: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
        alt: "Sade seramik servis ürünleri",
      },
    ],
    instagramUrl: "https://instagram.com/lunaatolye",
    whatsappUrl: "https://wa.me/905321234567",
    websiteUrl: "https://lunaatolye.com",
    featured: true,
    planType: "premium",
    foundedYear: 2019,
    location: "Kadıköy, İstanbul",
    joinedAt: "2025-09-12",
    shippingScope: "nationwide",
    tags: ["Seramik", "El yapımı", "Minimal", "Hediyelik"],
  },

  {
    id: "s2",
    slug: "north-craft",
    name: "North Craft",
    categoryId: "c2",
    categoryName: "Ev & Yaşam",
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
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
        alt: "Doğal ahşap yaşam ürünleri",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
        alt: "Modern ev dekorasyonu detayı",
      },
      {
        url: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=900&q=80",
        alt: "Ahşap doku ve el işçiliği",
      },
    ],
    instagramUrl: "https://instagram.com/northcrafttr",
    whatsappUrl: "https://wa.me/905331234567",
    websiteUrl: "https://northcraft.com.tr",
    featured: true,
    planType: "gold",
    foundedYear: 2017,
    location: "Çankaya, Ankara",
    joinedAt: "2025-10-03",
    shippingScope: "nationwide",
    tags: ["Ahşap", "Dekorasyon", "Doğal", "Sürdürülebilir"],
  },

  {
    id: "s3",
    slug: "mora-studio",
    name: "Mora Studio",
    categoryId: "c3",
    categoryName: "Tekstil",
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
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
        alt: "Butik koleksiyon askısı",
      },
      {
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
        alt: "Zamansız tasarım parçaları",
      },
      {
        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
        alt: "Yavaş moda koleksiyonu",
      },
    ],
    instagramUrl: "https://instagram.com/morastudio",
    whatsappUrl: "https://wa.me/905341234567",
    websiteUrl: "https://morastudio.co",
    featured: true,
    planType: "gold",
    foundedYear: 2020,
    location: "Alsancak, İzmir",
    joinedAt: "2025-11-18",
    shippingScope: "nationwide",
    tags: ["Yavaş moda", "Butik", "Zamansız"],
  },

  {
    id: "s4",
    slug: "verde-organik",
    name: "Verde Organik",
    categoryId: "c5",
    categoryName: "Doğal Ürünler",
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
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
        alt: "Mevsim sebzeleri",
      },
      {
        url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=900&q=80",
        alt: "Doğal ve katkısız ürünler",
      },
      {
        url: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80",
        alt: "Yerel üreticiden taze ürünler",
      },
    ],
    instagramUrl: "https://instagram.com/verdeorganik",
    whatsappUrl: "https://wa.me/905351234567",
    websiteUrl: "https://verdeorganik.com",
    featured: false,
    planType: "silver",
    foundedYear: 2018,
    location: "Fethiye, Muğla",
    joinedAt: "2025-08-21",
    shippingScope: "local",
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
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
        alt: "El yapımı takı detayı",
      },
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        alt: "Minimal yüzük tasarımı",
      },
      {
        url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
        alt: "Modern küpe koleksiyonu",
      },
    ],
    instagramUrl: "https://instagram.com/ateliermoni",
    whatsappUrl: "https://wa.me/905361234567",
    websiteUrl: "https://ateliermoni.com",
    featured: false,
    planType: "silver",
    foundedYear: 2021,
    location: "Odunpazarı, Eskişehir",
    joinedAt: "2026-01-27",
    shippingScope: "nationwide",
    tags: ["Takı", "Minimal", "El yapımı", "Hediyelik"],
  },

  {
    id: "s6",
    slug: "nora-wear",
    name: "Nora Wear",
    categoryId: "c3",
    categoryName: "Tekstil",
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
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
        alt: "Sezon koleksiyonundan bir görünüm",
      },
      {
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
        alt: "Sade kadın giyim parçaları",
      },
      {
        url: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?auto=format&fit=crop&w=900&q=80",
        alt: "Günlük kullanım için tasarımlar",
      },
    ],
    instagramUrl: "https://instagram.com/norawear",
    whatsappUrl: "https://wa.me/905371234567",
    websiteUrl: "https://norawear.com",
    featured: false,
    planType: "silver",
    foundedYear: 2022,
    location: "Beşiktaş, İstanbul",
    joinedAt: "2026-03-09",
    shippingScope: "nationwide",
    tags: ["Kadın giyim", "Butik", "Sürdürülebilir"],
  },

  {
    id: "s7",
    slug: "toprak-izleri-atolyesi",
    name: "Toprak İzleri Atölyesi",
    categoryId: "c1",
    categoryName: "Seramik",
    city: "Kütahya",
    shortDescription:
      "İki kardeşin çarkında şekillenen günlük kullanım seramikleri.",
    fullDescription:
      "Toprak İzleri Atölyesi, iki kardeşin Kütahya'daki küçük atölyesinde ürettiği günlük kullanım seramiklerine odaklanır. Kupalar, tabaklar ve kaseler küçük partiler halinde elde şekillendirilir.",
    story:
      "Toprak İzleri, çocukluğunu çini tezgahlarının arasında geçiren iki kardeşin atölyesidir. Geleneksel formları sadeleştirerek günlük hayata uyarlıyor, her partiyi kendi çarkımızda şekillendiriyoruz. Kusursuzluk değil, elin izini taşıyan parçalar peşindeyiz.",
    coverImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=200&h=200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=80",
        alt: "Çarkta şekillenen çamur",
      },
      {
        url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
        alt: "Fırından yeni çıkan kaseler",
      },
      {
        url: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
        alt: "Günlük kullanım kupaları",
      },
    ],
    instagramUrl: "https://instagram.com/toprakizleriatolyesi",
    whatsappUrl: "https://wa.me/905381234567",
    websiteUrl: "https://toprakizleri.example.com",
    featured: false,
    planType: "silver",
    foundedYear: 2023,
    location: "Merkez, Kütahya",
    joinedAt: "2026-06-28",
    shippingScope: "local",
    tags: ["Seramik", "El yapımı", "Hediyelik"],
  },

  {
    id: "s8",
    slug: "lavanta-bahcesi",
    name: "Lavanta Bahçesi",
    categoryId: "c5",
    categoryName: "Doğal Ürünler",
    city: "Isparta",
    shortDescription:
      "Kendi bahçesinden lavanta ile hazırlanan doğal ev ve bakım ürünleri.",
    fullDescription:
      "Lavanta Bahçesi, Isparta'daki kendi bahçesinde yetiştirdiği lavantayı kese, yağ ve sabun gibi doğal ürünlere dönüştürür. Üretim küçük partiler halinde, mevsim döngüsüne göre yapılır.",
    story:
      "Her şey, aile bahçesindeki birkaç sıra lavantayla başladı. Hasadı kendimiz yapıyor, kurutma ve damıtma süreçlerini atölyemizde yürütüyoruz. Amacımız bahçeden çıkan her ürünün yolculuğunu bilmek ve bunu olduğu gibi anlatmak.",
    coverImage:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=200&h=200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=80",
        alt: "Hasat sepetinde taze ürünler",
      },
      {
        url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=900&q=80",
        alt: "Doğal malzemelerle üretim",
      },
      {
        url: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80",
        alt: "Bahçeden sofraya seçkiler",
      },
    ],
    instagramUrl: "https://instagram.com/lavantabahcesiisparta",
    whatsappUrl: "https://wa.me/905391234567",
    websiteUrl: "https://lavantabahcesi.example.com",
    featured: false,
    planType: "silver",
    foundedYear: 2020,
    location: "Kuyucak, Isparta",
    joinedAt: "2026-06-10",
    shippingScope: "regional",
    tags: ["Lavanta", "Doğal", "Hediyelik", "Sürdürülebilir"],
  },

  {
    id: "s9",
    slug: "narinka",
    name: "Narinka",
    categoryId: "c3",
    categoryName: "Tekstil",
    city: "Antalya",
    shortDescription:
      "El baskısı desenlerle üretilen ev tekstili ve aksesuar parçaları.",
    fullDescription:
      "Narinka, kalıp baskı tekniğiyle desenlendirilen ev tekstili ve aksesuar parçaları üretir. Desenler elde çizilir, kumaşa tek tek basılır; sipariş üzerine kişiye özel çalışmalar da yapılır.",
    story:
      "Narinka'da her desen bir eskizle başlar. Çizimlerimizi ahşap kalıplara aktarıyor, doğal kumaşlara elde basıyoruz. Aynı desen iki kumaşta hiçbir zaman birebir aynı görünmez; bu küçük farklar bizim imzamızdır.",
    coverImage:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=200&h=200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
        alt: "Kumaş seçkisi ve dokular",
      },
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
        alt: "Atölye askısında hazır parçalar",
      },
      {
        url: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?auto=format&fit=crop&w=900&q=80",
        alt: "Günlük kullanım tasarımları",
      },
    ],
    instagramUrl: "https://instagram.com/narinkadesign",
    whatsappUrl: "https://wa.me/905401234567",
    websiteUrl: "https://narinka.example.com",
    featured: false,
    planType: "silver",
    foundedYear: 2024,
    location: "Muratpaşa, Antalya",
    joinedAt: "2026-07-05",
    shippingScope: "nationwide",
    tags: ["El baskısı", "Ev tekstili", "Kişiye özel"],
  },

  {
    id: "s10",
    slug: "kagit-fener",
    name: "Kağıt Fener",
    categoryId: "c6",
    categoryName: "Kırtasiye",
    city: "İstanbul",
    shortDescription:
      "Küçük seriler halinde üretilen defterler, kartlar ve kağıt işleri.",
    fullDescription:
      "Kağıt Fener, elde dikilen defterler, baskı kartlar ve masaüstü kağıt ürünleri hazırlayan küçük bir kırtasiye atölyesidir. Kapak desenleri dönemsel olarak yenilenir.",
    story:
      "Kağıt Fener, iyi bir defterin yazma isteğini artırdığına inanan bir masabaşı atölyesi. Kağıt seçiminden cilt dikişine kadar her adımı kendi tezgahımızda yapıyoruz. Küçük seriler halinde üretiyor, biten deseni bir daha tekrarlamıyoruz.",
    coverImage:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=200&h=200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
        alt: "El yazısı ve kağıt dokusu",
      },
      {
        url: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=900&q=80",
        alt: "Atölyeden defter seçkisi",
      },
      {
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
        alt: "Renkli çizim malzemeleri",
      },
    ],
    instagramUrl: "https://instagram.com/kagitfener",
    whatsappUrl: "https://wa.me/905411234567",
    websiteUrl: "https://kagitfener.example.com",
    featured: false,
    planType: "silver",
    foundedYear: 2022,
    location: "Kadıköy, İstanbul",
    joinedAt: "2026-06-19",
    shippingScope: "nationwide",
    tags: ["Defter", "Kağıt işleri", "Hediyelik"],
  },

  {
    id: "s11",
    slug: "satir-arasi",
    name: "Satır Arası",
    categoryId: "c6",
    categoryName: "Kırtasiye",
    city: "Ankara",
    shortDescription:
      "Kişiye özel davetiye, kart ve baskı işleri hazırlayan kağıt atölyesi.",
    fullDescription:
      "Satır Arası, davetiye, teşekkür kartı ve özel gün baskıları üzerine çalışan bir kağıt atölyesidir. Her sipariş, müşteriyle birlikte şekillenen kişiye özel bir tasarım sürecinden geçer.",
    story:
      "Satır Arası'nda işimiz, başkalarının önemli günlerine eşlik eden kağıtlar hazırlamak. Her davetiye bir sohbetle başlar; yazı karakterinden kağıdın gramajına kadar birlikte karar veririz. Acele işe değil, doğru işe inanırız.",
    coverImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&h=200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
        alt: "Dolma kalemle hazırlanan taslak",
      },
      {
        url: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=900&q=80",
        alt: "Masaüstü kağıt düzeni",
      },
      {
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
        alt: "Baskı öncesi renk denemeleri",
      },
    ],
    instagramUrl: "https://instagram.com/satirarasiatolye",
    whatsappUrl: "https://wa.me/905421234567",
    websiteUrl: "https://satirarasi.example.com",
    featured: false,
    planType: "silver",
    foundedYear: 2021,
    location: "Kızılay, Ankara",
    joinedAt: "2026-04-22",
    shippingScope: "nationwide",
    tags: ["Kişiye özel", "Davetiye", "Kağıt işleri"],
  },

  {
    id: "s12",
    slug: "sade-ev",
    name: "Sade Ev",
    categoryId: "c2",
    categoryName: "Ev & Yaşam",
    city: "Bursa",
    shortDescription:
      "Doğal malzemelerle üretilen küçük seri ev objeleri ve düzenleyiciler.",
    fullDescription:
      "Sade Ev, keten, pamuk ve ahşap gibi doğal malzemelerle üretilen ev objeleri ve düzenleyiciler hazırlar. Ürünler küçük seriler halinde, sipariş döngüsüne göre üretilir.",
    story:
      "Sade Ev, kalabalık evlerden yorulan iki ortağın 'daha az ama daha iyi' fikriyle kurduğu bir atölye. Dayanıklı ve onarılabilir objeler üretiyoruz; bir ürün eskidiğinde atılmasın, elden geçirilip kullanılmaya devam etsin istiyoruz.",
    coverImage:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1600&q=80",
    logoImage:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=200&h=200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        alt: "Sade bir oturma alanı düzeni",
      },
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
        alt: "Doğal malzemeli yaşam ürünleri",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
        alt: "Ev düzenleme detayları",
      },
    ],
    instagramUrl: "https://instagram.com/sadeevatolye",
    whatsappUrl: "https://wa.me/905431234567",
    websiteUrl: "https://sadeev.example.com",
    featured: false,
    planType: "silver",
    foundedYear: 2019,
    location: "Nilüfer, Bursa",
    joinedAt: "2026-05-14",
    shippingScope: "regional",
    tags: ["Ev objeleri", "Küçük seri", "Doğal malzeme"],
  },
];

const categoryDefinitions: Omit<Category, "sellerCount">[] = [
  {
    id: "c1",
    slug: "seramik",
    name: "Seramik",
    description:
      "Elde şekillendirilen kupalar, tabaklar, vazolar ve dekoratif objeler üreten seramik atölyeleri.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c2",
    slug: "ev-yasam",
    name: "Ev & Yaşam",
    description:
      "Ahşap, keten ve doğal malzemelerle ev objeleri, dekorasyon ve yaşam ürünleri üreten işletmeler.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c3",
    slug: "tekstil",
    name: "Tekstil",
    description:
      "Küçük seri giyim, ev tekstili ve el baskısı kumaş işleri üreten bağımsız markalar.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c4",
    slug: "taki",
    name: "Takı",
    description:
      "El işçiliğiyle hazırlanan yüzük, kolye, küpe ve özel tasarım takı koleksiyonları.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c5",
    slug: "dogal-urunler",
    name: "Doğal Ürünler",
    description:
      "Bahçeden ve yerel üreticiden gelen gıda, bakım ve ev ürünleri hazırlayan doğal üretim işletmeleri.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "c6",
    slug: "kirtasiye",
    name: "Kırtasiye",
    description:
      "El yapımı defterler, davetiyeler, kartlar ve masaüstü kağıt işleri üreten atölyeler.",
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

export const collections: Collection[] = [
  {
    id: "col1",
    slug: "evinize-karakter-katan-atolyeler",
    title: "Evinize karakter katan atölyeler",
    description:
      "Seramikten ahşaba, yaşam alanlarına elin izini taşıyan parçalar üreten dört atölye.",
    intro:
      "Bir evi ev yapan, çoğu zaman büyük mobilyalar değil küçük dokunuşlardır: elde şekillenmiş bir kase, tezgahta tek tek işlenmiş bir ahşap obje. Bu seçkide, yaşam alanlarına karakter katan parçalar üreten dört atölyeyi bir araya getirdik.",
    coverImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
    sellerIds: ["s1", "s7", "s2", "s12"],
    sponsored: false,
    publishedAt: "2026-07-07",
  },
  {
    id: "col2",
    slug: "kucuk-atolyelerden-hediye-fikirleri",
    title: "Küçük atölyelerden hediye fikirleri",
    description:
      "Sevdikleriniz için anlamlı bir şey ararken bakılacak dört küçük üretici.",
    intro:
      "İyi bir hediye, üzerine düşünülmüş olandır. Elde dikilen bir defter, küçük seri bir takı ya da bahçeden gelen doğal bir ürün; hepsinin ortak noktası arkasındaki emeğin hikâyesi. Bu seçki, hediye ararken küçük atölyelere bakmak isteyenler için hazırlandı.",
    coverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    sellerIds: ["s5", "s10", "s8", "s1"],
    sponsored: false,
    publishedAt: "2026-06-18",
  },
  {
    id: "col3",
    slug: "dogadan-gelenler",
    title: "Doğadan gelenler",
    description:
      "Üretim sürecini doğal malzemeler üzerine kuran üç işletme.",
    intro:
      "Bu seçkideki işletmelerin ortak noktası, malzemenin kaynağını bilmek ve olduğu gibi anlatmak: bahçeden hasat edilen lavanta, mevsiminde toplanan sebzeler, doğal kumaşlara elde basılan desenler.",
    coverImage:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1600&q=80",
    sellerIds: ["s4", "s8", "s9"],
    // GELİŞTİRME/TEST VERİSİ: "Sponsorlu" etiketinin render'ını test etmek için
    // true bırakıldı. Gerçek bir sponsor YOKTUR — public pilot / production
    // verisinde bu alan false yapılmalıdır (bkz. CLAUDE.md B.5 ve B.7).
    // Sponsorlu içerik editoryal seçimden ayrıdır ve asla güven etiketi değildir.
    sponsored: true,
    publishedAt: "2026-05-26",
  },
];

export const featuredStory: FeaturedStory = {
  sellerId: "s7",
  title: "Toprağa biçim veren iki kardeş",
  excerpt:
    "Kütahya'da küçük bir atölyede başlayan yolculukları, her parçaya sinen emek ve sadelikle büyüyor. Toprak İzleri'nin iki kurucusu, geleneksel formları günlük hayata uyarlıyor.",
  quote:
    "Çarkın başına geçince zaman yavaşlıyor; acele eden, çamuru dinlemiyor demektir.",
  image:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=80",
};
