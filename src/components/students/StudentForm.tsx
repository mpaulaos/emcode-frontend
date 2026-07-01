import StudentAvatar from "./StudentAvatar";
import DisabilityTagInput from "../disabilities/DisabilityTagInput";
import type { DisabilityTagOption } from "../disabilities/DisabilityTagInput";

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  email: string;
  disabilityIds: number[];
}

interface StudentFormProps {
  mode: "create" | "edit";
  values: StudentFormValues;
  onChange: <K extends keyof StudentFormValues>(field: K, value: StudentFormValues[K]) => void;
  disabilityOptions: DisabilityTagOption[];
  disabilitiesLoading?: boolean;
  disabilitiesError?: string | null;
  error?: string | null;
  onCancel: () => void;
  onSubmit: () => void;
  loading?: boolean;
  /** Bloque opcional de selección de curso(s), usado solo cuando el
   *  formulario se abre desde la lista general (sin curso implícito). */
  courseSelector?: React.ReactNode;
}

// Reproduce el card "Datos del estudiante" / "Información del Estudiante"
// del Figma: avatar + nombre + email arriba (vista previa en vivo de lo
// que se está escribiendo), seguido de Nombre, Apellido y Discapacidad.
function StudentForm({
  mode,
  values,
  onChange,
  disabilityOptions,
  disabilitiesLoading,
  disabilitiesError,
  error,
  onCancel,
  onSubmit,
  loading,
  courseSelector,
}: StudentFormProps) {
  const previewName = `${values.firstName || "Nombre"} ${values.lastName || "Apellido"}`.trim();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 rounded-xl bg-surface-card p-3">
        <StudentAvatar firstName={values.firstName || "?"} lastName={values.lastName || "?"} />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-text-headings">{previewName}</span>
          <span className="truncate text-xs text-text-disabled">
            {values.email || "correo@ucr.ac.cr"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="student-first-name" className="text-sm font-medium text-text-headings">
            Nombre completo
          </label>
          <input
            id="student-first-name"
            type="text"
            placeholder="Nombre"
            value={values.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="rounded-lg border border-border-card bg-surface-page px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="student-last-name" className="text-sm font-medium text-text-headings">
            Apellido
          </label>
          <input
            id="student-last-name"
            type="text"
            placeholder="Apellido"
            value={values.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="rounded-lg border border-border-card bg-surface-page px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="student-email" className="text-sm font-medium text-text-headings">
          Correo electrónico
        </label>
        <input
          id="student-email"
          type="email"
          placeholder="correo@ucr.ac.cr"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="rounded-lg border border-border-card bg-surface-page px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
        />
      </div>

      {courseSelector}

      {disabilitiesLoading && (
        <p className="text-sm text-text-body">Cargando opciones de discapacidad...</p>
      )}
      {disabilitiesError && <p className="text-sm text-text-danger">{disabilitiesError}</p>}
      {!disabilitiesLoading && !disabilitiesError && (
        <DisabilityTagInput
          label="Discapacidad"
          placeholder="Buscar discapacidad..."
          options={disabilityOptions}
          selected={values.disabilityIds}
          onChange={(ids) => onChange("disabilityIds", ids)}
        />
      )}

      {error && <p className="text-sm text-text-danger">{error}</p>}

      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="shrink-0 rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="shrink-0 rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {loading ? "Guardando..." : mode === "create" ? "Agregar estudiante" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

export default StudentForm;
