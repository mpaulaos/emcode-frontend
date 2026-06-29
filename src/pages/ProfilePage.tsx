'use client';
import { useState } from 'react';
import { Form } from '../components/Form';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { useAuth } from '../context/AuthContext';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useChangePassword } from '../hooks/useChangePassword';
import FocusTTS from '../components/FocusTTS';

export function ProfilePage() {
  const { user, token, updateUser } = useAuth();
  const { updateProfile, loading: profileLoading, error: profileError } = useUpdateProfile(token);
  const { changePassword, loading: pwLoading, error: pwError, success: pwSuccess, setSuccess: setPwSuccess } = useChangePassword(token);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture ?? '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [profileSaved, setProfileSaved] = useState(false);
  const [pwValidationError, setPwValidationError] = useState<string | null>(null);

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfileSaved(false);

    const result = await updateProfile({
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: phone || null,
      profilePicture: profilePicture || null,
    });

    if (result) {
      updateUser(result.user, result.token);
      setProfileSaved(true);
    }
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPwSuccess(false);
    setPwValidationError(null);

    if (newPassword !== confirmNewPassword) {
      setPwValidationError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setPwValidationError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    const ok = await changePassword(currentPassword, newPassword);
    if (ok) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  }

  return (
    <FocusTTS>
      <div className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-310 p-lg sm:p-xl">
        <div className="flex flex-col gap-10">
          <h1 className="font-heading text-3xl font-bold text-text-headings">Mi Perfil</h1>

          {user?.profilePicture && (
            <div className="flex justify-center">
              <img
                src={user.profilePicture}
                alt="Foto de perfil"
                className="h-24 w-24 rounded-full object-cover border-2 border-border-card"
              />
            </div>
          )}

          <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
            <h2 className="font-heading text-xl font-semibold text-text-headings mb-6">
              Editar perfil
            </h2>

            <Form onSubmit={handleProfileSubmit}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <TextField
                  label="Nombre"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Tu nombre"
                  value={firstName}
                  onChange={setFirstName}
                  className="flex-1"
                />
                <TextField
                  label="Apellido"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Tu apellido"
                  value={lastName}
                  onChange={setLastName}
                  className="flex-1"
                />
              </div>

              <TextField
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                value={user?.email ?? ''}
                isDisabled
              />

              <TextField
                label="Teléfono"
                type="tel"
                autoComplete="tel"
                placeholder="+506 8888 8888"
                value={phone}
                onChange={setPhone}
                description="Opcional. Ej: +506 8888 8888"
              />

              <TextField
                label="Foto de perfil (URL)"
                type="url"
                autoComplete="url"
                placeholder="https://ejemplo.com/foto.jpg"
                value={profilePicture}
                onChange={setProfilePicture}
                description="Opcional. URL de una imagen para tu perfil"
              />

              {profileError && <Alert>{profileError}</Alert>}
              {profileSaved && (
                <div className="flex items-start gap-2 rounded-lg border border-border-success bg-surface-success px-3 py-2.5 text-sm text-text-success">
                  <span>Perfil actualizado correctamente</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full sm:w-auto"
                isPending={profileLoading}
                isDisabled={profileLoading}
              >
                Guardar cambios
              </Button>
            </Form>
          </section>

          <section className="sm:rounded-xxl sm:border sm:border-border-card sm:bg-surface-card sm:p-2xl">
            <h2 className="font-heading text-xl font-semibold text-text-headings mb-6">
              Cambiar contraseña
            </h2>

            <Form onSubmit={handlePasswordSubmit}>
              <TextField
                label="Contraseña actual"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña actual"
                value={currentPassword}
                onChange={setCurrentPassword}
                isRequired
              />

              <TextField
                label="Nueva contraseña"
                type="password"
                autoComplete="new-password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={setNewPassword}
                isRequired
                description="Debe tener al menos 6 caracteres"
              />

              <TextField
                label="Confirmar nueva contraseña"
                type="password"
                autoComplete="new-password"
                placeholder="Repite tu nueva contraseña"
                value={confirmNewPassword}
                onChange={setConfirmNewPassword}
                isRequired
              />

              {(pwError || pwValidationError) && <Alert>{pwError ?? pwValidationError}</Alert>}
              {pwSuccess && (
                <div className="flex items-start gap-2 rounded-lg border border-border-success bg-surface-success px-3 py-2.5 text-sm text-text-success">
                  <span>Contraseña actualizada exitosamente</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full sm:w-auto"
                isPending={pwLoading}
                isDisabled={pwLoading}
              >
                Cambiar contraseña
              </Button>
            </Form>
          </section>
        </div>
      </div>
    </FocusTTS>
  );
}

export default ProfilePage;
