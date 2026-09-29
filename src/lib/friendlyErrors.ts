/**
 * Centraliza los mensajes de error que ve el usuario.
 *
 * Objetivo: nunca mostrar texto técnico crudo como
 * "Failed to fetch", "HTTP 500", "Unexpected token..." o
 * mensajes del backend en inglés. Siempre devolver un
 * mensaje claro en español.
 *
 * El detalle técnico se conserva en `console.error` para
 * depuración, pero no se muestra en la UI.
 */

const TECHNICAL_HINTS = [
  "failed to fetch",
  "fetch",
  "network",
  "load failed",
  "http",
  "status",
  "typeerror",
  "unexpected token",
  "json",
  "error fetching",
  "error en la solicitud",
  "an unexpected error",
  "error inesperado al crear slides",
];

function looksTechnical(message: string): boolean {
  const lower = message.toLowerCase();
  if (lower.length === 0) return true;
  // Mensajes muy largos suelen ser volcados técnicos / validaciones sin formato.
  if (message.length > 160) return true;
  // Fragmentos HTML o trazas nunca son mensajes para el usuario.
  if (/<[^>]+>/.test(message)) return true;
  if (/at\s+\S+\s*\(.*:\d+:\d+\)/.test(message)) return true;
  return TECHNICAL_HINTS.some((hint) => lower.includes(hint));
}

/**
 * Decide qué mostrar al usuario a partir de un mensaje que
 * puede venir del backend. Si el mensaje parece redactado
 * para el usuario (ej. "Correo ya registrado"), se conserva.
 * Si parece técnico, se reemplaza por `fallback`.
 */
export function sanitizeBackendMessage(message: unknown, fallback: string): string {
  if (typeof message !== "string") return fallback;
  const trimmed = message.trim();
  if (!trimmed) return fallback;
  if (looksTechnical(trimmed)) return fallback;
  return trimmed;
}

/**
 * Mensaje genérico según el código HTTP, sin exponer el código.
 */
export function getMessageForStatus(status: number | null, fallback: string): string {
  if (status === null || status === 0) {
    return "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
  }
  if (status === 401) return "Tu sesión expiró. Inicia sesión nuevamente.";
  if (status === 403) return "No tienes permiso para realizar esta acción.";
  if (status === 404) return "No encontramos lo que buscabas.";
  if (status === 409) return fallback;
  if (status === 413) return "El archivo es demasiado grande. Usa un archivo más pequeño.";
  if (status === 422) return "Revisa los datos ingresados e inténtalo de nuevo.";
  if (status === 429) return "Hiciste demasiados intentos. Espera un momento e inténtalo de nuevo.";
  if (status >= 500) return "Ocurrió un problema en el servidor. Inténtalo más tarde.";
  if (status >= 400) return fallback;
  return fallback;
}

/**
 * Construye el Error amigable a partir del body + status de una
 * respuesta no-ok. Preserva `body.message` / `body.errors[0].message`
 * solo cuando parecen mensajes para el usuario.
 */
export function getApiErrorMessage(
  body: { message?: unknown; error?: unknown; errors?: Array<{ message?: unknown }> } | null,
  status: number,
  fallback: string,
): string {
  const firstValidationError = body?.errors?.[0]?.message;
  if (firstValidationError !== undefined) {
    const sanitized = sanitizeBackendMessage(firstValidationError, "");
    if (sanitized) return sanitized;
    return getMessageForStatus(status, fallback);
  }
  const raw = body?.message ?? body?.error;
  if (raw !== undefined && raw !== null) {
    const sanitized = sanitizeBackendMessage(raw, "");
    if (sanitized) return sanitized;
  }
  return getMessageForStatus(status, fallback);
}

/**
 * Convierte cualquier error lanzado (red, parseo, HTTP con código
 * en el texto, backend técnico) en un mensaje claro en español.
 * Usar en todos los `catch` que alimentan un `<Alert>` / `role="alert"`.
 */
export function getFriendlyErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof DOMException && err.name === "AbortError") return fallback;

  if (err instanceof TypeError) {
    return "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
  }

  if (err instanceof SyntaxError) {
    return "Recibimos una respuesta inválida del servidor. Inténtalo más tarde.";
  }

  if (err instanceof Error) {
    const message = err.message ?? "";
    const lower = message.toLowerCase();

    if (
      lower.includes("failed to fetch") ||
      lower.includes("networkerror") ||
      lower.includes("load failed") ||
      lower.includes("network request failed")
    ) {
      return "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
    }

    const statusMatch = message.match(/\b(\d{3})\b/);
    if (statusMatch && /http|status|error/i.test(message)) {
      const status = Number(statusMatch[1]);
      if (Number.isInteger(status) && status >= 400 && status < 600) {
        return getMessageForStatus(status, fallback);
      }
    }

    return sanitizeBackendMessage(message, fallback);
  }

  return fallback;
}
