import { useState } from "react";
import { Button } from "react-aria-components";

import WizardProgress from "./WizardProgress";
import Step1Form from "./StepOneForm";
import Step2Preview from "./StepTwoPreview";
import { initialFormState } from "../types/modal";
import type { CourseFormState } from "../types/modal";
import type { Course } from "./dashboardData";

interface CourseWizardProps {
  onCancel: () => void;
  onPublish: (course: Course) => void;
}

function CourseWizard({ onCancel, onPublish }: CourseWizardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CourseFormState>(initialFormState);

  function handleChange(
    field: keyof CourseFormState,
    value: string | File | null,
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const canAdvance =
    form.title.trim().length > 0 &&
    form.subtitle.trim().length > 0 &&
    form.description.trim().length > 0;

  function handlePublish() {
    const newCourse: Course = {
      id: Date.now(), //CAMBIAR DESPUÉS por ID real del backend
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      image: form.imagePreview ?? "",
    };
    onPublish(newCourse);
  }

  return (
    <div className="flex flex-col gap-6">
      <WizardProgress currentStep={step} />

      {step === 1 && <Step1Form form={form} onChange={handleChange} />}

      {step === 2 && <Step2Preview form={form} />}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onPress={step === 1 ? onCancel : () => setStep(1)}
          className="
            rounded-lg border border-gray-300 px-5 py-2
            text-sm font-medium text-gray-700
            transition hover:bg-gray-50
            focus-visible:ring-2 focus-visible:ring-violet-700
          "
        >
          {step === 1 ? "Cancelar" : "Atrás"}
        </Button>

        {step === 1 ? (
          <Button
            isDisabled={!canAdvance}
            onPress={() => setStep(2)}
            className="
              rounded-lg bg-violet-700 px-5 py-2
              text-sm font-semibold text-white
              transition hover:bg-violet-800
              disabled:cursor-not-allowed disabled:opacity-40
              focus-visible:ring-2 focus-visible:ring-violet-700
            "
          >
            Siguiente
          </Button>
        ) : (
          <Button
            onPress={handlePublish}
            className="
              rounded-lg bg-violet-700 px-5 py-2
              text-sm font-semibold text-white
              transition hover:bg-violet-800
              focus-visible:ring-2 focus-visible:ring-violet-700
            "
          >
            Publicar
          </Button>
        )}
      </div>
    </div>
  );
}

export default CourseWizard;
