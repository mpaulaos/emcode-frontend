import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section aria-label="Hero" className="rounded-[20px] border border-border-card bg-surface-primary p-12 sm:p-16">
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
            <Button variant="primary" onPress={() => navigate("/cursos")}>
              Explorar cursos
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            role="img"
            aria-label="Ilustración representativa de la plataforma Emcode"
            className="flex h-64 w-full max-w-[540px] items-center justify-center rounded-[20px] bg-primary-700/10 text-primary-700 md:h-80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
