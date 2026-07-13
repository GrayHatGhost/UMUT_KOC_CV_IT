export type Experience = {
  role: string;
  period: string;
  company: string;
  description: string;
};

export type Education = {
  degree: string;
  period: string;
  school: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Certificate = {
  name: string;
  issuer: string;
  year: string;
};

export type ProfileData = {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  cvPath: string;
  social: {
    linkedin: string;
  };
  about: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  certificates: Certificate[];
};

export const profile: ProfileData = {
  name: "Umut Koç",
  role: "IT Support Adayı",
  location: "Esenyurt, İstanbul",
  email: "umutkoco@outlook.com",
  linkedin: "https://linkedin.com/in/umutkoco",
  cvPath: "/cv/umut-koc-cv.pdf",
  social: {
    linkedin: "https://linkedin.com/in/umutkoco",
  },
  about:
    "Bilgisayar donanımı, teknik destek ve dijital operasyonlar alanında uygulamalı deneyime sahip bir IT Support adayıyım. Geçmişte donanım ve ağ sorunlarına çözüm üretirken, bugün kurumsal BT standartlarını (Active Directory, Microsoft 365, Ağ Temelleri) öğrenmeye ve uygulamaya odaklanıyorum.",
  experience: [
    {
      role: "Serbest IT Destek ve Donanım Uzmanı",
      company: "Bireysel / Proje Bazlı",
      period: "2020 - Günümüz",
      description:
        "Bireysel kullanıcılar ve küçük işletmeler için masaüstü sistem kurulumları, donanım arıza tespitleri, ağ (modem/router/AP) yapılandırmaları ve işletim sistemi sorun giderme süreçlerini yürüttüm. Kullanıcı ihtiyaçlarını anlayarak doğru teknik çözümleri sundum.",
    },
    {
      role: "Dijital Operasyon ve Web Geliştirme Yöneticisi",
      company: "Genç Savunma / Venta Legal",
      period: "2023 - Günümüz",
      description:
        "Hukuk bürosu ve topluluğu için web sitesi kurulumu, içerik yönetim sistemi (CMS) entegrasyonu, yetki/rol yönetimi ve yayına alma süreçlerini yönettim. AI destekli geliştirme araçları kullanarak kullanıcı dostu paneller ve dijital altyapılar inşa ettim.",
    },
  ],
  education: [
    {
      degree: "Siyaset Bilimi ve Kamu Yönetimi",
      school: "Kocaeli Üniversitesi",
      period: "2022 - 2026",
    },
    {
      degree: "Bilişim Sistemleri ve Teknolojileri",
      school: "Anadolu Üniversitesi (Açıköğretim)",
      period: "2025 - Devam Ediyor",
    },
  ],
  skills: [
    {
      category: "Donanım & Sistem",
      items: [
        "Masaüstü PC Montajı & Yükseltme",
        "Donanım Arıza Tespiti",
        "Windows Kurulum ve Sorun Giderme",
        "BIOS / UEFI Yapılandırması",
      ],
    },
    {
      category: "Ağ & İletişim",
      items: [
        "Modem, Router, Access Point Kurulumu",
        "Temel LAN/WLAN Sorun Giderme",
        "Kablo Çekimi ve Sonlandırma",
      ],
    },
    {
      category: "Araçlar & Destek",
      items: [
        "Uzak Masaüstü (AnyDesk, TeamViewer)",
        "AI Destekli Operasyon Yönetimi (Claude, GPT)",
        "Kullanıcı Eğitimi ve Yönlendirme",
      ],
    },
  ],
  certificates: [],
};
