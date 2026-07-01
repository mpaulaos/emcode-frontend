import { useNavigate } from 'react-router-dom';
import { Button } from 'react-aria-components';
import { Plus } from 'lucide-react';

function EnrollCourseCard() {
  const navigate = useNavigate();

  return (
    <Button
      onPress={() => navigate('/cursos/inscribir')}
      className="flex h-full min-h-[12rem] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border-card bg-surface-primary p-6 transition hover:border-primary-500 hover:bg-surface-action-hover-2 focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
    >
      <span
        className="flex size-12 items-center justify-center rounded-full bg-primary-700 text-white"
        aria-hidden="true"
      >
        <Plus size={24} />
      </span>
      <div className="flex flex-col items-center gap-1">
        <span className="text-base font-bold text-text-headings">
          Inscribir curso
        </span>
        <span className="text-sm text-text-body">
          Aún no estás matriculado en ningún curso
        </span>
      </div>
    </Button>
  );
}

export default EnrollCourseCard;
