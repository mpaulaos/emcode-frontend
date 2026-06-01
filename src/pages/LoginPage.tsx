'use client';
import { Form } from '../components/Form';
import { TextField } from '../components/TextField';
import { Checkbox } from '../components/Checkbox';
import { Link } from '../components/Link';
import { Button } from '../components/Button';

export function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <section className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-lg shadow-black/5 sm:p-10">
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              <p className="text-sm uppercase text-neutral-500">Inicio de sesión</p>
              <h1 className="text-3xl font-semibold text-neutral-900">Accede a tu cuenta</h1>
              <p className="max-w-xl text-sm text-neutral-600">Ingresa tus datos para continuar en la plataforma.</p>
            </div>

            <Form onSubmit={(event) => event.preventDefault()} className="mt-6">
              <TextField
                label="Correo electrónico"
                type="email"
                placeholder="ejemplo@gmail.com"
                description="Ingresa el correo que registraste en la plataforma"
              />

              <TextField
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                description="Debe tener al menos 8 caracteres."
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Checkbox labelClassName="text-black">Recordar Contraseña</Checkbox>
                <Link href="#" variant="secondary" className="text-sm">Olvidé mi contraseña</Link>
              </div>

              <Button type="submit" className="w-full py-3 text-base">Ingresar →</Button>

              <p className="text-center text-sm text-neutral-600">
                ¿No tienes cuenta? <Link href="/register" variant="primary">Registrarme</Link>
              </p>
            </Form>
          </div>
        </section>
      </main>
    </div>
  );
}
