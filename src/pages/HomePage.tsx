'use client';
import { NavLink } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex w-full flex-col gap-20">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-12 sm:px-8 lg:px-12">
        <section className="rounded-[20px] border border-neutral-200 bg-white p-12 shadow-lg shadow-black/5 sm:p-16">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Aprendé y enseñá</p>
              <h1 className="text-4xl leading-tight font-extrabold text-neutral-900 md:text-5xl lg:text-6xl">Aprendé y enseñá programación de forma accesible</h1>
              <p className="max-w-[620px] text-base text-neutral-600">Accedé a cursos, materiales y guías prácticas para mejorar la enseñanza y el aprendizaje de la programación, considerando distintas necesidades y estilos de aprendizaje.</p>
              <NavLink to="/login" className="mt-4 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Explorar cursos</NavLink>
            </div>

            <div className="flex items-center justify-center">
              <div className="h-[280px] w-full max-w-[560px] rounded border border-neutral-200 bg-neutral-50 p-6 flex items-center justify-center">
                <img src="https://via.placeholder.com/520x300" alt="hero illustration" className="max-h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-neutral-900">¿Qué podés hacer en la plataforma?</h2>
          <p className="mt-4 text-sm text-neutral-600">Explorá las principales formas de aprender, enseñar y compartir conocimiento dentro de la plataforma.</p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Para estudiantes</h3>
            <p className="text-sm text-neutral-600">Accedé a cursos de programación adaptados, aprendé a tu ritmo y encontrá materiales pensados para diferentes formas de aprender.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">Para docentes</h3>
            <p className="text-sm text-neutral-600">Descubrí recursos y estrategias para diseñar clases inclusivas, compartí tus propios cursos y mejorá la experiencia educativa de tu estudiantado.</p>
          </div>
        </div>

        <div className="mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-semibold text-neutral-900">Características principales</h3>
            <p className="mt-4 text-sm text-neutral-600">Conocé las herramientas y funcionalidades diseñadas para facilitar una experiencia de aprendizaje accesible.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="font-semibold">Contenido accesible</h4>
              <p className="mt-2 text-sm text-neutral-600">Cursos diseñados siguiendo buenas prácticas de accesibilidad.</p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="font-semibold">Aprendizaje flexible</h4>
              <p className="mt-2 text-sm text-neutral-600">Avanzá a tu ritmo con contenido organizado y fácil de seguir.</p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="font-semibold">Comunidad educativa</h4>
              <p className="mt-2 text-sm text-neutral-600">Conectá con otros estudiantes y docentes comprometidos con la educación inclusiva.</p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="font-semibold">Herramientas para docentes</h4>
              <p className="mt-2 text-sm text-neutral-600">Creá, gestioná y compartí cursos adaptados a distintas necesidades.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
