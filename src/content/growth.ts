// Teknik deneyim ve gelişim içeriği

export type ExperienceIcon =
  | "hardware"
  | "windows"
  | "network"
  | "support";

export type ExperienceGroup = {
  number: string;
  icon: ExperienceIcon;
  eyebrow: string;
  title: string;
  description: string;
  examples: string[];
};

export type DevelopmentItem = {
  number: string;
  title: string;
  description: string;
};

export type RoadmapStage = {
  label: string;
  title: string;
  description: string;
};

export const growthIntro =
  "Gerçek kullanıcıların bilgisayar, bağlantı ve kurulum ihtiyaçlarına çözüm üretirken edindiğim pratik deneyimi; kurumsal IT süreçleriyle tamamlıyorum.";

export const experienceGroups: ExperienceGroup[] = [
  {
    number: "01",
    icon: "hardware",
    eyebrow: "DONANIM VE BAKIM",
    title: "Sistemi kurmak kadar sağlıklı çalışmasını da önemsiyorum.",
    description:
      "İhtiyaca ve bütçeye uygun bileşen seçimiyle başlayan süreci kurulum, yükseltme, bakım ve arıza teşhisine kadar takip ediyorum.",
    examples: [
      "Masaüstü bilgisayar montajı ve parça değişimi",
      "SSD, RAM ve depolama yükseltmeleri",
      "Termal macun, fan temizliği ve genel bakım",
    ],
  },
  {
    number: "02",
    icon: "windows",
    eyebrow: "WINDOWS VE SİSTEM",
    title: "Temiz, anlaşılır ve kullanıma hazır sistemler teslim ediyorum.",
    description:
      "İşletim sistemi kurulumunu yalnızca format işlemi olarak değil; sürücü, disk ve temel yapılandırma adımlarıyla birlikte ele alıyorum.",
    examples: [
      "Windows kurulumu ve sürücü yapılandırması",
      "BIOS/UEFI ayarları ve güncellemeleri",
      "Disk bölümlendirme ve temel veri aktarımı",
    ],
  },
  {
    number: "03",
    icon: "network",
    eyebrow: "AĞ VE BAĞLANTI",
    title: "Bağlantı sorunlarında önce yapıyı, sonra belirtileri inceliyorum.",
    description:
      "Ev ve küçük ofis ortamlarında modem, router, access point ve uç cihazlar arasındaki temel bağlantı sorunlarını gideriyorum.",
    examples: [
      "Modem, router ve access point kurulumu",
      "Wi-Fi kapsama ve bağlantı sorunlarının giderilmesi",
      "Kablosuz kamera ve ağ cihazı bağlantı desteği",
    ],
  },
  {
    number: "04",
    icon: "support",
    eyebrow: "KULLANICI DESTEĞİ",
    title: "Teknik çözümün kullanıcı için anlaşılır olmasına dikkat ediyorum.",
    description:
      "Sorunu dinleyip doğru soruları sorarak ilerliyor; çözüm sonrasında kullanıcıyı sistemin kullanımı konusunda yönlendiriyorum.",
    examples: [
      "Yerinde temel teknik destek",
      "AnyDesk, TeamViewer ve Remote Desktop ile uzaktan destek",
      "Kurulum sonrası kullanıcı teslimi ve yönlendirme",
    ],
  },
];

export const experienceNarrative =
  "Bu çalışmaların büyük bölümü, çevremdeki kullanıcıların gerçek cihaz ve bağlantı sorunlarına çözüm üretirken oluştu. Kurumsal deneyim iddiası yerine, sahip olduğum uygulamalı temeli açık ve doğrulanabilir biçimde gösteriyorum.";

export const developmentItems: DevelopmentItem[] = [
  {
    number: "01",
    title: "Help Desk ve ticket süreçleri",
    description:
      "Talep karşılama, önceliklendirme, kayıt tutma, çözüm takibi ve kullanıcıya geri bildirim düzeni.",
  },
  {
    number: "02",
    title: "Microsoft 365 ve kullanıcı yönetimi",
    description:
      "Kullanıcı hesapları, kurumsal e-posta, erişim yetkileri ve temel yönetim senaryoları.",
  },
  {
    number: "03",
    title: "Ağ temelleri ve teşhis yaklaşımı",
    description:
      "TCP/IP, DNS, DHCP ve bağlantı problemlerini sistematik biçimde inceleme pratiği.",
  },
  {
    number: "04",
    title: "Dokümantasyon ve teknik İngilizce",
    description:
      "Çözümleri kayıt altına alma; teknik doküman, hata mesajı ve ürün arayüzlerini daha rahat takip etme.",
  },
];

export const developmentNarrative =
  "Öğrenmeyi başka bir yere geçmenin aracı olarak değil, çalıştığım ekipte daha güvenilir destek verebilmenin ve zamanla daha fazla sorumluluk alabilmenin yolu olarak görüyorum.";

/*
 * Bir sonraki aşamada hazırlanacak kuruma bağlılık kartı için
 * güvenli ve yeniden kullanılabilir içerikler.
 * Eski export adları korunarak mevcut importların kırılması önlenir.
 */
export const roadmapStages: RoadmapStage[] = [
  {
    label: "İlk adım",
    title: "İşleyişi öğrenmek",
    description:
      "Kurumun kullandığı cihazları, sistemleri, kullanıcı alışkanlıklarını ve günlük destek ihtiyaçlarını tanımak.",
  },
  {
    label: "Güven",
    title: "Takip edilebilir destek vermek",
    description:
      "Sorunları yalnızca kapatmak yerine kayıt altına almak, sonucunu kontrol etmek ve kullanıcıya geri dönüş yapmak.",
  },
  {
    label: "Sorumluluk",
    title: "Kurumun ihtiyaçlarıyla birlikte gelişmek",
    description:
      "Teknik ihtiyaçlar genişledikçe yeni alanlar öğrenmek ve ekip içinde daha fazla sorumluluk üstlenmek.",
  },
];

export const roadmapClosing =
  "Hedefim kısa sürede unvan değiştirmek değil; çalıştığım kurumun işleyişini öğrenerek uzun vadede güvenilir bir teknik destek noktası hâline gelmek.";
