import { useAccessibility } from '../../../hooks/useAccessibility';

export function CognitivePanel() {
  const { settings, updateSetting } = useAccessibility();

  const toggles = [
    {
      key: 'simplifiedInterface' as const,
      label: 'Simplificar interfaz',
      checked: settings.simplifiedInterface,
    },
    {
      key: 'hideDecorations' as const,
      label: 'Ocultar elementos decorativos',
      checked: settings.hideDecorations,
    },
    {
      key: 'highlightHeadings' as const,
      label: 'Resaltar encabezados',
      checked: settings.highlightHeadings,
    },
    {
      key: 'highlightLinks' as const,
      label: 'Resaltar enlaces',
      checked: settings.highlightLinks,
    },
    {
      key: 'highlightButtons' as const,
      label: 'Resaltar botones',
      checked: settings.highlightButtons,
    },
  ];

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Accesibilidad Cognitiva</legend>
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
