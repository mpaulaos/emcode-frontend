import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from 'react-aria-components';
import type { Course } from '../components/dashboardData';
import type { CourseFormState } from './modalData';
import { initialFormState } from './modalData';
import WizardProgress from './WizardProgress';
import Step1Form from './Step1Form';
import Step2Preview from './Step2Preview';

interface CreateCourseModalProps {
  onClose:() => void;
  onAddCourse: (course: Course) => void;
}

function CreateCourseModal({ onClose, onAddCourse }: CreateCourseModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formState, setFormState] = useState<CourseFormState>(initialFormState);

  function handleFormChange(next: Partial<CourseFormState>) {
    setFormState(prev => ({ ...prev, ...next }));
  }

  function handlePublish() {
    onAddCourse({
      id: 0,
      title:formState.title,
      subtitle: formState.subtitle,
      description: formState.description,
      image: formState.imagePreview ?? '',
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <Button
          onPress={onClose}
          aria-label="Cerrar sin guardar"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700"
        >
          <X size={20} aria-hidden="true" />
        </Button>

        <div className="flex flex-col gap-5 p-6 sm:p-8">

          <div className="flex flex-col gap-1 pr-8">
            <h1 id="modal-title" className="text-xl font-bold text-gray-900">
              {step === 1 ? 'Crear nuevo curso' : 'Revisar curso'}
            </h1>
            <span className="text-xs text-gray-400">Paso {step} de 2</span>
          </div>

          <WizardProgress currentStep={step} />

          {step === 1 ? (
            <Step1Form
              formState={formState}
              onFormChange={handleFormChange}
              onCancel={onClose}
              onNext={() => setStep(2)}
            />
          ) : (
            <Step2Preview
              formState={formState}
              onBack={() => setStep(1)}
              onPublish={handlePublish}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default CreateCourseModal;