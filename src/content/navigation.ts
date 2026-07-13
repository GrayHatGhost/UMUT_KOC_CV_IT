// Navigasyon içeriği — PROMPT.md §10
export const navItems = [
  { label: "Hikâyem", href: "#hikayem" },
  { label: "Yönüm", href: "#gelisim" },
  { label: "Projeler", href: "#projeler" },
  { label: "Tasarım", href: "#tasarim" },
  { label: "CV", href: "#iletisim", isCV: true },
  { label: "İletişim", href: "#iletisim" },
] as const;

export const sectionIndicators = [
  { number: "01", label: "Açılış", href: "#giris" },
  { number: "02", label: "Hikâyem", href: "#hikayem" },
  { number: "03", label: "Yönüm", href: "#gelisim" },
  { number: "04", label: "Projeler", href: "#projeler" },
  { number: "05", label: "Tasarım", href: "#tasarim" },
  { number: "06", label: "İletişim", href: "#iletisim" },
] as const;
