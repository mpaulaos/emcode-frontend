import { useAccessibility } from '../../../hooks/useAccessibility';

export function KeyboardNavPanel() {
  const { settings, updateSetting } = useAccessibility();

  const toggles = [
    {
      key: 'highlightFocus' as const,
      label: 'Resaltar elementos enfocados',
      checked: settings.highlightFocus,
    },
    {
      key: 'strongFocusIndicators' as const,
      label: 'Indicadores de foco reforzados',
      checked: settings.strongFocusIndicators,
    },
    {
      key: 'enhancedKeyboardNav' as const,
      label: 'Navegación mejorada',
      checked: settings.enhancedKeyboardNav,
    },
  ];

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Navegación por Teclado</legend>
      <div className="space-y-2">
        {toggles.map((t) => (
          <label
            key={t.key}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5"
          >
            <input
              type="checkbox"
              checked={t.checked}
              onChange={() => updateSetting(t.key, !t.checked)}
              className="accent-primary-700"
            />
            {t.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
