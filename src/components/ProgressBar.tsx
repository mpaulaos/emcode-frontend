interface ProgressBarProps {
  value: number;
  label?: string;
}

function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-2" role="group" aria-label={label ?? `Progreso: ${clamped}%`}>
      <span className="w-9 shrink-0 text-xs font-medium text-text-body">{clamped}%</span>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-card"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
