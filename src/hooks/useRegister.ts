import { useCallback, useState } from "react";
import type { RegisterData } from "../types/auth";
import { API_URL } from "../lib/api";

interface UseRegisterResult {
    register: (data: RegisterData) => Promise<boolean>;
    loading: boolean;
    error: string | null;
}

export function useRegister(): UseRegisterResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = useCallback(async (registerData: RegisterData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            });
            if (!response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(
                    body?.message ?? `Error al registrarse (HTTP ${response.status})`
                );
            }

            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { register, loading, error };
}