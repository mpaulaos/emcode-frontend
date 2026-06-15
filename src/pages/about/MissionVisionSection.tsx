const missionData = {
  title: "Misión",
  description:
    "Democratizar el aprendizaje de la programación ofreciendo una plataforma accesible, inclusiva y de calidad que elimine las barreras educativas y permita a cualquier persona desarrollar habilidades tecnológicas.",
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.2 2 6 2s6-.9 6-2v-5" />
    </svg>
  ),
};

const visionData = {
  title: "Visión",
  description:
    "Ser la plataforma de referencia en educación tecnológica inclusiva en Latinoamérica, formando una nueva generación de programadores diversos y preparados para los desafíos del futuro digital.",
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export function MissionVisionSection() {
  return (
    <section aria-label="Misión y Visión">
      <h2 className="text-2xl md:text-4xl font-semibold text-text-headings text-center">
        Misión y Visión
      </h2>
      <p className="mt-4 text-base text-text-body text-center">
        Conocé el propósito que guía nuestro trabajo y la meta que aspiramos alcanzar.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {[missionData, visionData].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border-card bg-surface-primary p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-700/10 text-primary-700">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-text-headings">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-text-body">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
