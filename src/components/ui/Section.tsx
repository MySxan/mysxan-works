// Section component - renders consistent spacing and heading styles
import { Container } from "./Container";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <Container>
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </Container>
    </section>
  );
}
