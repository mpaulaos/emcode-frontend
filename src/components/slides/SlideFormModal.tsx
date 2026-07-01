import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "react-aria-components";
import { X, ChevronDown, Check, AlertTriangle, FileText, Image, ListChecks, CheckSquare, AlignLeft, Plus, Upload } from "lucide-react";

import type { DraftSlide, SlideTemplateType, CreateSlideInput, SingleChoiceContent, MultipleChoiceContent, FillBlanksContent } from "../../types/slide";
import { getTemplatesForLessonType, templateLabels, createEmptyDraftSlide } from "../../types/slide";
import { useSlides } from "../../hooks/useSlides";
import { useAuth } from "../../context/AuthContext";
import ProgressBar from "../ui/ProgressBar";
import SlideNavPanel from "./SlideNavPanel";
import TextSlideFields from "./fields/TextSlideFields";
import TextImageSlideFields from "./fields/TextImageSlideFields";
import SingleChoiceFields from "./fields/SingleChoiceFields";
import MultipleChoiceFields from "./fields/MultipleChoiceFields";
import FillBlanksFields from "./fields/FillBlanksFields";

interface SlideFormModalProps {
  lessonId: number;
  lessonType: "theory" | "practice";
  onClose: () => void;
  onSlidesCreated?: () => void;
}

const templateIcons: Record<SlideTemplateType, React.ReactNode> = {
  text: <AlignLeft size={14} aria-hidden="true" />,
  text_image: <Image size={14} aria-hidden="true" />,
  single_choice: <ListChecks size={14} aria-hidden="true" />,
  multiple_choice: <CheckSquare size={14} aria-hidden="true" />,
  fill_blank: <FileText size={14} aria-hidden="true" />,
};

function validateSlide(slide: DraftSlide): string[] {
  const errors: string[] = [];
  switch (slide.slideType) {
    case "text":
      if (!slide.content.trim()) errors.push("El contenido explicativo es obligatorio.");
      break;
    case "text_image":
      if (!slide.imageUrl.trim()) errors.push("La imagen es obligatoria.");
      if (!slide.imageAlt.trim()) errors.push("El texto alternativo de la imagen es obligatorio.");
      break;
    case "single_choice": {
      if (!slide.question.trim()) errors.push("La pregunta es obligatoria.");
      const filledOptions = slide.options.filter((o) => o.text.trim());
      if (filledOptions.length < 2) errors.push("Debe haber al menos 2 opciones.");
      if (!slide.correctAnswer) errors.push("Debe seleccionar una opción correcta.");
      break;
    }
    case "multiple_choice": {
      if (!slide.question.trim()) errors.push("La pregunta es obligatoria.");
      const filled = slide.options.filter((o) => o.text.trim());
      if (filled.length < 2) errors.push("Debe haber al menos 2 opciones.");
      if (slide.correctAnswers.length < 1) errors.push("Debe seleccionar al menos una opción correcta.");
      break;
    }
    case "fill_blank": {
      if (!slide.textWithBlanks.trim()) errors.push("El texto con espacios es obligatorio.");
      const blankCount = (slide.textWithBlanks.match(/\{\{\d+\}\}/g) || []).length;
      if (blankCount < 1) errors.push('Debe incluir al menos un espacio marcado con {{n}}.');
      const hasEmptyAnswer = slide.blanks.some((b) => !b.correctAnswer.trim());
      if (hasEmptyAnswer) errors.push("Todos los espacios deben tener una respuesta.");
      break;
    }
  }
  return errors;
}

function buildCreateInput(slide: DraftSlide, position: number): CreateSlideInput {
  const raw = slide.slideType === "text" || slide.slideType === "text_image" ? slide.content : slide.question;
  const base: CreateSlideInput = {
    slideType: slide.slideType,
    text: slide.title ? `${slide.title}\n\n${raw}` : raw,
    order: position,
  };

  if (slide.slideType === "text_image") {
    base.imageUrl = slide.imageUrl;
    base.imageAlt = slide.imageAlt;
  }

  if (slide.slideType === "single_choice") {
    base.practiceContent = {
      question: slide.question,
      options: slide.options.filter((o) => o.text.trim()),
      correctAnswer: slide.correctAnswer,
    } as SingleChoiceContent;
  }

  if (slide.slideType === "multiple_choice") {
    base.practiceContent = {
      question: slide.question,
      options: slide.options.filter((o) => o.text.trim()),
      correctAnswers: slide.correctAnswers,
    } as MultipleChoiceContent;
  }

  if (slide.slideType === "fill_blank") {
    base.practiceContent = {
      textWithBlanks: slide.textWithBlanks,
      blanks: slide.blanks.filter((b) => b.correctAnswer.trim()),
    } as FillBlanksContent;
  }

  return base;
}

