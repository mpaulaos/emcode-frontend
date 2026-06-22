import { useAccessibility } from '../../../hooks/useAccessibility';

const options = [
  { value: 'none', label: 'Sin filtro' },
  { value: 'protanopia', label: 'Protanopia (rojo)' },
  { value: 'deuteranopia', label: 'Deuteranopia (verde)' },
  { value: 'tritanopia', label: 'Tritanopia (azul)' },
  { value: 'achromatopsia', label: 'Acromatopsia (grises)' },
] as const;

export function ColorBlindnessPanel() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Daltonismo</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5"
          >
            <input
              type="radio"
              name="colorBlindness"
              value={opt.value}
              checked={settings.colorBlindness === opt.value}
              onChange={() => updateSetting('colorBlindness', opt.value)}
              className="accent-primary-700"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
