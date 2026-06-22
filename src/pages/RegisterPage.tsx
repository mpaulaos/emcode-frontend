'use client';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Link } from '../components/Link';
import { Alert } from '../components/Alert';
import { useRegister } from '../hooks/useRegister';

interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  validationError: string | null;
}

type RegisterField = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';

type RegisterAction =
  | { type: 'SET_FIELD'; field: RegisterField; value: string }
  | { type: 'SET_VALIDATION_ERROR'; error: string | null };

function registerReducer(state: RegisterState, action: RegisterAction): RegisterState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_VALIDATION_ERROR':
      return { ...state, validationError: action.error };
  }
}

const initialState: RegisterState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  validationError: null,
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error } = useRegister();
  const [state, dispatch] = useReducer(registerReducer, initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'SET_VALIDATION_ERROR', error: null });

    if (state.password !== state.confirmPassword) {
      dispatch({ type: 'SET_VALIDATION_ERROR', error: 'Las contraseñas no coinciden' });
      return;
    }

    const success = await register({ firstName: state.firstName, lastName: state.lastName, email: state.email, password: state.password });
    if (success) {
      navigate('/login');
    }
  };

  const displayError = state.validationError ?? error;

  return (
    <div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-[1240px] p-lg sm:p-xl">
      <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
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
              value={state.firstName}
              onChange={(v) => dispatch({ type: 'SET_FIELD', field: 'firstName', value: v })}
              isRequired
            />

            <TextField
              label="Apellido"
              type="text"
              autoComplete="family-name"
              placeholder="Apellido"
              description="Ingresá tu apellido como querés que aparezca."
              value={state.lastName}
              onChange={(v) => dispatch({ type: 'SET_FIELD', field: 'lastName', value: v })}
              isRequired
            />

            <TextField
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="ejemplo@gmail.com"
              description="Usá un correo válido."
              value={state.email}
              onChange={(v) => dispatch({ type: 'SET_FIELD', field: 'email', value: v })}
              isRequired
            />

            <TextField
              label="Contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Creá una contraseña"
              description="Debe tener al menos 8 caracteres."
              value={state.password}
              onChange={(v) => dispatch({ type: 'SET_FIELD', field: 'password', value: v })}
              isRequired
            />

            <TextField
              label="Confirmar Contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Repetí tu contraseña"
              description="Debe coincidir con la contraseña anterior."
              value={state.confirmPassword}
              onChange={(v) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: v })}
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
