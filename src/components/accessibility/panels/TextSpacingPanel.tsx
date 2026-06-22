import { useAccessibility } from '../../../hooks/useAccessibility';

const letterOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Amplio' },
  { value: 'wider', label: 'Muy amplio' },
] as const;

const wordOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Amplio' },
  { value: 'wider', label: 'Muy amplio' },
] as const;

const lineOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'relaxed', label: 'Relajado' },
  { value: 'extra-relaxed', label: 'Muy relajado' },
] as const;

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-text-body">{label}</p>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border-card px-2.5 py-1.5 text-xs text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-primary-700"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function TextSpacingPanel() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Espaciado de Texto</legend>
      <div className="space-y-3">
        <RadioGroup
          label="Espaciado entre letras"
          name="letterSpacing"
          options={letterOptions}
          value={settings.letterSpacing}
          onChange={(v) => updateSetting('letterSpacing', v as 'normal' | 'wide' | 'wider')}
        />
        <RadioGroup
          label="Espaciado entre palabras"
          name="wordSpacing"
          options={wordOptions}
          value={settings.wordSpacing}
          onChange={(v) => updateSetting('wordSpacing', v as 'normal' | 'wide' | 'wider')}
        />
        <RadioGroup
          label="Altura de línea"
          name="lineHeight"
          options={lineOptions}
          value={settings.lineHeight}
          onChange={(v) => updateSetting('lineHeight', v as 'normal' | 'relaxed' | 'extra-relaxed')}
        />
      </div>
    </fieldset>
  );
}
