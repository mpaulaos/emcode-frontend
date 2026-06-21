import { createContext } from 'react';
import type { AccessibilitySettings } from '../types/accessibility';

export interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  resetSettings: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);
