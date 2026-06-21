export interface AccessibilitySettings {
  textSize: 'normal' | 'reduced' | 'increased' | 'extra-large';
  letterSpacing: 'normal' | 'wide' | 'wider';
  wordSpacing: 'normal' | 'wide' | 'wider';
  lineHeight: 'normal' | 'relaxed' | 'extra-relaxed';
  contrast: 'normal' | 'high' | 'inverted';
  colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
  readingMode: 'off' | 'mask' | 'ruler' | 'focus';
  cursorSize: 'normal' | 'large' | 'extra-large';
  highlightFocus: boolean;
  strongFocusIndicators: boolean;
  enhancedKeyboardNav: boolean;
  reducedMotion: 'off' | 'reduce' | 'off-all';
  pauseAnimations: boolean;
  pauseCarousels: boolean;
  stopFlashing: boolean;
  simplifiedInterface: boolean;
  hideDecorations: boolean;
  highlightHeadings: boolean;
  highlightLinks: boolean;
  highlightButtons: boolean;
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 'normal',
  letterSpacing: 'normal',
  wordSpacing: 'normal',
  lineHeight: 'normal',
  contrast: 'normal',
  colorBlindness: 'none',
  readingMode: 'off',
  cursorSize: 'normal',
  highlightFocus: false,
  strongFocusIndicators: false,
  enhancedKeyboardNav: false,
  reducedMotion: 'off',
  pauseAnimations: false,
  pauseCarousels: false,
  stopFlashing: false,
  simplifiedInterface: false,
  hideDecorations: false,
  highlightHeadings: false,
  highlightLinks: false,
  highlightButtons: false,
};
