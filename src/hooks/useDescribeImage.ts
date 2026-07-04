import { useState, useCallback } from "react";
import { apiFetch } from "../lib/api";

const MAX_SIZE_BYTES = 4 * 1024 * 1024;

function stripBase64Prefix(base64: string): string {
  const commaIndex = base64.indexOf(",");
  return commaIndex !== -1 ? base64.slice(commaIndex + 1) : base64;
}

export function useDescribeImage() {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const describeImage = useCallback(async (base64Image: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const rawBytes = Math.ceil((base64Image.length * 3) / 4);
      if (rawBytes > MAX_SIZE_BYTES) {
        throw new Error("La imagen supera los 4MB permitidos.");
      }

      const cleanBase64 = stripBase64Prefix(base64Image);

      const res = await apiFetch(
        `${import.meta.env.VITE_API_URL}/api/chat/describe-image`,
        {
          method: "POST",
          body: JSON.stringify({ image: cleanBase64 }),
        },
      );

      if (res.status === 401) {
        throw new Error("Token no proporcionado. Iniciá sesión nuevamente.");
      }

      if (res.status === 400) {
        const body = await res.json();
        const msg = body.errors?.[0]?.message ?? body.message ?? "Formato inválido";
        throw new Error(msg);
      }

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Backend error:", res.status, body);
        throw new Error(
          body?.error ?? body?.message ?? "No se pudo procesar la imagen. Intentá de nuevo.",
        );
      }

      const data = await res.json();
      setDescription(data.description);
      return data.description as string;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearDescription = useCallback(() => {
    setDescription(null);
    setError(null);
  }, []);

  return { description, isLoading, error, describeImage, clearDescription };
}
