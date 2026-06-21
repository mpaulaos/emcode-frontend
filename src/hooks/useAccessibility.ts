import { use } from 'react';
import { AccessibilityContext } from '../context/accessibility';

export function useAccessibility() {
  const ctx = use(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility debe usarse dentro de un AccessibilityProvider');
  }
  return ctx;
}
