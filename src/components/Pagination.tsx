interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);

  return (
    <nav
      aria-label="Paginación de estudiantes"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        Anterior
      </button>

      <div className="flex items-center gap-2 text-sm text-text-body">
        <label htmlFor="page-select" className="sr-only">
          Página actual
        </label>
        <select
          id="page-select"
          value={page}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="rounded-lg border border-border-card bg-surface-page px-2 py-1.5 text-sm text-text-body focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((p) => (
            <option key={p} value={p}>
              {String(p).padStart(2, "0")}
            </option>
          ))}
        </select>
        <span>De {safeTotalPages}</span>
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= safeTotalPages}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        Siguiente
      </button>
    </nav>
  );
}

export default Pagination;
