import { useAccessibility } from '../../../hooks/useAccessibility';

export function MultimediaPanel() {
  const { settings, updateSetting } = useAccessibility();

  const toggles = [
    {
      key: 'pauseAnimations' as const,
      label: 'Pausar animaciones automáticas',
      checked: settings.pauseAnimations,
    },
    {
      key: 'pauseCarousels' as const,
      label: 'Pausar carruseles',
      checked: settings.pauseCarousels,
    },
    {
      key: 'stopFlashing' as const,
      label: 'Detener elementos parpadeantes',
      checked: settings.stopFlashing,
    },
  ];

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Multimedia</legend>
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
