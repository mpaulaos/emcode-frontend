import { AccessibilityPanel } from './AccessibilityPanel';

interface AccessibilityWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityWidget({ isOpen, onClose }: AccessibilityWidgetProps) {
  return <AccessibilityPanel isOpen={isOpen} onClose={onClose} />;
}
