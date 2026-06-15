const technologies = [
  {
    name: "React",
    description: "Biblioteca para construir interfaces de usuario interactivas y dinámicas.",
  },
  {
    name: "Next.js",
    description: "Framework de React para aplicaciones web con renderizado del lado del servidor.",
  },
  {
    name: "TypeScript",
    description: "Superset de JavaScript que agrega tipado estático para mayor robustez.",
  },
  {
    name: "Tailwind CSS",
    description: "Framework de CSS utilitario para diseñar interfaces rápidas y consistentes.",
  },
  {
    name: "Node.js",
    description: "Entorno de ejecución para JavaScript del lado del servidor.",
  },
  {
    name: "PostgreSQL",
    description: "Sistema de base de datos relacional robusto y escalable.",
  },
];

export function TechStackSection() {
  return (
    <section aria-label="Tecnologías utilizadas">
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Tecnologías Utilizadas
      </h2>
      <p className="mt-4 text-base text-text-body text-center">
        Las herramientas y tecnologías que hacen posible la plataforma.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-4 rounded-xl border border-border-card bg-surface-primary p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-700/10 text-primary-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-headings">
                {tech.name}
              </h3>
              <p className="mt-0.5 text-xs text-text-body">
                {tech.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
