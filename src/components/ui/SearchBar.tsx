import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
}

function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
  "aria-label": ariaLabel = "Buscar",
}: SearchBarProps) {
  return (
    <div className="relative w-full min-w-0 sm:flex-1">
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full rounded-lg border border-border-card bg-white py-2 pl-10 pr-4 text-sm text-text-body placeholder:text-text-disabled focus:border-border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      />
    </div>
  );
}

export default SearchBar;