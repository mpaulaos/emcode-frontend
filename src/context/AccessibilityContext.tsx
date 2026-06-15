import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import type { AccessibilitySettings } from '../types/accessibility';
import { DEFAULT_SETTINGS } from '../types/accessibility';
import { AccessibilityContext } from './accessibility';

const STORAGE_KEY = 'emcode-a11y';

function loadSettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings: AccessibilitySettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* noop */
  }
}

function applyToDocument(settings: AccessibilitySettings) {
  const root = document.documentElement;

  root.setAttribute('data-text-size', settings.textSize);
  root.setAttribute('data-letter-spacing', settings.letterSpacing);
  root.setAttribute('data-word-spacing', settings.wordSpacing);
  root.setAttribute('data-line-height', settings.lineHeight);
  root.setAttribute('data-contrast', settings.contrast);
  root.setAttribute('data-color-blindness', settings.colorBlindness);
  root.setAttribute('data-reading-mode', settings.readingMode);
  root.setAttribute('data-cursor-size', settings.cursorSize);
  root.setAttribute('data-reduced-motion', settings.reducedMotion);

  for (const key of ['highlightFocus', 'strongFocusIndicators', 'enhancedKeyboardNav',
    'pauseAnimations', 'pauseCarousels', 'stopFlashing', 'simplifiedInterface',
    'hideDecorations', 'highlightHeadings', 'highlightLinks', 'highlightButtons'] as const) {
    root.toggleAttribute(`data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, settings[key]);
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);

  useEffect(() => {
    applyToDocument(settings);
    saveSettings(settings);
  }, [settings]);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetSettings = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS });
  }, []);

  const value = useMemo(
    () => ({ settings, updateSetting, resetSettings }),
    [settings, updateSetting, resetSettings],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}
