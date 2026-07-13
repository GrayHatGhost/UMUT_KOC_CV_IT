import { Variants } from "framer-motion";

// Merkezi animasyon konfigürasyonu
// PROMPT.md §9 ve §23'e göre

export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: {
    fast: 0.25,
    normal: 0.35,
    scene: 0.8,
    modal: 0.55,
  },
  stagger: {
    text: 0.08,
    list: 0.06,
  },
} as const;

// Sahne geçiş varyantları
export const sceneVariants: Variants = {
  active: {
    filter: "blur(0px)",
    opacity: 1,
    scale: 1,
    y: 0,
  },
  approaching: {
    filter: "blur(5px)",
    opacity: 0.45,
    scale: 0.975,
    y: 32,
  },
  behind: {
    filter: "blur(7px)",
    opacity: 0.28,
    scale: 0.965,
    y: -24,
  },
};

// Metin reveal animasyonu
export const textRevealVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: motionTokens.duration.scene,
      ease: motionTokens.ease,
    },
  },
};

// Stagger container
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTokens.stagger.text,
      delayChildren: 0.2,
    },
  },
};

// Stagger item
export const staggerItemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease,
    },
  },
};

// Fade up (genel)
export const fadeUpVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: motionTokens.duration.scene,
      ease: motionTokens.ease,
    },
  },
};

// Proje satırı hover
export const projectHoverVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 8, transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease } },
};

// Modal varyantları
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.modal,
      ease: motionTokens.ease,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 16,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease,
    },
  },
};

// Backdrop varyantları
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionTokens.duration.modal, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: motionTokens.duration.normal, ease: "easeIn" },
  },
};

// Galeri varyantları
export const galleryVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.ease },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.ease },
  }),
};

// Menü varyantları
export const menuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.modal,
      ease: motionTokens.ease,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.ease },
  },
};

export const menuItemVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.ease },
  },
};
