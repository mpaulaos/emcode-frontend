'use client';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { TextField } from '../components/TextField';
import { Checkbox } from '../components/Checkbox';
import { Link } from '../components/Link';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
  const { login, loading, error, isAuthenticated } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/teacher" replace />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login({ email, password });
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-[1240px] p-lg sm:p-xl">
      <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card p-xl sm:p-2xl">
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
            />

            {error && <Alert>{error}</Alert>}

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
        </div>
      </section>
    </div>
  );
}
