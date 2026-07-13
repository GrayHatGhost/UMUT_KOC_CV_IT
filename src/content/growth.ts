// Gelişim içeriği — PROMPT.md §13

export type StatusType = "Çalışıyorum" | "Geliştiriyorum" | "Araştırıyorum" | "Devam ediyor";

export type DevelopmentItem = {
  label: string;
  status: StatusType;
};

export type RoadmapItem = {
  number: string;
  text: string;
};

// Panel 01 — Uygulamalı deneyim
export const experienceItems: string[] = [
  "Bilgisayar montajı ve donanım yükseltme",
  "Donanım arıza tespiti ve parça değişimi",
  "Windows kurulumu ve sistem yapılandırma",
  "BIOS ve UEFI ayarları",
  "SSD, RAM ve depolama çözümleri",
  "Termal bakım ve genel donanım temizliği",
  "Modem, router ve access point kurulumu",
  "Üç-dört access point içeren kablosuz ağ kurulumları",
  "Kablosuz güvenlik kamerası kurulumu",
  "Temel veri aktarımı ve yazılımsal veri kurtarma",
  "Yerinde ve uzaktan teknik destek",
  "AnyDesk, TeamViewer ve Microsoft Remote Desktop kullanımı",
];

export const experienceNarrative =
  "Yıllar içinde onlarca masaüstü bilgisayarda montaj, bakım, yükseltme, işletim sistemi kurulumu ve arıza tespiti gerçekleştirdim. Bu deneyimlerin büyük bölümü çevremdeki kullanıcıların gerçek ihtiyaçlarına çözüm üretirken oluştu.";

// Panel 02 — Geliştirdiğim alanlar
export const developmentItems: DevelopmentItem[] = [
  { label: "Kurumsal IT Support süreçleri", status: "Çalışıyorum" },
  { label: "Ağ temelleri ve sorun giderme", status: "Çalışıyorum" },
  { label: "Kullanıcı ve yetki yönetimi", status: "Geliştiriyorum" },
  { label: "Microsoft 365 ekosistemi", status: "Geliştiriyorum" },
  { label: "Ticket ve envanter süreçleri", status: "Araştırıyorum" },
  { label: "Teknik İngilizce", status: "Devam ediyor" },
  { label: "Teknik dokümantasyon", status: "Geliştiriyorum" },
];

// Panel 03 — Yol haritam
export const roadmapItems: RoadmapItem[] = [
  { number: "01", text: "İlk kurumsal IT Support deneyimimi kazanmak" },
  { number: "02", text: "CompTIA A+ hazırlığını ilerletmek" },
  { number: "03", text: "Teknik İngilizce seviyemi geliştirmek" },
  { number: "04", text: "Ev laboratuvarı çalışmaları oluşturmak" },
  { number: "05", text: "Microsoft ve ağ teknolojilerinde uygulamalı deneyim kazanmak" },
  { number: "06", text: "Daha kurumsal ve kapsamlı bir BT ortamına geçmek" },
];

export const roadmapClosing =
  "Hedefim kısa sürede büyük unvanlar edinmek değil; sağlam temeller üzerinde güvenilir bir BT kariyeri oluşturmak.";
