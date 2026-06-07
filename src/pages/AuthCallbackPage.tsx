import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userRaw = searchParams.get('user');

    if (token && userRaw) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        navigate('/teacher', { replace: true });
        return;
      } catch {
        // user inválido, redirigir al login
      }
    }

    navigate('/login', { replace: true });
  }, []);

  return null;
}
