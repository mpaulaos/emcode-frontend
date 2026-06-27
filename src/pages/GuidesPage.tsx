import { useReducer } from "react";
import { Button } from "react-aria-components";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useFetch } from "../lib/useFetch";

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

interface GuidesPageState {
  selected: GuideDetail | null;
  loadingDetail: boolean;
  detailError: string | null;
}

type GuidesPageAction =
  | { type: 'SELECT'; guide: GuideDetail }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_LOADING_DETAIL'; loading: boolean }
  | { type: 'SET_DETAIL_ERROR'; error: string | null };

function guidesReducer(state: GuidesPageState, action: GuidesPageAction): GuidesPageState {
  switch (action.type) {
    case 'SELECT':
      return { ...state, selected: action.guide, detailError: null };
    case 'CLEAR_SELECTION':
      return { ...state, selected: null, detailError: null };
    case 'SET_LOADING_DETAIL':
      return { ...state, loadingDetail: action.loading };
    case 'SET_DETAIL_ERROR':
      return { ...state, detailError: action.error };
  }
}

function GuidesPage() {
  const [state, dispatch] = useReducer(guidesReducer, {
    selected: null,
    loadingDetail: false,
    detailError: null,
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const { data: guides, loading: loadingList, error: listError } = useFetch<Guide[]>(`${API_URL}/api/guides`);
  const error = listError ?? state.detailError;

  async function handleSelect(id: number) {
    dispatch({ type: 'SET_LOADING_DETAIL', loading: true });
    dispatch({ type: 'SET_DETAIL_ERROR', error: null });
    try {
      const res = await fetch(`${API_URL}/api/guides/${id}`);
      if (!res.ok) throw new Error("No se pudo cargar el contenido de la guía.");
      const data: GuideDetail = await res.json();
      dispatch({ type: 'SELECT', guide: data });
    } catch (err) {
      dispatch({ type: 'SET_DETAIL_ERROR', error: (err as Error).message });
    } finally {
      dispatch({ type: 'SET_LOADING_DETAIL', loading: false });
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
          {state.selected && (
            <Button
              onPress={() => dispatch({ type: 'CLEAR_SELECTION' })}
              className="flex items-center gap-1.5 text-sm text-text-body hover:text-text-headings transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded w-fit cursor-pointer"
              aria-label="Volver a la lista de guías"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Volver
            </Button>
          )}

          {!state.selected && (
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
        {!state.selected && (
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
                {(guides ?? []).map((guide) => (
                  <li key={guide.id} className="h-full">
                    <Button
                      onPress={() => handleSelect(guide.id)}
                      isDisabled={state.loadingDetail}
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

     
        {state.loadingDetail && (
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
        {state.selected && !state.loadingDetail && (
          <article
            aria-label={`Artículo: ${state.selected.title}`}
            className="flex min-w-0 flex-1 flex-col gap-lg"
          >
           
            <div className="flex flex-col gap-xs">
              <h1 className="text-[1.5rem] font-bold leading-tight text-text-headings sm:text-[1.75rem]">
                {state.selected.title}
              </h1>
              <p className="text-body text-text-body">{state.selected.summary}</p>
            </div>

            <hr className="border-border-card" />

            <div className="flex flex-col gap-xl">
              {state.selected.sections.map((section, i) => (
                <div key={`${i}-${section.heading}`} className="flex flex-col gap-sm">
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