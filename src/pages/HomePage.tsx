'use client';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import heroImage from '../assets/imgs/landing-page-image.png';

const platformOptions = [
  {
    title: 'Para estudiantes',
    description:
      'Accedé a cursos de programación adaptados, aprendé a tu ritmo y encontrá materiales pensados para diferentes formas de aprender.',
  },
  {
    title: 'Para docentes',
    description:
      'Descubrí recursos y estrategias para diseñar clases inclusivas, compartí tus propios cursos y mejorá la experiencia educativa de tu estudiantado.',
  },
];

const features = [
  {
    title: 'Contenido accesible',
    description: 'Cursos diseñados siguiendo buenas prácticas de accesibilidad.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Aprendizaje flexible',
    description: 'Avanzá a tu ritmo con contenido organizado y fácil de seguir.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Comunidad educativa',
    description: 'Conectá con otros estudiantes y docentes comprometidos con la educación inclusiva.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Herramientas para docentes',
    description: 'Creá, gestioná y compartí cursos adaptados a distintas necesidades.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-12 sm:px-8 lg:px-12 mb-64">
        <section aria-label="Hero" className="rounded-[20px] border border-border-card bg-surface-primary p-12 sm:p-16">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl leading-tight font-extrabold text-text-headings">Aprendé y enseñá programación de forma accesible</h1>
              <p className="max-w-[620px] text-base text-text-body">Accedé a cursos, materiales y guías prácticas para mejorar la enseñanza y el aprendizaje de la programación, considerando distintas necesidades y estilos de aprendizaje.</p>
              <div className="pt-4">
                <Button variant="primary" onPress={() => navigate("/login")}>Explorar cursos</Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={heroImage}
                alt="Estudiantes aprendiendo programación en la plataforma Emcode"
                className="h-auto w-full max-w-[540px] rounded-[20px] object-cover aspect-square md:aspect-auto"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12 mb-64">
        <section aria-label="Secciones de la plataforma">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-text-headings">¿Qué podés hacer en la plataforma?</h2>
            <p className="mt-6 text-base text-text-body">Explorá las principales formas de aprender, enseñar y compartir conocimiento dentro de la plataforma.</p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
            {platformOptions.map((option) => (
              <div key={option.title} className="space-y-3">
                <h3 className="text-xl md:text-3xl font-semibold text-text-headings">{option.title}</h3>
                <p className="text-sm text-text-body">{option.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12 mb-64">
        <section aria-label="Características principales">
          <div className="text-center">
            <h3 className="text-2xl md:text-4xl font-semibold text-text-headings">Características principales</h3>
            <p className="mt-6 text-base text-text-body">Conocé las herramientas y funcionalidades diseñadas para facilitar una experiencia de aprendizaje accesible.</p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-border-card bg-surface-primary p-6 transition duration-200 hover:-translate-y-1"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700/10 text-primary-700 transition duration-200 group-hover:bg-primary-700 group-hover:text-white">
                  {feature.icon}
                </div>
                <h4 className="text-xl md:text-3xl font-semibold text-text-headings">{feature.title}</h4>
                <p className="mt-2 text-sm text-text-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
