import { useAccessibility } from '../../../hooks/useAccessibility';
import { Button } from '../../ui/Button';

export function ResetPanel() {
  const { resetSettings } = useAccessibility();

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Restablecer Configuración</legend>
      <Button variant="primary" onPress={resetSettings} className="w-full">
        Restaurar valores predeterminados
      </Button>
    </fieldset>
  );
}
