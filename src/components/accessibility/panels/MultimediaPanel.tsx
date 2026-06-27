import { useAccessibility } from '../../../hooks/useAccessibility';

export function MultimediaPanel() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-headings">Multimedia</legend>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5">
          <input
            type="checkbox"
            checked={settings.pauseAnimations}
            onChange={() => updateSetting('pauseAnimations', !settings.pauseAnimations)}
            className="accent-primary-700"
          />
          Pausar animaciones automáticas
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5">
          <input
            type="checkbox"
            checked={settings.pauseCarousels}
            onChange={() => updateSetting('pauseCarousels', !settings.pauseCarousels)}
            className="accent-primary-700"
          />
          Pausar carruseles
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5">
          <input
            type="checkbox"
            checked={settings.stopFlashing}
            onChange={() => updateSetting('stopFlashing', !settings.stopFlashing)}
            className="accent-primary-700"
          />
          Detener elementos parpadeantes
        </label>
      </div>

      <legend className="mb-3 mt-6 text-sm font-semibold text-text-headings">
        Lectura en voz alta
      </legend>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-card px-3 py-2 text-sm text-text-body transition hover:bg-surface-action-hover-2 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700/5">
          <input
            type="checkbox"
            checked={settings.ttsEnabled}
            onChange={() => updateSetting('ttsEnabled', !settings.ttsEnabled)}
            className="accent-primary-700"
          />
          Activar lectura al navegar con Tab
        </label>

        {settings.ttsEnabled && (
          <div className="pl-2">
            <label className="flex flex-col gap-1 text-sm text-text-body">
              Velocidad: {settings.ttsRate.toFixed(1)}x
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.ttsRate}
                onChange={(e) => updateSetting('ttsRate', parseFloat(e.target.value))}
                className="w-full accent-primary-700"
              />
              <span className="flex justify-between text-xs text-text-disabled">
                <span>0.5x</span>
                <span>2x</span>
              </span>
            </label>
          </div>
        )}
      </div>
    </fieldset>
  );
}
