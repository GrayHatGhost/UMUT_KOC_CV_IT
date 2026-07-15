// Projeler — PROMPT.md §14 ve §21

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  summary: string[];
  role: string[];
  features: string[];
  learnings: string[];
  images: ProjectImage[];
  liveUrl?: string;
};

export const aiApproachText = {
  title: "Geliştirme yaklaşımım",
  paragraphs: [
    "Kendimi klasik anlamda bir yazılım geliştirici olarak konumlandırmıyorum.",
    "Bir ihtiyacı anlamaya, gerekli yapıyı planlamaya ve çalışan bir sonuca ulaşmaya odaklanıyorum. Yapay zekâ destekli geliştirme araçlarını üretim sürecinin bir parçası olarak kullanıyor; ortaya çıkan yapıyı test ediyor, hataları gözlemliyor, düzeltmeleri yönetiyor, yayına alıyor ve bakımını sürdürüyorum.",
    "Benim için önemli olan yalnızca kod üretmek değil; ihtiyacı doğru tanımlamak, süreci yönetmek ve ortaya çalışan bir ürün çıkarmak.",
  ],
};

export const projects: Project[] = [
  {
    id: "genc-savunma",
    number: "01",
    title: "Genç Savunma Web Sitesi ve Yönetim Paneli",
    category: "Web · İçerik Yönetimi · Dijital Operasyon",
    shortDescription:
      "Bir hukuk topluluğunun içerik, duyuru, etkinlik ve dijital yayın süreçlerini tek merkezden yönetebilmesi için geliştirdiğim web sitesi ve yönetim paneli.",
    summary: [
      "Genç Savunma için yalnızca bir tanıtım sitesi değil, içeriklerin düzenli biçimde yönetilebildiği kapsamlı bir dijital yapı oluşturdum.",
      "Projenin bilgi mimarisi, yönetim paneli akışı, kullanıcı yetkileri, içerik modülleri, yayın süreci ve teknik bakımı tarafımdan yürütülmektedir.",
    ],
    role: [
      "İhtiyaçların belirlenmesi",
      "Bilgi mimarisinin planlanması",
      "Sayfa ve içerik yapısının kurulması",
      "Arayüz kararlarının oluşturulması",
      "AI destekli geliştirme sürecinin yönetilmesi",
      "Test senaryolarının uygulanması",
      "Hataların tespit edilmesi ve giderilmesi",
      "Domain ve hosting süreçlerinin yönetilmesi",
      "Yayına alma",
      "Bakım ve güncelleme",
      "Sosyal medya içeriklerine tasarım desteği",
    ],
    features: [
      "Kullanıcı yönetimi",
      "Rol ve yetkilendirme",
      "Sayfa yönetimi",
      "İçerik yönetimi",
      "Duyuru modülü",
      "Etkinlik modülü",
      "Avukatlara yönelik pratik hesaplama araçları",
      "Dinamik QR kod oluşturma",
      "Dinamik QR yönlendirme sistemi",
      "Yayın ve bakım süreçleri",
    ],
    learnings: [
      "Kullanıcı ihtiyacını teknik özelliğe dönüştürmek",
      "Yönetim paneli akışını sadeleştirmek",
      "Rol ve yetki yapısını planlamak",
      "Mobil uyumlu arayüz oluşturmak",
      "Canlı sistemde hata takibi yapmak",
      "İçerik üreticileri için kullanılabilir bir panel tasarlamak",
    ],
    images: [
      { src: "/images/projects/genc-savunma/cover.webp", alt: "Genç Savunma ana sayfa" },
      { src: "/images/projects/genc-savunma/home.webp", alt: "Genç Savunma giriş" },
      { src: "/images/projects/genc-savunma/admin-dashboard.webp", alt: "Yönetim paneli" },
      { src: "/images/projects/genc-savunma/content-management.webp", alt: "İçerik yönetimi" },
      { src: "/images/projects/genc-savunma/qr-system.webp", alt: "QR sistemi" },
    ],
    liveUrl: "https://www.gencsavunma.org",
  },
  {
    id: "venta-legal",
    number: "02",
    title: "Venta Legal Web Sitesi ve Yönetim Paneli",
    category: "Kurumsal Web · Yönetim Paneli · Yayın Yönetimi",
    shortDescription:
      "Bir hukuk bürosunun kurumsal kimliğini dijital ortamda sade ve güven veren bir yapıyla sunan web sitesi ve içerik yönetim sistemi.",
    summary: [
      "Venta Legal için kurumsal görünümü, içerik yönetimini ve teknik yayın süreçlerini tek bir yapıda birleştiren web sitesi ve yönetim paneli geliştirdim.",
      "Projenin tasarım yönü, içerik akışı, responsive yapısı, yönetim paneli deneyimi ve yayın sonrası bakım süreçleri tarafımdan yürütülmektedir.",
    ],
    role: [
      "Kurumsal ihtiyaçların belirlenmesi",
      "Site haritasının oluşturulması",
      "İçerik yapısının planlanması",
      "Arayüz ve görsel dil kararları",
      "AI destekli geliştirme sürecinin yönetilmesi",
      "Responsive kontroller",
      "Form ve içerik testleri",
      "Yayına alma",
      "Teknik bakım ve güncelleme",
    ],
    features: [
      "Kurumsal sayfa yönetimi",
      "Hizmet alanları",
      "Dinamik içerik yapısı",
      "İçerik yönetim paneli",
      "Mobil uyumlu arayüz",
      "İletişim alanları",
      "Teknik yayın ve bakım sistemi",
    ],
    learnings: [
      "Kurumsal güven duygusunu arayüze yansıtmak",
      "Metin ve görsel hiyerarşisini planlamak",
      "Responsive tasarım kontrolleri yapmak",
      "İçerik güncellemelerini sürdürülebilir hâle getirmek",
      "Canlı site bakım süreçlerini yönetmek",
    ],
    images: [
      { src: "/images/projects/venta-legal/cover.webp", alt: "Venta Legal ana sayfa" },
      { src: "/images/projects/venta-legal/home.webp", alt: "Venta Legal giriş" },
      { src: "/images/projects/venta-legal/services.webp", alt: "Hizmetler sayfası" },
      { src: "/images/projects/venta-legal/admin-dashboard.webp", alt: "Yönetim paneli" },
      { src: "/images/projects/venta-legal/mobile.webp", alt: "Mobil görünüm" },
    ],
    liveUrl: "https://www.ventalegal.org",
  },
  {
    id: "automation",
    number: "03",
    title: "API Tabanlı Finansal Veri Otomasyonu",
    category: "Otomasyon · API · Veri Akışı",
    shortDescription:
      "Finansal verileri farklı kaynaklardan toplayan, belirlenen kurallara göre işleyen ve Telegram üzerinden bildirim gönderen kişisel otomasyon projesi.",
    summary: [
      "Binance API ve web tabanlı veri kaynaklarını kullanarak finansal verileri otomatik biçimde toplayan, işleyen ve belirlenen koşullar gerçekleştiğinde Telegram üzerinden bildirim üreten bir sistem geliştirdim.",
      "Bu proje, bir ihtiyacı akışlara ayırma, veri kaynaklarını bir araya getirme, kuralları tanımlama ve çalışan bir otomasyon süreci oluşturma deneyimi kazandırdı.",
    ],
    role: [
      "Proje amacının belirlenmesi",
      "Veri kaynaklarının seçilmesi",
      "Veri akışının planlanması",
      "Kural tabanlı analiz yapısının kurulması",
      "Telegram bildirim akışının oluşturulması",
      "AI destekli geliştirme sürecinin yönetilmesi",
      "Hata senaryolarının test edilmesi",
      "Sistemin bakımının yapılması",
    ],
    features: [
      "Binance API veri toplama",
      "Web tabanlı veri kaynakları",
      "Otomatik veri işleme",
      "Kural tabanlı sinyal üretimi",
      "Telegram bildirimleri",
      "Zamanlanmış veri kontrolü",
      "Hata kayıtları",
    ],
    learnings: [
      "API tabanlı veri akışlarını anlamak",
      "Bir süreci küçük otomasyon adımlarına ayırmak",
      "Bildirim sistemleri kurmak",
      "Hata senaryolarını gözlemlemek",
      "Veri akışını düzenli biçimde izlemek",
    ],
    images: [
      { src: "/images/projects/automation/cover.webp", alt: "Otomasyon sistemi genel görünüm" },
      { src: "/images/projects/automation/dashboard.webp", alt: "Dashboard" },
      { src: "/images/projects/automation/flow.webp", alt: "Veri akış diyagramı" },
      { src: "/images/projects/automation/telegram.webp", alt: "Telegram bildirimleri" },
    ],
  },
];
