type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export default function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`container-site ${className}`}>
      {children}
    </Tag>
  );
}
