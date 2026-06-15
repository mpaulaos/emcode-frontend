import { useAccessibility } from '../../../hooks/useAccessibility';

const options = [
  { value: 'reduced', label: 'Reducir texto' },
  { value: 'normal', label: 'Tamaño normal' },
  { value: 'increased', label: 'Aumentar texto' },
  { value: 'extra-large', label: 'Texto extra grande' },
] as const;

export function TextSizePanel() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Tamaño de Texto</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5"
          >
            <input
              type="radio"
              name="textSize"
              value={opt.value}
              checked={settings.textSize === opt.value}
              onChange={() => updateSetting('textSize', opt.value)}
              className="accent-primary-700"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
