type DividerProps = {
  className?: string;
};

export default function Divider({ className = "" }: DividerProps) {
  return (
    <hr
      className={`border-0 border-t border-white/10 ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
