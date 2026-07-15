// Sosyal medya ve görsel iletişim çalışmaları

export type DesignWork = {
  id: string;
  number: string;
  title: string;
  category: string;
  purpose: string;
  platform: string;
  tools: string[];
  year?: string;
  image: string;
  thumbnail?: string;
  alt: string;
};

export const featuredDesignIds = [
  "design-01",
  "design-02",
  "design-03",
  "design-04",
  "design-05",
] as const;

export const designWorks: DesignWork[] = [
  {
    id: "design-01",
    number: "01",
    title: "İstanbul Adalet Rotası",
    category: "Etkinlik Duyurusu",
    purpose:
      "Av. Yunus Özak eşliğinde düzenlenen İstanbul Adalet Rotası etkinliğinin güzergâhını, tarihini, buluşma noktasını ve etkinlik süresini tek görselde anlaşılır biçimde sunan sosyal medya tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2026",
    image: "/images/designs/design-01.webp",
    thumbnail: "/images/designs/design-01.webp",
    alt:
      "Galata Kulesi, tramvay ve rota duraklarıyla hazırlanan İstanbul Adalet Rotası etkinlik duyurusu",
  },
  {
    id: "design-02",
    number: "02",
    title: "Dijital Kartvizit Avantaj Kampanyası",
    category: "Tanıtım ve Kampanya Tasarımı",
    purpose:
      "ICON Dijital Kartvizit hizmetinin Genç Savunma üyelerine sunduğu indirim avantajını; ürün görseli, fayda maddeleri ve fiyat vurgusuyla anlatan kampanya tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    image: "/images/designs/design-02.webp",
    thumbnail: "/images/designs/design-02.webp",
    alt:
      "ICON Dijital Kartvizit için yüzde 25 indirim ve 750 TL fiyat vurgulu kampanya tasarımı",
  },
  {
    id: "design-03",
    number: "03",
    title: "Kitap Kulübü Buluşması",
    category: "Topluluk Etkinliği",
    purpose:
      "Pınar Kür'ün Asılacak Kadın kitabı için düzenlenen kitap kulübü buluşmasının tarih, saat ve mekân bilgilerini sıcak ve davetkâr bir görsel dille duyuran etkinlik tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    image: "/images/designs/design-03.webp",
    thumbnail: "/images/designs/design-03.webp",
    alt:
      "Pınar Kür Asılacak Kadın kitabı için hazırlanan kitap kulübü buluşması duyurusu",
  },
  {
    id: "design-04",
    number: "04",
    title: "İstanbul Barosu Seçim Anketi Sonuçları",
    category: "Veri Görselleştirme",
    purpose:
      "İstanbul Barosu 2026 Ekim seçim anketinde adayların aldığı oyları ve yüzdelik dağılımı pasta grafik ile karşılaştırmalı ve kolay okunabilir biçimde sunan bilgilendirme tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2026",
    image: "/images/designs/design-04.webp",
    thumbnail: "/images/designs/design-04.webp",
    alt:
      "İstanbul Barosu 2026 Ekim seçim anketi sonuçlarını pasta grafikle gösteren sosyal medya tasarımı",
  },
  {
    id: "design-05",
    number: "05",
    title: "Cebri İcra Kanunu Taslağı Görüş Raporu",
    category: "Rapor ve Yayın Duyurusu",
    purpose:
      "Cebri İcra Kanunu Taslağına ilişkin hazırlanan görüş raporunu güçlü bir başlık hiyerarşisi ve adalet temalı görsel öğelerle duyuran kurumsal yayın tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    image: "/images/designs/design-05.webp",
    thumbnail: "/images/designs/design-05.webp",
    alt:
      "Adalet heykeli ile hazırlanan Cebri İcra Kanunu Taslağına İlişkin Görüş Raporu duyurusu",
  },
];
