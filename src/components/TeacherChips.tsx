import { useNavigate } from 'react-router-dom';
import { Button } from 'react-aria-components';
import { BookOpen, Accessibility } from 'lucide-react';

const chips = [
  {
    label: 'Adaptación de material',
    icon: BookOpen,
    path: '/guides',
    ariaLabel: 'Ir a la sección de guías para docentes',
  },
  {
    label: 'Tipos de discapacidades',
    icon: Accessibility,
    path: '/disabilities',
    ariaLabel: 'Ir a la sección de tipos de discapacidades',
  },
];

function TeacherNavChips() {
  const navigate = useNavigate();

  return (
    <section aria-label="Accesos rápidos" className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-gray-900">
        Recursos
      </h2>
      <div className="flex flex-wrap gap-2">
        {chips.map(({ label, icon: Icon, path, ariaLabel }) => (
          <Button
            key={path}
            onPress={() => navigate(path)}
            aria-label={ariaLabel}
            className="flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 transition hover:bg-violet-100
             hover:border-violet-400 pressed:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
}
export default TeacherNavChips;