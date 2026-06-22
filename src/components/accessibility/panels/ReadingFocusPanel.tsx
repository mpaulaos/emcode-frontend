import { useAccessibility } from '../../../hooks/useAccessibility';

const options = [
  { value: 'off', label: 'Desactivado' },
  { value: 'mask', label: 'Máscara de lectura' },
  { value: 'ruler', label: 'Regla de lectura' },
] as const;

export function ReadingFocusPanel() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Enfoque de Lectura</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5"
          >
            <input
              type="radio"
              name="readingMode"
              value={opt.value}
              checked={settings.readingMode === opt.value}
              onChange={() => updateSetting('readingMode', opt.value)}
              className="accent-primary-700"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
