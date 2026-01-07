// Tag component - small pill label with size variants
interface TagProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Tag({ children, size = "md", className = "" }: TagProps) {
  return <span className={`tag tag-${size} ${className}`}>{children}</span>;
}
