import { useState, useEffect } from "react";
import { Button } from "react-aria-components";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GuideSection {
  heading: string;
  body: string;
}

interface Guide {
  id: number;
  title: string;
  summary: string;
}

interface GuideDetail extends Guide {
  sections: GuideSection[];
}

function GuidesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<GuideDetail | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error,setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoadingList(true);
    setError(null);
    fetch(`${API_URL}/api/guides`, {
      // headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("No se pudo cargar la lista de guías.");
        return r.json();
      })
      .then((data: Guide[]) => setGuides(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingList(false));
  }, []);

  async function handleSelect(id: number) {
    setLoadingDetail(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/guides/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo cargar el contenido de la guía.");
      const data: GuideDetail = await res.json();
      setSelected(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingDetail(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-8 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <section aria-label="Encabezado" className="flex flex-col gap-2">
          <Button
            onPress={() =>
              selected ? setSelected(null) : navigate("/teacher")
            }
            className="flex items-center gap-1.5 text-sm text-text-body hover:text-text-headings transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded w-fit cursor-pointer"
            aria-label={
              selected ? "Volver a la lista de guías" : "Volver al dashboard"
            }
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver
          </Button>

          {!selected && (
            <>
              <h1 className="text-2xl font-bold text-text-headings sm:text-3xl">
                Guías para docentes
              </h1>
              <p className="text-sm text-text-body sm:text-base">
                Recursos y estrategias para adaptar tu enseñanza a distintas
                necesidades.
              </p>
            </>
          )}
        </section>

        {/* Lista de guías*/}
        {!selected && (
          <section
            aria-label="Lista de guías disponibles"
            className="flex flex-col gap-4"
          >
            {loadingList ? (
              <p className="text-sm text-text-body" aria-live="polite">
                Cargando guías...
              </p>
            ) : (
              <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
                {guides.map((guide) => (
                  <li key={guide.id} className="h-full">
                    <Button
                      onPress={() => handleSelect(guide.id)}
                      isDisabled={loadingDetail}
                      aria-label={`Seleccionar guía: ${guide.title}`}
                      className="h-full w-full text-left flex flex-row items-center gap-5 rounded-2xl border border-border-card bg-surface-primary p-5 shadow-sm transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100">
                        <BookOpen
                          size={28}
                          className="text-primary-700"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-text-headings leading-snug sm:text-base">
                          {guide.title}
                        </h2>
                        <p className="text-sm text-text-body line-clamp-2">
                          {guide.summary}
                        </p>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

     
        {loadingDetail && (
          <p className="text-sm text-text-body" aria-live="polite">
            Cargando guía...
          </p>
        )}

          {error && (
            <p className="text-sm text-text-danger" aria-live="polite">
              {error}
            </p>
          )}
          
        {/*Contenido de la guía seleccionada*/}
        {selected && !loadingDetail && (
          <article
            aria-label={`Artículo: ${selected.title}`}
            className="flex min-w-0 flex-1 flex-col gap-lg"
          >
           
            <div className="flex flex-col gap-xs">
              <h1 className="text-[1.5rem] font-bold leading-tight text-text-headings sm:text-[1.75rem]">
                {selected.title}
              </h1>
              <p className="text-body text-text-body">{selected.summary}</p>
            </div>

            <hr className="border-border-card" />

            <div className="flex flex-col gap-xl">
              {selected.sections.map((section, i) => (
                <div key={i} className="flex flex-col gap-sm">
                  <p className="text-body-sm font-semibold uppercase tracking-wide text-primary">
                    {section.heading}
                  </p>
                  <p className="text-body text-text-body leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}

export default GuidesPage;