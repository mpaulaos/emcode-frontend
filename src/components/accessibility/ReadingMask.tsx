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
  const bandTop = Math.max(0, mouseY - bandHeight / 2);
  const bandBottom = Math.max(0, window.innerHeight - mouseY - bandHeight / 2);
  const opacity = settings.readingMode === 'mask' ? 0.55 : 0.3;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 right-0 z-[9999] pointer-events-none"
        style={{
          top: 0,
          height: `${bandTop}px`,
          background: `rgba(0, 0, 0, ${opacity})`,
        }}
      />

      {settings.readingMode === 'ruler' && (
        <div
          aria-hidden="true"
          className="fixed left-0 right-0 z-[9999] pointer-events-none"
          style={{
            top: `${bandTop}px`,
            height: `${bandHeight}px`,
          }}
        >
          <div className="absolute left-0 right-0 bottom-0 border-b-2 border-primary-700" />
        </div>
      )}

      <div
        aria-hidden="true"
        className="fixed left-0 right-0 z-[9999] pointer-events-none"
        style={{
          bottom: 0,
          height: `${bandBottom}px`,
          background: `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </>
  );
}
