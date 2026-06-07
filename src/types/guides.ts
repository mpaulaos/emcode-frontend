export interface Guide {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  content: GuideSection[];
}

export interface GuideSection {
  heading: string;
  body: string;
}

export const guides: Guide[] = [
  {
    id: 'material-accesible',
    title: 'Principios básicos para adaptar material didáctico accesible',
    summary:
      'Conocé los fundamentos para crear y adaptar materiales educativos que sean inclusivos y accesibles para todos tus estudiantes.',
    readTime: '8 min de lectura',
    content: [
      {
        heading: 'Introducción',
        body: 'La adaptación de materiales accesibles no depende de un solo ajuste: consiste en reconocer que cada estudiante aprende de forma diferente. Aplicar principios de accesibilidad desde el diseño es un gran fundamento del trabajo docente, ya que te permite llegar a más estudiantes sin necesidad de adaptar caso por caso.',
      },
      {
        heading: '¿Qué es la adaptación de material accesible?',
        body: 'La adaptación accesible en educación se refiere al proceso de convertir los contenidos de modo que sean comprensibles, navegables e interactuables por personas con distintas capacidades. Esto incluye ajustes visuales, auditivos, cognitivos y motores. El objetivo no es simplificar, sino remover barreras para que el aprendizaje sea posible.',
      },
      {
        heading: 'Principios básicos para el docente',
        body: 'Usá texto alternativo en todas las imágenes. Asegurate de que el contraste entre texto y fondo sea suficiente (mínimo 4.5:1 para texto normal). Estructurá los documentos con encabezados jerárquicos (H1, H2, H3). Evitá transmitir información únicamente por color. Ofrecé transcripciones o subtítulos para todo contenido de audio y video.',
      },
      {
        heading: 'Flexibilidad clara',
        body: 'Proporcionar alternativas es esencial: si tenés un video, incluí una transcripción escrita; si usás un diagrama, describilo textualmente. La flexibilidad no significa más trabajo, sino pensar con anticipación en la diversidad de tu estudiantado.',
      },
      {
        heading: 'Conclusiones',
        body: 'La accesibilidad es una responsabilidad compartida. Al incorporarla desde el inicio de tu planificación, construís un entorno más justo para todos los estudiantes. Pequeños cambios como usar encabezados, añadir alt text y asegurar buen contraste marcan una diferencia enorme en la experiencia de aprendizaje.',
      },
      {
        heading: 'Referencias',
        body: 'Web Content Accessibility Guidelines (WCAG) 2.1 — W3C. Universal Design for Learning (UDL) Guidelines — CAST. Guías de accesibilidad del Ministerio de Educación de Costa Rica.',
      },
    ],
  },
  {
    id: 'estrategias-ensenanza',
    title: 'Estrategias de enseñanza inclusiva en programación',
    summary:
      'Explorá técnicas concretas para adaptar la enseñanza de programación a estudiantes con distintas necesidades y estilos de aprendizaje.',
    readTime: '10 min de lectura',
    content: [
      {
        heading: 'Introducción',
        body: 'Enseñar programación de forma inclusiva implica reconocer que no todos los estudiantes aprenden igual ni parten del mismo punto. Esta guía presenta estrategias prácticas para adaptar tus clases y materiales.',
      },
      {
        heading: 'Diseño Universal para el Aprendizaje (DUA)',
        body: 'El DUA propone ofrecer múltiples medios de representación, acción y expresión. En programación esto significa: mostrar el mismo concepto con código, diagramas y explicación verbal; permitir que los estudiantes demuestren su aprendizaje de distintas formas.',
      },
      {
        heading: 'Andamiaje y apoyo gradual',
        body: 'Comenzá con ejemplos completos y funcionales, luego retirá apoyos progresivamente. Usá comentarios en el código para guiar la comprensión. Ofrecé plantillas o código base como punto de partida antes de pedir producción independiente.',
      },
      {
        heading: 'Evaluación flexible',
        body: 'Permitís distintas formas de entrega: código comentado, video explicativo, documento escrito o presentación oral. Esto reduce barreras para estudiantes con dificultades específicas sin comprometer los objetivos de aprendizaje.',
      },
      {
        heading: 'Entorno de trabajo accesible',
        body: 'Asegurate de que las herramientas que usás (editores, plataformas, sistemas de entrega) sean accesibles. VS Code, por ejemplo, tiene buen soporte para lectores de pantalla. Evitá depender exclusivamente de herramientas que requieran mouse.',
      },
      {
        heading: 'Conclusiones',
        body: 'La inclusión en la enseñanza de programación es posible y necesaria. Pequeños ajustes en cómo presentás el contenido, cómo evaluás y qué herramientas usás pueden marcar una diferencia enorme para tus estudiantes.',
      },
    ],
  },

];