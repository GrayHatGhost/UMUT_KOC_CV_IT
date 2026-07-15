// Kariyer hikâyesi — kısa, taranabilir ve IT Support odaklı

export type StoryChapter = {
  number: string;
  period: string;
  title: string;
  summary: string;
  details: string[];
  closing: string;
};

export const storyIntro =
  "Kariyer yolum tek bir çizgi üzerinde ilerlemedi. Buna rağmen bilgisayar donanımı, sorun giderme ve kullanıcılara yardımcı olma isteğim hiçbir zaman kaybolmadı.";

export const storyToday =
  "Bugün operasyon disiplinimi, yıllardır geliştirdiğim teknik merak ve uygulamalı deneyimle birleştirerek bilinçli bir IT Support kariyeri kuruyorum.";

export const storyChapters: StoryChapter[] = [
  {
    number: "01",
    period: "2013–2017",
    title: "Merakla başlayan teknik temel",
    summary:
      "Bilgisayar donanımına olan ilgim lise yıllarında, kendi sistemimde yaşadığım sorunlara çözüm ararken başladı.",
    details: [
      "Donanım Haber forumunda farklı kullanıcıların sorunlarını ve çözüm yollarını takip ettim.",
      "Bilgisayar sökme, parça değiştirme ve arıza kaynağını araştırma pratiği kazandım.",
      "Öğrendiklerimi zamanla çevremdeki kullanıcıların sorunlarını çözerken kullanmaya başladım.",
    ],
    closing:
      "Teknik sorun çözmek benim için ezberlenen bir işlemden çok, doğal bir öğrenme biçimine dönüştü.",
  },
  {
    number: "02",
    period: "Üniversite yılları",
    title: "Farklı bir akademik yol",
    summary:
      "Bilgisayar mühendisliği hedefiyle başlayan planım farklı ilerledi ve Trakya Üniversitesi Ekonometri bölümünde eğitim aldım.",
    details: [
      "Eğitim ve çalışma hayatını aynı anda yürütmek zorunda kaldım.",
      "Teknik alandan uzak görünsem de bilgisayar kurulumları ve sorun giderme çalışmaları devam etti.",
      "Analitik düşünme, araştırma ve veri odaklı yaklaşımımı güçlendirdim.",
    ],
    closing:
      "Akademik yolum değişti; teknik merakım ve bu alanda çalışma isteğim değişmedi.",
  },
  {
    number: "03",
    period: "İş hayatı",
    title: "Operasyonun öğrettiği disiplin",
    summary:
      "Yoğun saha ve operasyon ortamı; sorumluluk, zaman yönetimi, hata kontrolü ve süreç takibi alışkanlığı kazandırdı.",
    details: [
      "Dijital el terminalleri ve stok takip sistemleriyle çalıştım.",
      "Siparişlerin doğru, eksiksiz ve zamanında hazırlanması süreçlerinde görev aldım.",
      "Farklı ekiplerle koordinasyon kurmayı ve yoğun tempoda düzenli çalışmayı öğrendim.",
    ],
    closing:
      "Bugün IT Support alanına taşıdığım en önemli kazanımlardan biri, sorunları sonuca kadar takip etme disiplinidir.",
  },
  {
    number: "04",
    period: "Bugün",
    title: "Bilinçli bir IT Support geçişi",
    summary:
      "Uygulamalı teknik deneyimimi kurumsal destek süreçleri, kullanıcı iletişimi ve düzenli dokümantasyon yaklaşımıyla tamamlıyorum.",
    details: [
      "Donanım, Windows, temel ağ ve uzaktan destek becerilerimi geliştiriyorum.",
      "Microsoft 365, help desk ve kullanıcı yönetimi süreçlerine odaklanıyorum.",
      "Çalıştığım kurumun işleyişini öğrenerek zamanla daha fazla sorumluluk almayı hedefliyorum.",
    ],
    closing:
      "Hedefim bir kuruma yalnızca katılmak değil; kullanıcıların güvenebileceği kalıcı bir teknik destek noktası hâline gelmek.",
  },
];
