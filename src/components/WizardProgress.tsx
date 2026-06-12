import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: 1 | 2;
}

const steps = [
  { number: 1, label: "Información del curso" },
  { number: 2, label: "Vista previa del curso" },
];

function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <nav aria-label="Progreso del formulario">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <li
              key={step.number}
              aria-current={isCurrent ? "step" : undefined}
              className="flex flex-1 items-center last:flex-none"
            >
              <div
                className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isCurrent || isCompleted
                    ? "bg-primary text-text-on-action"
                    : "border-2 border-border-disabled text-text-disabled"
                }`}
              >
                {isCompleted ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span className="sr-only">Completado</span>
                  </>
                ) : (
                  step.number
                )}
              </div>

              <span
                className={`ml-2 truncate text-xs font-medium ${
                  isCurrent ? "text-text-action" : "text-text-body"
                }`}
              >
                {step.label}
              </span>

              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`mx-2 sm:mx-3 h-[1.5px] flex-1 transition-colors duration-300 ${
                    isCompleted ? "bg-primary" : "bg-border-card"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default WizardProgress;
