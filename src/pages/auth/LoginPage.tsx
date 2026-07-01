'use client';
import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Form } from '../../components/ui/Form';
import { TextField } from '../../components/ui/TextField';
import { Checkbox } from '../../components/ui/Checkbox';
import { Link } from '../../components/ui/Link';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import FocusTTS from '../../components/ui/FocusTTS';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../lib/api';

function validateEmail(value: string) {
  if (!value) return 'El correo electrónico es obligatorio';
  const atIndex = value.indexOf('@');
  if (atIndex < 1) return 'Ingresa un correo electrónico válido';
  const domain = value.slice(atIndex + 1);
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.'))
    return 'Ingresa un correo electrónico válido';
  if (/\s/.test(value)) return 'Ingresa un correo electrónico válido';
  return null;
}

function validatePassword(value: string) {
  if (!value) return 'La contraseña es obligatoria';
  if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
  return null;
}

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  access_denied: 'No autorizaste el inicio de sesión con Google. Intentá de nuevo.',
  invalid_state: 'Error de seguridad en la autenticación. Intentá de nuevo.',
  invalid_user: 'No se pudo obtener tu información de usuario. Intentá de nuevo.',
  missing_params: 'Error al iniciar sesión con Google. Intentá de nuevo.',
};

export function LoginPage() {
  const { login, loading, error: authError, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const urlError = searchParams.get('error');
  const displayError = urlError ? (OAUTH_ERROR_MESSAGES[urlError] ?? 'Error al autenticar con Google. Intentá de nuevo.') : authError;

  function getDefaultRoute() {
    if (user?.role === 'student') return '/student';
    return '/teacher';
  }

  const redirectTo = searchParams.get('redirect') || getDefaultRoute();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login({ email, password });
    if (!authError) {
      navigate(searchParams.get('redirect') || getDefaultRoute(), { replace: true });
    }
  }

  return (
    <FocusTTS><div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-310 p-lg sm:p-xl">
      <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
        <div className="flex flex-col gap-lg">
          <div className="space-y-sm">
            <h1 className="font-heading text-3xl font-bold text-text-headings">
              Inicio de sesión
            </h1>
            <p className="font-body text-text-body">
              Ingresa tus datos para continuar en la plataforma.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <TextField
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="ejemplo@gmail.com"
              description="Ingresa el correo que registraste en la plataforma"
              value={email}
              onChange={setEmail}
              isRequired
              validate={validateEmail}
            />

            <TextField
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              description="Debe tener al menos 8 caracteres."
              value={password}
              onChange={setPassword}
              isRequired
              validate={validatePassword}
            />

            {displayError && <Alert>{displayError}</Alert>}

            <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
              <Checkbox>Recordar Contraseña</Checkbox>
              <Link href="#" variant="secondary">Olvidé mi contraseña</Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-700"
              isPending={loading}
              isDisabled={loading}
            >
              Ingresar
            </Button>

            <p className="text-center font-body text-text-body">
              ¿No tienes cuenta? <Link href="/register" variant="primary">Registrarme</Link>
            </p>
          </Form>

          <div className="relative flex items-center gap-4">
            <div className="flex-1 border-t border-border-card" />
            <span className="text-sm text-text-body">o continúa con</span>
            <div className="flex-1 border-t border-border-card" />
          </div>

          <a
            href={`${API_URL}/api/auth/google`}
            className="flex items-center justify-center gap-2.5 w-full rounded-lg border border-border-card px-4 py-2.5 text-sm font-medium text-text-body hover:bg-surface-action-hover-2 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Iniciar sesión con Google
          </a>
        </div>
      </section>
    </div></FocusTTS>
  );
}
