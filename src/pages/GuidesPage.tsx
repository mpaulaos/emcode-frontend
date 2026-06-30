import { useReducer, useState, useEffect } from "react";
import { Button } from "react-aria-components";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useFetch } from "../lib/useFetch";
import { processBody } from "../lib/textUtils";
import FocusTTS from "../components/FocusTTS";

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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  useEffect(() => {
    if (!state.selected) return;
    setActiveSection(null);

    const sectionIds = state.selected.sections.map((_, i) => `section-${i}`);

    function updateActiveSection() {
      if (window.scrollY < 10) {
        setActiveSection(null);
        return;
      }

      let bestId: string | null = null;
      let bestDist = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }

      setActiveSection(bestId);
    }

    let hasScrolled = false;
    let ticking = false;
    function handleScroll() {
      hasScrolled = true;
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.selected]);

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
    <>
      <style>{`
        .section-card {
          scroll-margin-top: 4rem;
          transition: background-color 1s ease-out;
        }
      `}</style>
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
            <FocusTTS text={`${state.selected.title}. ${state.selected.summary}`}>
              <div className="flex flex-col gap-xs">
                <h1 className="text-[1.5rem] font-bold leading-tight text-text-headings sm:text-[1.75rem]">
                  {state.selected.title}
                </h1>
                <p className="text-body text-text-body">{state.selected.summary}</p>
              </div>
            </FocusTTS>

            {state.selected.sections.length > 1 && (
              <FocusTTS
                focusable={false}
                text={`En esta guía: ${state.selected.sections.map((s, i) => `${i + 1}. ${s.heading}`).join(". ")}`}
              >
                <nav
                  aria-label="Índice de contenidos"
                  className="rounded-lg border border-border-card bg-surface-card p-md"
                >
                  <p className="mb-sm text-body-sm font-semibold text-text-headings">
                    En esta guía
                  </p>
                  <ol className="flex flex-col gap-2xs text-body-sm text-text-action">
                    {state.selected.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(`section-${i}`);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "start" });
                              el.focus({ preventScroll: true });
                            }
                            setHighlightedSection(`section-${i}`);
                            setTimeout(() => setHighlightedSection(null), 2500);
                            history.replaceState(null, "", window.location.pathname);
                          }}
                          className={`rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus hover:underline ${
                            activeSection === `section-${i}` ? "font-semibold text-primary" : ""
                          }`}
                        >
                          {i + 1}. {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </FocusTTS>
            )}

            <hr className="border-border-card" />

            <div className="flex flex-col gap-xl">
              {state.selected.sections.map((section, i) => {
                const blocks = processBody(section.body);
                return (
                  <div
                    key={`${i}-${section.heading}`}
                    className="flex flex-col gap-xs"
                  >
                    <FocusTTS text={`${section.heading}. ${section.body}`}>
                      <div
                        id={`section-${i}`}
                        tabIndex={-1}
                        className={`section-card flex flex-col gap-sm border-s-md border-primary ps-md focus:outline-none ${
                          highlightedSection === `section-${i}` ? "bg-primary-100" : ""
                        }`}
                      >
                        <h2 className="text-body-sm font-semibold text-text-headings">
                          {i + 1}. {section.heading}
                        </h2>
                        <div className="flex flex-col gap-xs">
                          {blocks.map((block, j) => {
                            if (block.type === "paragraph" && block.content) {
                              return (
                                <p
                                  key={j}
                                  className="text-body text-text-body leading-relaxed"
                                >
                                  {block.content}
                                </p>
                              );
                            }
                            if (block.type === "list" && block.items.length > 0) {
                              const ListTag = block.ordered ? "ol" : "ul";
                              return (
                                <ListTag
                                  key={j}
                                  className={`text-body text-text-body leading-relaxed ${block.ordered ? "list-decimal" : "list-disc"} list-inside`}
                                >
                                  {block.items.map((item, k) => (
                                    <li key={k}>{item}</li>
                                  ))}
                                </ListTag>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </FocusTTS>
                  </div>
                );
              })}
            </div>
          </article>
        )}
      </main>
    </div>
    </>
  );
}

export default GuidesPage;