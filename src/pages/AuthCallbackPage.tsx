import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { restoreSession } = useAuth();

  useEffect(() => {
    const error = searchParams.get('error');
    const token = searchParams.get('token');
    const userRaw = searchParams.get('user');

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
      return;
    }

    if (token && userRaw) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));
        restoreSession(token, user);
        navigate(user.role === 'student' ? '/student' : '/teacher', { replace: true });
        return;
      } catch {
        navigate('/login?error=invalid_user', { replace: true });
        return;
      }
    }

    navigate('/login?error=missing_params', { replace: true });
  }, [searchParams, navigate, restoreSession]);

  return null;
}
