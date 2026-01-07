// Container component - sets max-width, horizontal padding, and centers content
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`container ${className}`}>{children}</div>;
}
