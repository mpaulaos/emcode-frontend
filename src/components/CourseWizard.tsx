import { useState } from "react";
import { Button } from "react-aria-components";
import { API_URL } from "../lib/api";

import WizardProgress from "./WizardProgress";
import Step1Form from "./StepOneForm";
import Step2Preview from "./StepTwoPreview";
import { initialFormState } from "../types/modal";
import type { CourseFormState } from "../types/modal";
import type { Course } from "../types/dashboard";

interface CourseWizardProps {
  onCancel: () => void;
  onPublish: (course: Course) => void;
}

function CourseWizard({ onCancel, onPublish }: CourseWizardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CourseFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex flex-col gap-6">
      <WizardProgress currentStep={step} />

      {step === 1 && <Step1Form form={form} onChange={handleChange} />}
      {step === 2 && <Step2Preview form={form} />}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <Button
          onPress={step === 1 ? onCancel : () => { setStep(1); setError(null); }}
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-violet-700"
        >
          {step === 1 ? "Cancelar" : "Atrás"}
        </Button>

        {step === 1 ? (
          <Button
            isDisabled={!canAdvance}
            onPress={() => { setStep(2); setError(null); }}
            className="rounded-lg bg-violet-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-violet-700"
          >
            Siguiente
          </Button>
        ) : (
          <Button
            isDisabled={loading}
            onPress={handlePublish}
            className="rounded-lg bg-violet-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-violet-700"
          >
            {loading ? "Publicando..." : "Publicar"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CourseWizard;