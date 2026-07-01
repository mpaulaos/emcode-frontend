import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Luzdary",
    role: "Desarrollador Full Stack",
    description:
      "Apasionada por construir interfaces accesibles y experiencias de usuario inclusivas.",
    initials: "L",
  },
  {
    name: "María Paula",
    role: "Desarrollador Full Stack",
    description:
      "Enfocada en crear diseños centrados en el usuario que combinan estética y funcionalidad.",
    initials: "MP",
  },
  {
    name: "Óscar",
    role: "Desarrollador Full Stack",
    description:
      "Comprometido con el desarrollo de soluciones tecnológicas robustas y escalables.",
    initials: "O",
  },
];

export function TeamSection() {
  return (
    <section aria-label="Equipo de desarrollo">
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Equipo de Desarrollo
      </h2>
      <p className="mt-4 text-base text-text-body text-center">
        Conocé a las personas que hacen posible Emcode.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center rounded-xl border border-border-card bg-surface-primary p-8 text-center"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-700 text-2xl font-bold text-white"
              aria-hidden="true"
            >
              {member.initials}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-headings">
              {member.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary-700">
              {member.role}
            </p>
            <p className="mt-2 text-sm text-text-body">
              {member.description}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label={`GitHub de ${member.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-body transition hover:bg-surface-action-hover-2 hover:text-text-headings"
              >
                <FaGithub size={18} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label={`LinkedIn de ${member.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-body transition hover:bg-surface-action-hover-2 hover:text-text-headings"
              >
                <FaLinkedin size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
