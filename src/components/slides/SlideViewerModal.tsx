import { useState, useEffect } from "react";
import { Button } from "react-aria-components";
import { X, FileText, Image, ListChecks, CheckSquare, AlignLeft, Trash2, Pencil, AlertTriangle } from "lucide-react";

import type { Slide, SlideTemplateType } from "../../types/slide";
import { templateLabels } from "../../types/slide";
import { useSlides } from "../../hooks/useSlides";
import SlideFormModal from "./SlideFormModal";

interface SlideViewerModalProps {
  lessonId: number;
  lessonType: "theory" | "practice";
  onClose: () => void;
}

const templateIcons: Record<SlideTemplateType, React.ReactNode> = {
  text: <AlignLeft size={16} aria-hidden="true" />,
  text_image: <Image size={16} aria-hidden="true" />,
  single_choice: <ListChecks size={16} aria-hidden="true" />,
  multiple_choice: <CheckSquare size={16} aria-hidden="true" />,
  fill_blank: <FileText size={16} aria-hidden="true" />,
};

function getSlidePreview(slide: Slide): string {
  if (slide.title) return slide.title;
  const text = slide.text || "";
  const preview = text.replace(/\n/g, " ").trim();
  return preview.length > 80 ? preview.slice(0, 80) + "..." : preview;
}

function SlideViewerModal({ lessonId, lessonType, onClose }: SlideViewerModalProps) {
  const { fetchSlidesByLesson, deleteSlide } = useSlides();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [deletingSlideId, setDeletingSlideId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadSlides();
  }, [lessonId]);

  async function loadSlides() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSlidesByLesson(lessonId);
      setSlides(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar slides");
    }
    setLoading(false);
  }

  async function confirmDelete() {
    if (deletingSlideId === null) return;
    setDeleting(true);
    try {
      await deleteSlide(deletingSlideId);
      setSlides((prev) => prev.filter((s) => s.id !== deletingSlideId));
    } catch {
      // error handled by hook
    }
    setDeletingSlideId(null);
    setDeleting(false);
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-viewer-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex w-[min(56rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] flex-col gap-4 rounded-2xl bg-surface-primary p-4 shadow-xl sm:p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
          <div className="flex items-center justify-between">
            <h2
              id="slide-viewer-title"
              className="text-lg font-semibold text-text-headings"
            >
              Slides de la lección
            </h2>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          {loading && (
            <p className="text-sm text-text-body animate-pulse" aria-live="polite">Cargando slides...</p>
          )}

          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-lg border border-border-danger bg-surface-danger px-3 py-2.5 text-sm text-text-danger">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && slides.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <FileText size={32} className="text-text-disabled" aria-hidden="true" />
              <p className="text-text-body text-sm">No hay slides en esta lección.</p>
            </div>
          )}

          {!loading && slides.length > 0 && (
            <div className="flex flex-col gap-2">
              {slides.map((slide, index) => {
                const slideDesc = `${index + 1}: ${getSlidePreview(slide) || "Sin título"}`;
                return (
                <div
                  key={slide.id}
                  className="flex items-center gap-3 rounded-lg border border-border-card p-3 transition hover:bg-surface-card"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-action/10 text-surface-action">
                    {templateIcons[slide.slideType]}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-xs font-medium uppercase tracking-wider text-text-disabled">
                      {templateLabels[slide.slideType]}
                    </span>
                    <span className="truncate text-sm text-text-body">
                      {getSlidePreview(slide) || "Sin título"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label={`Editar slide ${slideDesc}`}
                      onClick={() => setEditingSlide(slide)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Eliminar slide ${slideDesc}`}
                      onClick={() => setDeletingSlideId(slide.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-danger transition hover:bg-surface-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          )}

          {!loading && (
            <div className="flex justify-end pt-2">
              <Button
                aria-label="Cerrar"
                onPress={onClose}
                className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </div>

      {editingSlide && (
        <SlideFormModal
          lessonId={lessonId}
          lessonType={lessonType}
          existingSlides={[editingSlide]}
          onClose={() => {
            setEditingSlide(null);
            loadSlides();
          }}
          onSlidesCreated={loadSlides}
        />
      )}

      {deletingSlideId !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-slide-confirm-title"
          aria-describedby="delete-slide-confirm-desc"
        >
          <div
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
            onClick={() => !deleting && setDeletingSlideId(null)}
          />
          <div
            className="relative flex w-[min(32rem,calc(100vw-2rem))] max-w-none flex-col gap-5 overflow-hidden rounded-2xl border border-border-card bg-surface-primary p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === "Escape" && !deleting) setDeletingSlideId(null);
            }}
          >
            <div className="flex flex-col gap-1">
              <h3 id="delete-slide-confirm-title" className="text-lg font-semibold text-text-headings">
                ¿Eliminar slide?
              </h3>
              <p id="delete-slide-confirm-desc" className="text-sm text-text-body">
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingSlideId(null)}
                disabled={deleting}
                className="shrink-0 rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="shrink-0 rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SlideViewerModal;
