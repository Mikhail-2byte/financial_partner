import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { team } from "@/content/team";

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function TeamSection() {
  return (
    <Section id="komanda" className="bg-cream border-t border-line scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Команда
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            За каждым клиентом закреплён именной бухгалтер. Никаких
            колл-центров и «следующего свободного оператора».
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li
              key={member.slug}
              className="p-6 rounded-2xl bg-white border border-line text-center"
            >
              <ImagePlaceholder
                ratio="square"
                shape="circle"
                size="sm"
                label={`Портрет: ${member.name}`}
                className="size-28 mx-auto mb-5 bg-brand-100/80 border-brand-200"
                fallback={
                  <span className="font-display font-extrabold text-3xl text-brand-700">
                    {getInitials(member.name)}
                  </span>
                }
              />
              <h3 className="font-display font-bold text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-muted mb-3">{member.role}</p>
              <Badge variant="brand" className="mb-3">
                Опыт {member.experience}
              </Badge>
              <p className="text-sm text-muted leading-relaxed">
                {member.specialization}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
