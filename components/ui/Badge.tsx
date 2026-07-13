type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border border-white/15 text-white/50 text-xs font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
