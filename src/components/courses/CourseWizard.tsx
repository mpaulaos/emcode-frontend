import { useState, useRef, useEffect } from "react";
import { Button } from "react-aria-components";
import { API_URL } from "../../lib/api";

import WizardProgress from "./WizardProgress";
import Step1Form from "./StepOneForm";
import Step2Preview from "./StepTwoPreview";
import { initialFormState } from "../../types/modal";
import type { CourseFormState } from "../../types/modal";
import type { Course } from "../../types/dashboard";

interface CourseWizardProps {
  onCancel: () => void;
  onPublish: (course: Course) => void;
}

function CourseWizard({ onCancel, onPublish }: CourseWizardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CourseFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const [step1Height, setStep1Height] = useState<number | null>(null);

  useEffect(() => {
    if (step === 1 && step1Ref.current) {
      setStep1Height(step1Ref.current.offsetHeight);
    }
  }, [step]);

  function handleChange(field: keyof CourseFormState, value: string | File | null) {
    setError(null);
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const canAdvance =
    form.title.trim().length > 0 &&
    form.subtitle.trim().length > 0 &&
    form.description.trim().length > 0;

  async function handlePublish() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          subtitle: form.subtitle.trim(),
          description: form.description.trim(),
          image: form.imagePreview ?? null,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? `Error al crear el curso (HTTP ${response.status})`);
      }

      const newCourse: Course = await response.json();
      onPublish(newCourse);
    } catch (err) {
      if (err instanceof Error && err.message.includes('413')) {
        setError('La imagen es demasiado grande. Usá una imagen menor a 5MB.');
      } else {
        setError(err instanceof Error ? err.message : 'Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <WizardProgress currentStep={step} />

      <div
        ref={step === 1 ? step1Ref : undefined}
        style={step === 2 && step1Height ? { height: step1Height } : undefined}
      >
        {step === 1 && <Step1Form form={form} onChange={handleChange} />}
        {step === 2 && <Step2Preview form={form} />}
      </div>

      {error && <p className="text-sm text-text-danger">{error}</p>}

      <div className="flex flex-row flex-wrap items-center justify-between gap-3 sm:gap-4">
        <Button
          onPress={step === 1 ? onCancel : () => { setStep(1); setError(null); }}
          className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {step === 1 ? "Cancelar" : "Atrás"}
        </Button>

        {step === 1 ? (
          <Button
            isDisabled={!canAdvance}
            onPress={() => { setStep(2); setError(null); }}
            className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Siguiente
          </Button>
        ) : (
          <Button
            isDisabled={loading}
            onPress={handlePublish}
            className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            {loading ? "Publicando..." : "Publicar"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CourseWizard;