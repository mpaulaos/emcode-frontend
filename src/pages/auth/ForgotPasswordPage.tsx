'use client';
import { useState } from 'react';
import { Form } from '../../components/ui/Form';
import { TextField } from '../../components/ui/TextField';
import { Link } from '../../components/ui/Link';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import FocusTTS from '../../components/ui/FocusTTS';
import { useForgotPassword } from '../../hooks/useForgotPassword';

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

const GENERIC_MESSAGE =
  'Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña. Revisá tu bandeja de entrada y la carpeta de spam.';

export function ForgotPasswordPage() {
  const { forgotPassword, loading, error } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await forgotPassword({ email });
    if (ok) setSent(true);
  }

  return (
    <FocusTTS><div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-310 p-lg sm:p-xl">
      <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
        <div className="flex flex-col gap-lg">
          <div className="space-y-sm">
            <h1 className="font-heading text-3xl font-bold text-text-headings">
              Recuperar contraseña
            </h1>
            <p className="font-body text-text-body">
              Ingresá el correo con el que te registraste y te enviamos un enlace para crear una nueva contraseña.
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col gap-lg">
              <Alert>{GENERIC_MESSAGE}</Alert>
              <Link href="/login" variant="primary">Volver al inicio de sesión</Link>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <TextField
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                placeholder="ejemplo@gmail.com"
                description="Ingresá el correo que registraste en la plataforma"
                value={email}
                onChange={setEmail}
                isRequired
                validate={validateEmail}
              />

              {error && <Alert>{error}</Alert>}

              <Button
                type="submit"
                className="w-full bg-primary-700"
                isPending={loading}
                isDisabled={loading}
              >
                Enviar enlace
              </Button>

              <p className="text-center font-body text-text-body">
                ¿Recordaste tu contraseña? <Link href="/login" variant="primary">Iniciar sesión</Link>
              </p>
            </Form>
          )}
        </div>
      </section>
    </div></FocusTTS>
  );
}
