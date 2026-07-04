import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <section aria-label="Hero" className="rounded-[20px] sm:border sm:border-border-card bg-surface-primary sm:p-16">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl leading-tight font-extrabold text-text-headings">
            Transformando ideas en experiencias digitales innovadoras
          </h1>
          <p className="max-w-[620px] text-base text-text-body">
            Emcode es una plataforma educativa diseñada para hacer la programación accesible a todas las personas,
            eliminando barreras y fomentando una comunidad de aprendizaje inclusiva.
          </p>
          <div className="pt-4">
            <Button variant="primary" onPress={() => navigate(isAuthenticated ? "/cursos/explorar" : "/login")}>
              Explorar cursos
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/about-image.webp"
            alt="Ilustración representativa de la plataforma Emcode"
            className="h-64 w-full max-w-[540px] rounded-[20px] object-cover md:h-80"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
