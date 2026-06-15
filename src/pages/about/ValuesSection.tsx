import {
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Accessibility,
  Users,
  BookOpen,
} from "lucide-react";

const values = [
  {
    title: "Innovación",
    description: "Buscamos constantemente nuevas formas de enseñar y aprender, adoptando tecnologías y metodologías emergentes.",
    icon: Lightbulb,
  },
  {
    title: "Transparencia",
    description: "Actuamos con honestidad y claridad en cada decisión, generando confianza en nuestra comunidad.",
    icon: ShieldCheck,
  },
  {
    title: "Calidad",
    description: "Nos esforzamos por ofrecer contenido educativo riguroso, actualizado y bien diseñado.",
    icon: Sparkles,
  },
  {
    title: "Accesibilidad",
    description: "Diseñamos cada experiencia pensando en la diversidad de personas y contextos de aprendizaje.",
    icon: Accessibility,
  },
  {
    title: "Colaboración",
    description: "Creemos en el poder del trabajo en equipo y la construcción colectiva del conocimiento.",
    icon: Users,
  },
  {
    title: "Aprendizaje continuo",
    description: "Fomentamos una cultura de mejora permanente, tanto en nuestros usuarios como en nuestro equipo.",
    icon: BookOpen,
  },
];

export function ValuesSection() {
  return (
    <section aria-label="Valores">
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Nuestros Valores
      </h2>
      <p className="mt-4 text-base text-text-body text-center">
        Los principios que guían cada decisión y cada funcionalidad de la plataforma.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="group rounded-xl border border-border-card bg-surface-primary p-6 transition duration-200 motion-safe:hover:-translate-y-1"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700/10 text-primary-700 transition duration-200 group-hover:bg-primary-700 group-hover:text-white">
              <value.icon size={20} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-text-headings">
              {value.title}
            </h3>
            <p className="mt-2 text-sm text-text-body">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
