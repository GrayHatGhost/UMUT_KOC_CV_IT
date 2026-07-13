// Hikâye perdeleri — PROMPT.md §12
export type StoryChapter = {
  number: string;
  period: string;
  title: string;
  paragraphs: string[];
};

export const storyChapters: StoryChapter[] = [
  {
    number: "01",
    period: "2013–2017",
    title: "Merakla başlayan yol",
    paragraphs: [
      "Bilgisayar donanımına olan ilgim lise yıllarında başladı.",
      "Kendi bilgisayarımda yaşadığım sorunlara çözüm ararken Donanım Haber forumuyla tanıştım. Önce kendi sorularımın cevabını bulmaya çalışıyor, ardından farklı kullanıcıların açtığı konu başlıklarını merak ederek okuyordum.",
      "Her çözdüğüm sorun yeni bir tecrübeye dönüşüyordu. Bir süre sonra öğrendiklerimi başka insanların bilgisayar sorunlarını çözerken kullanmaya başladım.",
      "Bilgisayar sökmek, parça değiştirmek, arızanın kaynağını araştırmak ve sistemi yeniden çalışır hâle getirmek benim için yalnızca bir uğraş değil, doğal bir öğrenme biçimi olmuştu.",
    ],
  },
  {
    number: "02",
    period: "Üniversite yılları",
    title: "Planladığımdan farklı bir akademik yol",
    paragraphs: [
      "Lise döneminde bilgisayar mühendisliği okumayı hayal ediyordum. Üniversite sınavına yeterince hazırlanmadığım için kazandığım ilk bölüm olan Ekonometriye yerleştim.",
      "Başlangıçta yeniden hazırlanmayı düşünüyordum. Fakat zamanla Ekonometri bölümünü sevdim ve eğitimime bu alanda devam ettim.",
      "Üniversite yıllarında maddi nedenlerle çalışmam gerekti. Eğitim ve iş hayatını aynı anda yürütmek mezuniyet sürecimi uzattı. Bu dönemde kariyerim teknik alandan uzak görünse de bilgisayarlarla olan bağım devam etti.",
    ],
  },
  {
    number: "03",
    period: "İş hayatı",
    title: "Operasyonun öğrettiği disiplin",
    paragraphs: [
      "Üniversite döneminde başladığım operasyon işi zamanla çalışma hayatımın ana parçasına dönüştü.",
      "Dijital el terminalleri, stok takip sistemleri, sipariş süreçleri ve yoğun iş temposu içinde çalışmak bana sorumluluk, zaman yönetimi, hata kontrolü ve süreç disiplini kazandırdı.",
      "Teknik kariyere geçişimi askerlik yükümlülüğüm tamamlanana kadar erteledim. Bu sırada bilgisayar kurulumları, donanım yükseltmeleri, arıza tespitleri, ağ çalışmaları ve uzaktan destek gibi teknik işlerle ilgilenmeye devam ettim.",
    ],
  },
  {
    number: "04",
    period: "Bugün",
    title: "Bilinçli bir kariyer geçişi",
    paragraphs: [
      "Bugün geçmişte kazandığım çalışma disiplinini, yıllardır geliştirdiğim teknik merak ve uygulamalı deneyimle birleştiriyorum.",
      "Hedefim ilk kurumsal IT Support deneyimimi kazanmak; bu süreçte teknik yetkinliklerimi sertifikalar, yabancı dil gelişimi ve gerçek iş tecrübesiyle güçlendirmek.",
      "Kariyerimin yönünü artık net biçimde biliyorum: kullanıcıların teknik sorunlarını anlayan, sistemleri düzenli biçimde yöneten ve çözüm üretirken öğrenmeye devam eden bir BT profesyoneli olmak.",
    ],
  },
];
