import { Disclosure, DisclosurePanel } from "../../components/kit/Disclosure";
import { Button } from "react-aria-components";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo puedo empezar a usar la plataforma?",
    answer:
      "Solo necesitas registrarte con tu correo electrónico. Una vez creada tu cuenta, podrás acceder a todos los cursos y materiales disponibles de forma gratuita.",
  },
  {
    question: "¿La plataforma es accesible para personas con discapacidad?",
    answer:
      "Sí. Emcode está diseñada siguiendo las pautas de accesibilidad WCAG AA. Contamos con soporte para lectores de pantalla, navegación por teclado, alto contraste y ajustes de tipografía.",
  },
  {
    question: "¿Qué tecnologías necesito para tomar los cursos?",
    answer:
      "Solo necesitas un navegador web moderno y conexión a internet. Los cursos incluyen editores de código integrados y entornos de práctica sin necesidad de instalar software adicional.",
  },
  {
    question: "¿Cómo puedo obtener soporte técnico?",
    answer:
      "Puedes contactarnos a través del chat en vivo disponible en la plataforma o enviarnos un correo electrónico. Nuestro equipo de soporte está disponible en horario laboral.",
  },
  {
    question: "¿Mis datos están protegidos?",
    answer:
      "Sí. Cumplimos con las regulaciones de protección de datos vigentes. Toda la información se transmite de forma cifrada y no compartimos datos personales con terceros sin tu consentimiento.",
  },
];

export function FAQSection() {
  return (
    <section aria-label="Preguntas frecuentes">
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Preguntas Frecuentes
      </h2>
      <p className="mt-4 text-base text-text-body text-center">
        Respondemos las dudas más comunes sobre la plataforma.
      </p>
      <div className=" mt-12  space-y-3">
        {faqs.map((faq) => (
          <Disclosure key={faq.question} className="border border-border-card rounded-lg overflow-hidden">
            <h3>
              <Button
                slot="trigger"
                className="flex w-full items-center justify-between gap-2 bg-surface-primary px-5 py-4 text-left text-sm font-semibold text-text-headings transition hover:bg-surface-action-hover-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {faq.question}
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-text-body transition-transform duration-200 group-data-[expanded]:rotate-180"
                />
              </Button>
            </h3>
            <DisclosurePanel className="bg-surface-page">
              <div className="px-5 py-4 text-sm text-text-body">
                {faq.answer}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
