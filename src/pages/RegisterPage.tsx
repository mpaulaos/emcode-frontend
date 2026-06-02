'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Link } from '../components/Link';
import { Alert } from '../components/Alert';
import { useRegister } from '../hooks/useRegister';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error } = useRegister();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    const success = await register({ firstName, lastName, email, password });
    if (success) {
      navigate('/login');
    }
  };

  const displayError = validationError ?? error;

  return (
    <div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-[1240px] p-lg sm:p-xl">
      <section className="rounded-xxl border border-neutral-400 bg-surface-card p-xl sm:p-2xl">
        <div className="flex flex-col gap-lg">
          <div className="space-y-sm">
            <h1 className="font-heading text-3xl font-bold text-text-headings">Registro</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              type="text"
              autoComplete="name"
              placeholder="Nombre"
              description="Ingresá tu nombre como querés que aparezca."
              value={firstName}
              onChange={setFirstName}
              isRequired
            />

            <TextField
              label="Apellido"
              type="text"
              autoComplete="family-name"
              placeholder="Apellido"
              description="Ingresá tu apellido como querés que aparezca."
              value={lastName}
              onChange={setLastName}
              isRequired
            />

            <TextField
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="ejemplo@gmail.com"
              description="Usá un correo válido."
              value={email}
              onChange={setEmail}
              isRequired
            />

            <TextField
              label="Contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Creá una contraseña"
              description="Debe tener al menos 8 caracteres."
              value={password}
              onChange={setPassword}
              isRequired
            />

            <TextField
              label="Confirmar Contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Repetí tu contraseña"
              description="Debe coincidir con la contraseña anterior."
              value={confirmPassword}
              onChange={setConfirmPassword}
              isRequired
            />

            {displayError && <Alert>{displayError}</Alert>}

            <Button
              type="submit"
              className="w-full bg-primary-700"
              isPending={loading}
              isDisabled={loading}
            >
              Registrarme
            </Button>

            <p className="text-center font-body text-text-body">
              ¿Ya tenés una cuenta? <Link href="/login" variant="primary">Iniciar Sesión</Link>
            </p>
          </Form>
        </div>
      </section>
    </div>
  );
}
