const roadmapItems = [
  {
    title: "Funcionalidades actuales",
    status: "Completado",
    items: [
      "Cursos interactivos de programación",
      "Herramientas para docentes",
      "Autenticación y perfiles de usuario",
      "Diseño responsive y accesible",
      "Modo oscuro",
    ],
    color: "text-success-500",
    bgColor: "bg-success-500/10",
  },
  {
    title: "Próximas mejoras",
    status: "En desarrollo",
    items: [
      "Nuevos cursos avanzados",
      "Sistema de evaluación y certificación",
      "Foros y comunidad integrada",
      "Soporte multilingüe",
    ],
    color: "text-primary-700",
    bgColor: "bg-primary-700/10",
  },
  {
    title: "Objetivos de mediano plazo",
    status: "Planificado",
    items: [
      "App móvil nativa",
      "Integración con herramientas externas",
      "Inteligencia artificial para aprendizaje adaptativo",
      "Programa de becas y alianzas educativas",
    ],
    color: "text-text-body",
    bgColor: "bg-border-card",
  },
];

export function RoadmapSection() {
  return (
    <section aria-label="Roadmap futuro">
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Roadmap Futuro
      </h2>
      <p className="mt-4 text-base text-text-body text-center max-w-2xl mx-auto">
        Conocé lo que ya tenemos, lo que estamos construyendo y hacia dónde nos dirigimos.
      </p>
      <div className="relative mt-16">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-border-card md:left-1/2 md:-translate-x-px" />
        <div className="space-y-12">
          {roadmapItems.map((item, index) => (
            <div
              key={item.title}
              className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-1" />
              <div className="absolute left-4 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary-700 bg-surface-page md:left-1/2 md:-translate-x-1/2">
                <div className="h-2 w-2 rounded-full bg-primary-700" />
              </div>
              <div className="flex-1 pl-14 md:pl-0 md:pr-12 md:text-right">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${item.bgColor} ${item.color}`}
                >
                  {item.status}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-text-headings">
                  {item.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {item.items.map((desc) => (
                    <li key={desc} className="flex items-start gap-2 text-sm text-text-body">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary-700" />
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
