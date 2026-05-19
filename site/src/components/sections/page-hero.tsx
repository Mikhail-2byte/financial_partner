import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <Section className="relative overflow-hidden pt-12 md:pt-20 pb-10 md:pb-12">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 size-96 rounded-full bg-accent-100/50 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <Badge variant="brand" className="mb-6">
              {eyebrow}
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-10 flex flex-col sm:flex-row gap-4">{children}</div>}
        </div>
      </Container>
    </Section>
  );
}
