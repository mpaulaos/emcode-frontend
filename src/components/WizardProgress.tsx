// src/components/wizard/WizardProgress.tsx
import { Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep: 1 | 2;
}

const steps = [
  { number: 1, label: 'Información del curso' },
  { number: 2, label: 'Vista previa del curso' },
];

function WizardProgress({ currentStep }: WizardProgressProps) {

  return (
    <div className="flex flex-col gap-3">

      <nav aria-label="Progreso del formulario">
        <ol className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent   = currentStep === step.number;

            return (
              <li
                key={step.number}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex items-center"
              >
                {/* Dot */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isCurrent || isCompleted
                    ? 'bg-violet-700 text-white'
                    : 'border-2 border-gray-400 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      <span className="sr-only">Completado</span>
                    </>
                  ) : (
                    step.number
                  )}
                </div>

                {/* Label */}
                <span className={`ml-2 text-xs font-medium ${
                  isCurrent ? 'text-violet-700' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>

                {/* Línea conectora — decorativa, oculta para lectores */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={`mx-3 h-[1.5px] w-12 flex-1 transition-colors duration-300 ${
                      isCompleted ? 'bg-violet-700' : 'bg-gray-300'
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

    </div>
  );
}

export default WizardProgress;