import { useEffect, useState } from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';

export function ReadingMask() {
  const { settings } = useAccessibility();
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (settings.readingMode === 'off') return;
    const handleMouseMove = (e: MouseEvent) => setMouseY(e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingMode]);

  if (settings.readingMode === 'off') return null;

  const bandHeight = settings.readingMode === 'mask' ? 220 : 48;
  const top = mouseY - bandHeight / 2;
  const bottom = window.innerHeight - mouseY - bandHeight / 2;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        clipPath: `inset(${top}px 0 ${bottom}px 0)`,
        background: settings.readingMode === 'mask'
          ? 'rgba(0,0,0,0)'
          : 'rgba(0,0,0,0)',
      }}
    >
      {settings.readingMode === 'ruler' && (
        <div
          className="absolute left-0 right-0 top-1/2 border-b-2 border-primary-700"
          style={{ transform: 'translateY(-50%)' }}
        />
      )}
    </div>
  );
}
