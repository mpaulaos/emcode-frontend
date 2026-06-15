import { useEffect, useRef, useState } from "react";
import { Users, Package, Activity, GitBranch } from "lucide-react";

const stats = [
  { label: "Usuarios registrados", value: 1500, icon: Users, suffix: "+" },
  { label: "Funcionalidades desarrolladas", value: 48, icon: Package, suffix: "" },
  { label: "Tiempo de actividad", value: 99.9, icon: Activity, suffix: "%" },
  { label: "Versiones publicadas", value: 12, icon: GitBranch, suffix: "" },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({
  label,
  value,
  icon: Icon,
  suffix,
  isVisible,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  suffix: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, isVisible);

  return (
    <div className="flex flex-col items-center rounded-xl border border-border-card bg-surface-primary p-8">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700/10 text-primary-700">
        <Icon size={24} aria-hidden="true" />
      </div>
      <span className="text-3xl font-bold text-text-headings" aria-live="polite">
        {count}
        {suffix}
      </span>
      <span className="mt-1 text-sm text-text-body">{label}</span>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Estadísticas del proyecto" ref={ref}>
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Estadísticas del Proyecto
      </h2>
      <p className="mt-4 text-base text-text-body text-center max-w-2xl mx-auto">
        El impacto de Emcode en números.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
