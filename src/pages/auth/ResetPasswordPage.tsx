'use client';
import { useReducer } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form } from '../../components/ui/Form';
import { TextField } from '../../components/ui/TextField';
import { Link } from '../../components/ui/Link';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import FocusTTS from '../../components/ui/FocusTTS';
import { useAuth } from '../../context/AuthContext';
import { useResetPassword } from '../../hooks/useResetPassword';

function validatePassword(value: string) {
  if (!value) return 'La contraseña es obligatoria';
  if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
  return null;
}

function validateConfirmPassword(value: string, password: string) {
  if (!value) return 'La confirmación es obligatoria';
  if (value !== password) return 'Las contraseñas no coinciden';
  return null;
}

interface ResetState {
  newPassword: string;
  confirmPassword: string;
  validationError: string | null;
}

type ResetField = keyof Omit<ResetState, 'validationError'>;

type ResetAction =
  | { type: 'SET_FIELD'; field: ResetField; value: string }
  | { type: 'SET_VALIDATION_ERROR'; error: string | null };

const initialState: ResetState = { newPassword: '', confirmPassword: '', validationError: null };

function resetReducer(state: ResetState, action: ResetAction): ResetState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_VALIDATION_ERROR':
      return { ...state, validationError: action.error };
    default:
      return state;
  }
}

export function ResetPasswordPage() {
  const { restoreSession } = useAuth();
  const { resetPassword, loading, error } = useResetPassword();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [state, dispatch] = useReducer(resetReducer, initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.newPassword !== state.confirmPassword) {
      dispatch({ type: 'SET_VALIDATION_ERROR', error: 'Las contraseñas no coinciden' });
      return;
    }

    const session = await resetPassword({ token: token!, newPassword: state.newPassword });
    if (!session) return;

    restoreSession(session.token, session.user);
    navigate(session.user.role === 'student' ? '/student' : '/teacher', { replace: true });
  }

  if (!token) {
    return (
      <FocusTTS><div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-310 p-lg sm:p-xl">
        <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
          <div className="flex flex-col gap-lg">
            <div className="space-y-sm">
              <h1 className="font-heading text-3xl font-bold text-text-headings">
                Enlace inválido
              </h1>
            </div>
            <Alert>El enlace no contiene un código válido. Pedí uno nuevo para continuar.</Alert>
            <Link href="/forgot-password" variant="primary">Solicitar un nuevo enlace</Link>
          </div>
        </section>
      </div></FocusTTS>
    );
  }

  const displayError = state.validationError ?? error;

  return (
    <FocusTTS><div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-310 p-lg sm:p-xl">
      <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
        <div className="flex flex-col gap-lg">
          <div className="space-y-sm">
            <h1 className="font-heading text-3xl font-bold text-text-headings">
              Crear nueva contraseña
            </h1>
            <p className="font-body text-text-body">
              Elegí una contraseña nueva para tu cuenta. Al terminarla vas a quedar con la sesión iniciada.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <TextField
              label="Nueva contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Ingresa tu nueva contraseña"
              description="Debe tener al menos 8 caracteres."
              value={state.newPassword}
              onChange={(value) => dispatch({ type: 'SET_FIELD', field: 'newPassword', value })}
              isRequired
              validate={validatePassword}
            />

            <TextField
              label="Confirmar contraseña"
              type="password"
              autoComplete="new-password"
              placeholder="Repetí la nueva contraseña"
              value={state.confirmPassword}
              onChange={(value) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value })}
              isRequired
              validate={(value) => validateConfirmPassword(value, state.newPassword)}
            />

            {displayError && <Alert>{displayError}</Alert>}

            <Button
              type="submit"
              className="w-full bg-primary-700"
              isPending={loading}
              isDisabled={loading}
            >
              Guardar nueva contraseña
            </Button>

            <p className="text-center font-body text-text-body">
              <Link href="/login" variant="secondary">Volver al inicio de sesión</Link>
            </p>
          </Form>
        </div>
      </section>
    </div></FocusTTS>
  );
}
