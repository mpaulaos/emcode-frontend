'use client';
import React from 'react';
import { Form } from '../components/Form';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Link } from '../components/Link';

export function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <section className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-lg shadow-black/5 sm:p-10">
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              <p className="text-sm uppercase text-neutral-500">Registro</p>
              <h1 className="text-2xl font-semibold text-neutral-900">Registro</h1>
            </div>

            <Form onSubmit={(e) => e.preventDefault()} className="mt-6">
              <TextField
                label="Nombre Completo"
                type="text"
                placeholder="Nombre Apellido Apellido"
                description="Ingresá tu nombre como querés que aparezca."
              />

              <TextField
                label="Correo electrónico"
                type="email"
                placeholder="ejemplo@gmail.com"
                description="Usá un correo válido."
              />

              <TextField
                label="Contraseña"
                type="password"
                placeholder="Creá una contraseña"
                description="Debe tener al menos 8 caracteres."
              />

              <TextField
                label="Confirmar Contraseña"
                type="password"
                placeholder="Repetí tu contraseña"
                description="Debe coincidir con la contraseña anterior."
              />

              <Button type="submit" className="w-full py-3 text-base">Registrarme →</Button>

              <p className="text-center text-sm text-neutral-600">
                ¿Ya tenés una cuenta? <Link href="/login" variant="primary">Iniciar Sesión</Link>
              </p>
            </Form>
          </div>
        </section>
      </main>
    </div>
  );
}
