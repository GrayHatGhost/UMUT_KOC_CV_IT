export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  type: "professional" | "volunteer";
  description: string;
  bullets: string[];
};

export type AppliedExperience = {
  title: string;
  context: string;
  summary: string;
  bullets: string[];
};

export type Education = {
  degree: string;
  school: string;
  status: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Language = {
  language: string;
  level: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  year: string;
};

export type ProfileData = {
  name: string;
  role: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  cvPath: string;
  social: {
    linkedin: string;
  };
  militaryStatus: string;
  about: string;
  careerObjective: string;
  appliedExperience: AppliedExperience;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  languages: Language[];
  certificates: Certificate[];
};

export const profile: ProfileData = {
  name: "Umut Koç",
  role: "IT Support Adayı",
  headline: "Teknik Destek ve Dijital Operasyon",
  location: "Esenyurt, İstanbul",
  phone: "+90 541 785 39 00",
  email: "umutkoco@outlook.com",
  linkedin: "https://linkedin.com/in/umutkoco",
  portfolio: "https://umutkoc.vercel.app",
  cvPath: "/cv/umut-koc-cv.pdf",

  social: {
    linkedin: "https://linkedin.com/in/umutkoco",
  },

  militaryStatus: "Tamamlandı (2026)",

  about:
    "Bilgisayar donanımı, Windows kurulumu, temel ağ bağlantıları ve yerinde/uzaktan kullanıcı desteğinde uygulamalı deneyime sahip bir IT Support adayıyım. Yaklaşık 10 masaüstü bilgisayarın kurulum, yükseltme, bakım ve arıza giderme süreçlerini yürüttüm; ayrıca web sitesi, hosting ve dijital içerik operasyonlarında teknik sorumluluk üstlendim.",

  careerObjective:
    "Çalıştığım kurumun sistemlerini ve işleyişini öğrenen, kullanıcı ihtiyaçlarını sonuca kadar takip eden ve kurumun teknik ihtiyaçları geliştikçe daha fazla sorumluluk alan uzun vadeli bir ekip üyesi olmayı hedefliyorum.",

  appliedExperience: {
    title: "Uygulamalı IT Support Deneyimi",
    context: "Bireysel kullanıcılar için teknik destek çalışmaları",
    summary:
      "Yaklaşık 10 farklı masaüstü bilgisayarda ihtiyaç analizi, donanım planlama, kurulum, yükseltme, bakım ve temel sorun giderme süreçlerini yürüttüm.",
    bullets: [
      "Windows kurulumu, sürücü yükleme, disk bölümlendirme ve temel sistem yapılandırmalarını tamamladım.",
      "SSD ve RAM yükseltmeleri, BIOS/UEFI ayarları ve BIOS güncellemeleri gerçekleştirdim.",
      "Termal macun yenileme, fan temizliği ve genel donanım bakımı uyguladım.",
      "Donanım kaynaklı arızaları teşhis ederek uygun çözüm ve parça değişimlerini gerçekleştirdim.",
      "Kullanıcılara yerinde ve AnyDesk, TeamViewer ile Microsoft Remote Desktop üzerinden uzaktan destek sağladım.",
    ],
  },

  experience: [
    {
      role: "Web ve Dijital Operasyon Sorumlusu",
      company: "Genç Savunma Avukat Topluluğu",
      period: "Ekim 2025 – Devam ediyor",
      type: "volunteer",
      description:
        "Topluluğun web sitesi, yönetim paneli ve dijital iletişim süreçlerinde gönüllü teknik sorumluluk üstleniyorum.",
      bullets: [
        "Web sitesi ve yönetim panelinin içerik, yayın, güncelleme ve teknik bakım süreçlerini yürütüyorum.",
        "Kullanıcı ihtiyaçlarına göre içerik, rol-yetki, duyuru ve etkinlik modüllerinin oluşturulma süreçlerini yönetiyorum.",
        "Kurumsal iletişim için gerekli dijital içerik ve sosyal medya görsellerini hazırlıyorum.",
      ],
    },
    {
      role: "Saha / Operasyon Personeli",
      company: "Akçay Kırtasiye | AkOffice",
      period: "Ağustos 2022 – Haziran 2026",
      location: "Esenyurt, İstanbul",
      type: "professional",
      description:
        "Yoğun saha ve operasyon ortamında envanter, sipariş hazırlama ve süreç takibi sorumluluğu üstlendim.",
      bullets: [
        "Dijital el terminali ve stok takip sistemleri kullanarak envanter yönetimi ve sipariş süreçlerini yürüttüm.",
        "Siparişlerin doğru, eksiksiz ve zamanında hazırlanması süreçlerinde görev aldım.",
        "Sistemli takip, hata kontrolü ve farklı ekiplerle koordinasyon becerisi kazandım.",
      ],
    },
  ],

  education: [
    {
      degree: "Ekonometri (Lisans)",
      school: "Trakya Üniversitesi",
      status: "Mezun, 2024",
    },
    {
      degree: "Yönetim Bilişim Sistemleri",
      school: "Anadolu Üniversitesi (AÖF)",
      status: "Devam ediyor",
    },
  ],

  skills: [
    {
      category: "Bilgisayar ve Donanım",
      items: [
        "Donanım kurulumu, montaj ve yükseltme",
        "Arıza tespiti ve temel sorun giderme",
        "BIOS/UEFI ayarları ve yapılandırma",
        "Windows, sürücü ve yazıcı kurulumları",
        "Termal bakım ve genel donanım temizliği",
      ],
    },
    {
      category: "Ağ ve Bağlantı",
      items: [
        "Modem ve router kurulumu",
        "İnternet ve Wi-Fi bağlantı sorunlarının giderilmesi",
        "Temel LAN kurulumu ve bağlantı desteği",
        "Kablosuz kamera ve ağ cihazı bağlantıları",
      ],
    },
    {
      category: "Uzak Destek",
      items: [
        "AnyDesk",
        "TeamViewer",
        "Microsoft Remote Desktop",
        "Kurulum sonrası kullanıcı yönlendirmesi",
      ],
    },
    {
      category: "Ek Dijital Yetkinlikler",
      items: [
        "Web sitesi ve içerik yönetimi",
        "Domain ve hosting yönetimi",
        "Yönetim paneli ve yayın süreçleri",
        "Web tabanlı temel otomasyon akışları",
        "Adobe Photoshop ve Canva",
      ],
    },
  ],

  languages: [
    {
      language: "Türkçe",
      level: "Ana dil",
    },
    {
      language: "İngilizce",
      level: "A2 – Temel seviye",
    },
  ],

  certificates: [],
};
