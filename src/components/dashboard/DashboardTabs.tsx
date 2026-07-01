import type { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface DashboardTabsProps {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: string) => void;
}

function DashboardTabs({ tabs, activeId, onSelect }: DashboardTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Navegación del curso"
      className="flex gap-2"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(tab.id)}
            className={`flex items-center gap-2 rounded-xl border-[1.5px] px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "border-primary bg-primary font-bold text-text-on-action"
                : "border-border-card bg-surface-primary text-text-body hover:border-primary/40"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default DashboardTabs;