function SlideFormModal({ lessonId, lessonType, onClose, onSlidesCreated }: SlideFormModalProps) {
  const safeLessonType = lessonType === "theory" ? "theory" : "practice";
  const availableTemplates = getTemplatesForLessonType(safeLessonType);
  const isTheory = safeLessonType === "theory";
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmCancelRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [draftSlides, setDraftSlides] = useState<DraftSlide[]>(() => [
    createEmptyDraftSlide(availableTemplates[0]),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideErrors, setSlideErrors] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSlideDropdown, setShowSlideDropdown] = useState(false);

  const { createSlidesBatch } = useSlides();
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-slide-dropdown]")) {
        setShowSlideDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && !showConfirm) {
        onCloseRef.current();
      }
    },
    [showConfirm]
  );

  function updateCurrentSlide(updates: Partial<DraftSlide>) {
    setDraftSlides((prev) => {
      const updated = [...prev];
      updated[activeIndex] = { ...updated[activeIndex], ...updates, isDirty: true };
      if (updated[activeIndex].isValid) {
        updated[activeIndex].isValid = false;
      }
      return updated;
    });
    setSlideErrors([]);
  }

  function changeSlideType(newType: SlideTemplateType) {
    setDraftSlides((prev) => {
      const updated = [...prev];
      updated[activeIndex] = { ...createEmptyDraftSlide(newType), tempId: prev[activeIndex].tempId, isDirty: true };
      return updated;
    });
    setSlideErrors([]);
  }

  function addSlide() {
    const newSlide = createEmptyDraftSlide(draftSlides[activeIndex]?.slideType || availableTemplates[0]);
    setDraftSlides((prev) => [...prev, newSlide]);
    setActiveIndex(draftSlides.length);
    setSlideErrors([]);
    setShowSlideDropdown(false);
  }

  function selectSlide(index: number) {
    setActiveIndex(index);
    setSlideErrors([]);
    setShowSlideDropdown(false);
  }

  function handleSave() {
    const errors = validateSlide(draftSlides[activeIndex]);
    if (errors.length > 0) {
      setSlideErrors(errors);
      return;
    }
    setSlideErrors([]);
    setDraftSlides((prev) => {
      const updated = [...prev];
      updated[activeIndex] = { ...updated[activeIndex], isValid: true };
      return updated;
    });
  }

  function handleFinalize() {
    const firstInvalid = draftSlides.findIndex((s) => !s.isValid);
    if (firstInvalid !== -1) {
      setActiveIndex(firstInvalid);
      const errors = validateSlide(draftSlides[firstInvalid]);
      setSlideErrors(errors.length > 0 ? errors : ["Este slide no ha sido guardado."]);
      return;
    }
    setShowConfirm(true);
  }

  async function handleConfirmCreate() {
    setSubmitting(true);
    setDraftError(null);
    try {
      const slidesData: CreateSlideInput[] = draftSlides.map((s, i) =>
        buildCreateInput(s, i + 1)
      );
      await createSlidesBatch(lessonId, slidesData);
      onSlidesCreated?.();
      onClose();
    } catch (err) {
      setDraftError(
        err instanceof Error ? err.message : "Error inesperado al crear slides."
      );
      setShowConfirm(false);
    } finally {
      setSubmitting(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      updateCurrentSlide({ imageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  function getFieldComponent() {
    const current = draftSlides[activeIndex];
    const commonProps = {
      onChange: updateCurrentSlide,
      errors: slideErrors,
    };

    switch (current.slideType) {
      case "text":
        return <TextSlideFields content={current.content} {...commonProps} />;
      case "text_image":
        return (
          <TextImageSlideFields
            content={current.content}
            imageUrl={current.imageUrl}
            imageAlt={current.imageAlt}
            {...commonProps}
          />
        );
      case "single_choice":
        return (
          <SingleChoiceFields
            question={current.question}
            options={current.options}
            correctAnswer={current.correctAnswer}
            {...commonProps}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoiceFields
            question={current.question}
            options={current.options}
            correctAnswers={current.correctAnswers}
            {...commonProps}
          />
        );
      case "fill_blank":
        return (
          <FillBlanksFields
            textWithBlanks={current.textWithBlanks}
            blanks={current.blanks}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  }

  const validCount = draftSlides.filter((s) => s.isValid).length;
  const progress = Math.round((validCount / draftSlides.length) * 100);
  const currentSlide = draftSlides[activeIndex];

  function renderTheoryLayout() {
    const slide = currentSlide;
    const isTextImage = slide.slideType === "text_image";

    function handleFileClick() {
      fileInputRef.current?.click();
    }

    return (
      <div className="flex flex-col gap-6">
        {/* Mobile header with hamburger — simplified for theory */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-action px-3 py-2 text-sm font-medium text-text-on-action">
            <span className="truncate">Editando: {slide.title || "Sin título"}</span>
            <ChevronDown size={16} className="shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Template tabs — segmented control */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text-headings">Plantillas:</span>
          <div className="flex overflow-hidden rounded-lg border border-surface-action">
            <button
              type="button"
              onClick={() => changeSlideType("text_image")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus ${
                isTextImage
                  ? "bg-surface-action text-text-on-action"
                  : "bg-surface-primary text-text-body hover:bg-surface-card"
              }`}
              aria-pressed={isTextImage}
            >
              <Image size={14} aria-hidden="true" />
              Texto + Imagen
            </button>
            <button
              type="button"
              onClick={() => changeSlideType("text")}
              className={`flex items-center gap-1.5 border-l border-surface-action px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus ${
                !isTextImage
                  ? "bg-surface-action text-text-on-action"
                  : "bg-surface-primary text-text-body hover:bg-surface-card"
              }`}
              aria-pressed={!isTextImage}
            >
              <AlignLeft size={14} aria-hidden="true" />
              Solo Texto
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="slide-title"
                className="text-sm font-medium text-text-headings"
              >
                Título del slide
              </label>
              <input
                id="slide-title"
                type="text"
                value={slide.title}
                onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                placeholder="¿Qué es un Algoritmo?"
                className="w-full rounded-lg border border-surface-action/60 px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-surface-action focus:outline-none focus:ring-2 focus:ring-surface-action/30"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="slide-content"
                className="text-sm font-medium text-text-headings"
              >
                Contenido explicativo
              </label>
              <textarea
                id="slide-content"
                value={slide.content}
                onChange={(e) => updateCurrentSlide({ content: e.target.value })}
                rows={5}
                placeholder="Escribe el contenido explicativo..."
                className="w-full resize-y rounded-lg border border-surface-action/30 bg-surface-page px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-surface-action focus:outline-none focus:ring-2 focus:ring-surface-action/30"
              />
            </div>
          </div>

          {/* Right column — Image (only when Texto + Imagen) */}
          {isTextImage && (
            <div className="flex w-full flex-col gap-4 md:w-72 md:shrink-0">
              {/* Dropzone */}
              <div
                className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition ${
                  slide.imageUrl
                    ? "border-surface-action bg-surface-card"
                    : "border-border-card bg-surface-page"
                }`}
              >
                {slide.imageUrl ? (
                  <div className="flex w-full flex-col items-center gap-3">
                    <img
                      src={slide.imageUrl}
                      alt={slide.imageAlt || "Vista previa"}
                      className="max-h-40 rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={handleFileClick}
                      className="rounded-lg border border-border-card px-4 py-1.5 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      Cambiar imagen
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={28} className="text-text-disabled" aria-hidden="true" />
                      <p className="text-sm text-text-body">Arrastra una imagen aquí o</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleFileClick}
                      className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      Subir imagen
                    </button>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  aria-label="Seleccionar imagen"
                />
              </div>

              {/* Alt text */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="slide-image-alt"
                  className="text-sm font-medium text-text-headings"
                >
                  Texto alternativo (alt) — Accesibilidad <span className="text-text-danger">*</span>
                </label>
                <input
                  id="slide-image-alt"
                  type="text"
                  value={slide.imageAlt}
                  onChange={(e) => updateCurrentSlide({ imageAlt: e.target.value })}
                  placeholder="Placeholder"
                  className="w-full rounded-lg border border-border-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
                  aria-required="true"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        onClick={showConfirm ? undefined : onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-modal-title"
        className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:items-center sm:p-4"
      >
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="relative flex w-full max-w-5xl max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] flex-col gap-4 rounded-2xl bg-surface-primary p-4 shadow-xl sm:gap-6 sm:p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          {isTheory ? (
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1" data-slide-dropdown>
                <button
                  type="button"
                  onClick={() => setShowSlideDropdown((p) => !p)}
                  className="flex w-full items-center gap-2 rounded-lg bg-surface-action px-4 py-2 text-sm font-medium text-text-on-action transition hover:bg-surface-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  aria-haspopup="listbox"
                  aria-expanded={showSlideDropdown}
                >
                  <span className="truncate">
                    Editando: {currentSlide.title || "Sin título"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition ${showSlideDropdown ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {showSlideDropdown && (
                  <div
                    role="listbox"
                    aria-label="Seleccionar slide"
                    className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border border-border-card bg-surface-primary p-1 shadow-lg"
                  >
                    {draftSlides.map((s, i) => (
                      <button
                        key={s.tempId}
                        role="option"
                        aria-selected={i === activeIndex}
                        onClick={() => selectSlide(i)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus ${
                          i === activeIndex
                            ? "bg-surface-action/10 text-surface-action font-medium"
                            : "text-text-body hover:bg-surface-card"
                        }`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-surface-page text-xs text-text-disabled">
                          {i + 1}
                        </span>
                        <span className="truncate">{s.title || "Sin título"}</span>
                        {s.isValid && (
                          <Check size={14} className="shrink-0 text-success-500" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                    <div className="my-1 border-t border-border-card" />
                    <button
                      role="option"
                      onClick={addSlide}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-surface-action transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
                    >
                      <Plus size={15} aria-hidden="true" />
                      Agregar slide
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  aria-label="Finalizar y crear slides"
                  onPress={handleFinalize}
                  isDisabled={submitting}
                  className="flex items-center gap-1.5 rounded-lg bg-surface-action px-4 py-1.5 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {submitting ? "Creando..." : "Finalizar"}
                  {!submitting && <Check size={16} aria-hidden="true" />}
                </Button>
                <Button
                  aria-label="Cerrar modal"
                  onPress={onClose}
                  isDisabled={submitting}
                  className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <X size={18} aria-hidden="true" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <h2
                id="slide-modal-title"
                className="text-lg font-semibold text-text-headings"
              >
                Gestionar slides
              </h2>

              <div className="flex items-center gap-2">
                <Button
                  aria-label="Finalizar y crear slides"
                  onPress={handleFinalize}
                  isDisabled={submitting}
                  className="flex items-center gap-1.5 rounded-lg bg-surface-action px-4 py-1.5 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {submitting ? "Creando..." : "Finalizar"}
                  {!submitting && <Check size={16} aria-hidden="true" />}
                </Button>
                <Button
                  aria-label="Cerrar modal"
                  onPress={onClose}
                  isDisabled={submitting}
                  className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <X size={18} aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {draftError && (
            <div role="alert" className="flex items-start gap-2 rounded-lg border border-border-danger bg-surface-danger px-3 py-2.5 text-sm text-text-danger">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{draftError}</span>
            </div>
          )}

          {!isTeacher && (
            <div role="alert" className="flex items-start gap-2 rounded-lg border border-border-danger bg-surface-danger px-3 py-2.5 text-sm text-text-danger">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>Solo los profesores pueden agregar slides.</span>
            </div>
          )}

          {isTeacher && isTheory ? (
            <>
              {renderTheoryLayout()}

              {/* Slide-level errors */}
              {slideErrors.length > 0 && (
                <div role="alert" className="flex flex-col gap-1 rounded-lg border border-border-danger bg-surface-danger px-3 py-2">
                  {slideErrors.map((err, i) => (
                    <p key={i} className="text-sm text-text-danger">
                      {err}
                    </p>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <Button
                  aria-label="Cancelar"
                  onPress={onClose}
                  isDisabled={submitting}
                  className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  Cancelar
                </Button>

                <Button
                  aria-label="Guardar cambios del slide actual"
                  onPress={handleSave}
                  className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  Guardar cambios
                </Button>
              </div>
            </>
          ) : isTeacher && !isTheory ? (
            <>
              {/* Mobile: Nav panel at top */}
              <div className="md:hidden">
                <SlideNavPanel
                  slides={draftSlides}
                  activeIndex={activeIndex}
                  onSelect={selectSlide}
                  onAdd={addSlide}
                />
              </div>

              {/* Main layout: two columns on desktop */}
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {/* Left column — Form */}
                <div className="flex min-w-0 flex-1 flex-col gap-5">
                  {/* Template type dropdown */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text-headings">
                      Formato de laboratorio
                    </label>
                    <div className="relative">
                      <select
                        value={currentSlide.slideType}
                        onChange={(e) => changeSlideType(e.target.value as SlideTemplateType)}
                        className="w-full appearance-none rounded-lg bg-surface-action px-3 py-2 pr-8 text-sm font-medium text-text-on-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                        aria-label="Seleccionar tipo de plantilla"
                      >
                        {availableTemplates.map((t) => (
                          <option key={t} value={t} className="bg-surface-primary text-text-body">
                            {templateLabels[t]}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-on-action"
                      />
                    </div>
                  </div>

                  {/* Template tabs */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-text-headings">Plantillas:</span>
                    {availableTemplates.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => changeSlideType(t)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                          currentSlide.slideType === t
                            ? "border-surface-action bg-surface-action text-text-on-action"
                            : "border-border-card text-text-body hover:bg-surface-card"
                        }`}
                        aria-pressed={currentSlide.slideType === t}
                      >
                        {templateIcons[t]}
                        {templateLabels[t]}
                      </button>
                    ))}
                  </div>

                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="slide-title"
                      className="text-sm font-medium text-text-headings"
                    >
                      Título del slide
                    </label>
                    <input
                      id="slide-title"
                      type="text"
                      value={currentSlide.title}
                      onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                      placeholder="Conceptos clave del tema"
                      className="w-full rounded-lg border border-border-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
                    />
                  </div>

                  {/* Progress */}
                  <ProgressBar value={progress} label={`Progreso: ${progress}%`} />

                  {/* Dynamic fields based on template */}
                  {getFieldComponent()}

                  {/* Slide-level errors */}
                  {slideErrors.length > 0 && (
                    <div role="alert" className="flex flex-col gap-1 rounded-lg border border-border-danger bg-surface-danger px-3 py-2">
                      {slideErrors.map((err, i) => (
                        <p key={i} className="text-sm text-text-danger">
                          {err}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <Button
                      aria-label="Cancelar"
                      onPress={onClose}
                      isDisabled={submitting}
                      className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      Cancelar
                    </Button>

                    <div className="flex items-center gap-2">
                      {activeIndex > 0 && (
                        <Button
                          aria-label="Volver al slide anterior"
                          onPress={() => selectSlide(activeIndex - 1)}
                          className="rounded-lg border border-border-card px-4 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                        >
                          Atrás
                        </Button>
                      )}
                      <Button
                        aria-label="Guardar cambios del slide actual"
                        onPress={handleSave}
                        className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                      >
                        Guardar cambios
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right column — Nav panel (desktop) */}
                <div className="hidden w-28 shrink-0 md:flex md:flex-col">
                  <SlideNavPanel
                    slides={draftSlides}
                    activeIndex={activeIndex}
                    onSelect={selectSlide}
                    onAdd={addSlide}
                  />
                </div>
              </div>
            </>
          ) : null}

        </div>
      </div>

      {/* Confirmation dialog — same pattern as CreateLessonModal */}
      {showConfirm && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            aria-hidden="true"
            onClick={() => !submitting && setShowConfirm(false)}
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-description"
          >
            <div
              className="relative flex w-[min(32rem,calc(100vw-2rem))] flex-col gap-6 rounded-2xl bg-surface-primary p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="confirm-title" className="text-lg font-semibold text-text-headings">
                ¿Deseas agregar estas slides?
              </h3>
              <p id="confirm-description" className="text-sm text-text-body">
                Se crearán <strong>{draftSlides.length}</strong> slide{draftSlides.length !== 1 ? "s" : ""} en la lección.
                {draftSlides.filter((s) => !s.isValid).length > 0 && (
                  <span className="mt-1 block text-text-warning">
                    Nota: {draftSlides.filter((s) => !s.isValid).length} slide{draftSlides.filter((s) => !s.isValid).length !== 1 ? "s" : ""} no {draftSlides.filter((s) => !s.isValid).length !== 1 ? "han" : "ha"} sido validado{draftSlides.filter((s) => !s.isValid).length !== 1 ? "s" : ""}.
                  </span>
                )}
              </p>

              {draftError && (
                <p role="alert" className="text-sm text-text-danger">{draftError}</p>
              )}

              <div className="flex items-center justify-between gap-4">
                <Button
                  ref={confirmCancelRef}
                  aria-label="Cancelar creación"
                  onPress={() => setShowConfirm(false)}
                  isDisabled={submitting}
                  className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  Cancelar
                </Button>
                <Button
                  aria-label="Confirmar creación de slides"
                  onPress={handleConfirmCreate}
                  isDisabled={submitting}
                  className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {submitting ? "Creando..." : "Confirmar"}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
       </>
  );
}

export default SlideFormModal;
