import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section
      aria-label="Llamado a la acción"
      className="rounded-[20px] border border-border-card bg-surface-primary p-12 text-center sm:p-16"
    >
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings">
        ¿Listo para formar parte de la experiencia?
      </h2>
      <p className="mt-4 text-base text-text-body">
        Unite a nuestra comunidad y comenzá tu camino en el mundo de la programación.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" onPress={() => navigate("/register")}>
          Comenzar
        </Button>
        <Button
          variant="secondary"
          onPress={() => navigate("/guias")}
        >
          Contactar al equipo
        </Button>
      </div>
    </section>
  );
}
