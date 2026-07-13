// Tasarım çalışmaları — PROMPT.md §17

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
};

export const designWorks: DesignWork[] = [
  {
    id: "design-01",
    number: "01",
    title: "Dijital Kolaylık, Güçlü Bağlantı",
    category: "Sosyal Medya Kampanyası",
    purpose: "Dijital hizmet ve bağlantı avantajını güçlü fiyat vurgusuyla anlatan kampanya görseli.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2024",
    image: "/images/designs/design-01.webp",
    thumbnail: "/images/designs/design-01.webp",
  },
  {
    id: "design-02",
    number: "02",
    title: "30 Ağustos Zafer Bayramı",
    category: "Kurumsal Gün Tasarımı",
    purpose: "30 Ağustos Zafer Bayramı için hazırlanan anma ve kutlama görseli.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2024",
    image: "/images/designs/design-02.webp",
    thumbnail: "/images/designs/design-02.webp",
  },
  {
    id: "design-03",
    number: "03",
    title: "Hukuki Bilgilendirme Serisi",
    category: "Bilgilendirme İçeriği",
    purpose:
      "Hukuki bilgiyi sade, okunabilir ve sosyal medya formatına uygun biçimde sunan içerik tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2024",
    image: "/images/designs/design-03.webp",
    thumbnail: "/images/designs/design-03.webp",
  },
];
