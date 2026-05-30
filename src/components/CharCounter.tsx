// src/components/wizard/CharCounter.tsx

interface CharCounterProps {
  current: number;
  limit:   number;
}

export function CharCounter({ current, limit }: CharCounterProps) {

  const nearLimit = current >= limit * 0.9;
  
  return (
    <p
      aria-live="polite"
      className={`text-right text-xs ${nearLimit ? 'text-red-500' : 'text-gray-400'}`}
    >
      {current} / {limit}
    </p>
  );
}