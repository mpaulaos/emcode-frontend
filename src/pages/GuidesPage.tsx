import { useState } from "react";
import { Button } from "react-aria-components";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { guides } from "../types/guides";
import type { Guide } from "../types/guides";

function GuidesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Guide | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-8 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        {/*boton para regresar*/}
        <section aria-label="Encabezado" className="flex flex-col gap-2">
          <Button
            onPress={() =>
              selected ? setSelected(null) : navigate("/teacher")
            }
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 rounded w-fit cursor-pointer"
            aria-label={
              selected ? "Volver a la lista de guías" : "Volver al dashboard"
            }
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver
          </Button>


        {/* titulo y la descripcion de la pagina principal de guías*/}
          {!selected && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Guías para docentes
              </h1>
              <p className="text-sm text-gray-600 sm:text-base">
                Recursos y estrategias para adaptar tu enseñanza a distintas
                necesidades.
              </p>
            </>
          )}
        </section>

        {/*lista de las guias dentro de la página*/}
        {!selected && (
          <section
            aria-label="Lista de guías disponibles"
            className="flex flex-col gap-4"
          >
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {guides.map((guide) => (
                <li key={guide.id}>
                  <Button
                    onPress={() => setSelected(guide)}
                    aria-label={`Seleccionar guía: ${guide.title}`}
                    className="w-full text-left flex flex-row items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md
                    hover:border-violet-300 pressed:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 cursor-pointer"
                  >
                    {/*icono al izq de la card de la guía*/}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <BookOpen
                        size={28}
                        className="text-violet-700"
                        aria-hidden="true"
                      />
                    </div>

                    {/*ttulo y descripción de la card*/}
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-semibold text-gray-900 leading-snug sm:text-base">
                        {guide.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {guide.summary}
                      </p>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/*toda el contenido de la guía*/}
        {selected && (
          <article
            aria-label={`Artículo: ${selected.title}`}
            className="flex flex-col gap-6 w-full"
          >
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {selected.title}
              </h1>
              <hr className="border-gray-200 mt-2" />
            </header>

            <div className="flex flex-col gap-6">
              {selected.content.map((section, i) => (
                <section key={i} aria-label={section.heading}>
                  <h2 className="text-base font-semibold text-gray-900 mb-2 sm:text-lg">
                    {section.heading}
                  </h2>
                  <p className="text-sm leading-7 text-gray-700">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}

export default GuidesPage;
