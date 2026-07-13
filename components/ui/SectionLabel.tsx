type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-neutral-400 ${className}`}
    >
      {children}
    </span>
  );
}
