import type { DisabilityContent } from "../../types/disability";

export const sensorialAuditivaContent: Record<string, DisabilityContent> = {
  sordera: {
    title: "Sordera",
    subtitle: "Pérdida total o severa de la audición que impide la percepción funcional del sonido.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "La sordera es una condición en la que la persona experimenta una pérdida auditiva profunda o total, lo que impide la percepción funcional del sonido incluso con el uso de audífonos convencionales.",
          "Puede ser congénita (presente desde el nacimiento) o adquirida a lo largo de la vida por causas como infecciones, traumatismos, exposición a ruidos intensos o enfermedades.",
          "En audiología, se habla de sordera profunda cuando la pérdida auditiva supera los 90 decibelios en el mejor oído.",
          "Muchas personas sordas se identifican como parte de una comunidad cultural y lingüística propia, centrada en el uso de la lengua de señas, y no necesariamente perciben la sordera como una discapacidad que deba ser corregida."
        ]
      },
      {
        title: "¿Cómo se percibe?",
        paragraphs: [
          "Las personas con sordera profunda no perciben la mayoría de los sonidos del entorno, incluyendo el habla, la música o las alarmas.",
          "La comunicación se basa principalmente en la visión: lengua de señas, lectura labial, expresión facial y lenguaje escrito.",
          "Algunas personas pueden percibir vibraciones de sonidos muy fuertes a través del tacto.",
          "El tinnitus (zumbido en los oídos) puede estar presente en algunos casos, especialmente en sordera adquirida."
        ]
      },
      {
        title: "Lengua de señas",
        paragraphs: [
          "La lengua de señas es una lengua natural completa, con gramática, sintaxis y expresión propias, no es una representación gestual del español u otro idioma oral.",
          "En Costa Rica se utiliza la Lengua de Señas Costarricense (LESCO), reconocida oficialmente como lengua nacional.",
          "Cada país tiene su propia lengua de señas; no existe una lengua de señas universal, aunque hay sistemas internacionales de comunicación entre sordos.",
          "Aprender lengua de señas básica puede ser de gran valor para docentes que trabajen con estudiantes sordos."
        ]
      },
      {
        title: "Situaciones cotidianas",
        paragraphs: [
          "Las llamadas telefónicas convencionales no son accesibles; se utilizan videollamadas, mensajes de texto o servicios de interpretación remota.",
          "Ver televisión requiere subtítulos o intérpretes de lengua de señas en pantalla.",
          "En entornos públicos, las alertas visuales (luces parpadeantes, pantallas con texto) son esenciales para la seguridad.",
          "La comunicación en grupos de personas oyentes puede ser agotadora, especialmente cuando múltiples personas hablan al mismo tiempo.",
          "Los subtítulos automáticos de aplicaciones como Google Meet o Zoom mejoran significativamente la participación en entornos digitales."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "El acceso a un intérprete de lengua de señas en el aula es un derecho fundamental para estudiantes sordos cuya lengua primaria es la lengua de señas.",
          "Los materiales visuales, subtítulos en videos y transcripciones de contenido de audio son adaptaciones esenciales.",
          "El docente debe hablar de frente al estudiante (o al intérprete), con buena iluminación sobre el rostro, para facilitar la lectura labial.",
          "Evitar hablar mientras se escribe en la pizarra o se da la espalda al estudiante.",
          "Las evaluaciones orales deben poder realizarse en formato escrito o con intérprete.",
          "En entornos virtuales, activar siempre los subtítulos automáticos y proporcionar transcripciones de todas las grabaciones."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Los implantes cocleares estimulan directamente el nervio auditivo y pueden proporcionar percepción de sonido a personas con sordera profunda, aunque no restauran la audición natural.",
          "Las aplicaciones de subtitulado en tiempo real, como Google Live Transcribe u Otter.ai, convierten el habla en texto de forma instantánea y facilitan la comprensión.",
          "Los sistemas de amplificación de sonido en el aula, como los sistemas FM o de frecuencia modulada, benefician a personas con restos auditivos y mejoran la relación señal-ruido.",
          "Los teléfonos con funciones de video y mensajería facilitan la comunicación cotidiana y el contacto accesible.",
          "Las alertas visuales y vibratorias, como despertadores, timbres o detectores de humo, reemplazan las señales sonoras en el hogar."
        ]
      },
      {
        title: "Tratamientos",
        paragraphs: [
          "El implante coclear es la intervención médica más significativa para la sordera profunda, especialmente cuando se realiza en niños pequeños.",
          "No todas las personas sordas desean un implante coclear; la decisión es profundamente personal e involucra consideraciones culturales, identitarias y médicas.",
          "La rehabilitación auditiva y logopédica es fundamental tras el implante para aprender a interpretar las señales auditivas que el dispositivo proporciona."
        ]
      },
      {
        title: "Mitos frecuentes",
        paragraphs: [
          "La sordera no significa que la persona no pueda comunicarse: muchas personas usan lengua de señas, lectura labial, texto o apoyos tecnológicos.",
          "Tener sordera no implica falta de inteligencia ni una incapacidad para aprender; la barrera principal suele ser la accesibilidad del entorno.",
          "No todas las personas sordas usan o desean los mismos apoyos, por lo que las decisiones deben respetar su identidad y preferencias."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Conviene hablar siempre de frente, con buena iluminación en el rostro y sin cubrirse la boca.",
          "También es importante usar subtítulos en todos los videos y materiales de audio del curso.",
          "Hay que asegurarse de que el intérprete tenga visibilidad clara del docente y del pizarrón.",
          "Proporcionar materiales escritos con anticipación permite que el estudiante o el intérprete puedan prepararse mejor.",
          "Las plataformas digitales del curso deben contar con funciones de subtitulado accesibles."
        ]
      }
    ],
    image: "",
  },

  hipoacusia: {
    title: "Hipoacusia",
    subtitle: "Pérdida auditiva parcial que dificulta la percepción del sonido, con un amplio rango de severidad.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "La hipoacusia es una pérdida auditiva parcial que puede variar desde leve (dificultad para escuchar susurros) hasta severa (incapacidad para escuchar conversaciones normales sin amplificación).",
          "A diferencia de la sordera profunda, las personas con hipoacusia conservan cierto grado de audición funcional, frecuentemente mejorada con el uso de audífonos.",
          "Se clasifica según el grado de pérdida en decibelios: leve (26-40 dB), moderada (41-60 dB), severa (61-80 dB) y profunda (más de 90 dB).",
          "Puede ser unilateral (en un solo oído) o bilateral, conductiva (problema en oído externo o medio), neurosensorial (daño en cóclea o nervio) o mixta."
        ]
      },
      {
        title: "¿Cómo se percibe?",
        paragraphs: [
          "Las personas con hipoacusia pueden escuchar sonidos pero con dificultad para discriminar palabras, especialmente en entornos ruidosos.",
          "Frecuentemente solicitan que se repitan las frases o hablan con un volumen más alto de lo usual.",
          "La comprensión del habla puede deteriorarse significativamente en espacios con eco, ruido de fondo o cuando el interlocutor no habla de frente.",
          "El esfuerzo auditivo sostenido durante el día puede causar fatiga mental considerable."
        ]
      },
      {
        title: "Situaciones cotidianas",
        paragraphs: [
          "Conversaciones en grupos numerosos o entornos ruidosos (restaurantes, transporte público) son especialmente desafiantes.",
          "Las llamadas telefónicas pueden ser difíciles si la línea no es clara o el interlocutor habla rápido.",
          "Ver televisión o escuchar música puede requerir un volumen más alto que el habitual.",
          "En reuniones o clases, puede perderse parte del contenido si el docente habla de espaldas o a distancia.",
          "La fatiga auditiva al final del día puede afectar la concentración y el rendimiento."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "Los sistemas de micrófonos en el aula (como sistemas FM o de bucle magnético) transmiten la voz del docente directamente al audífono del estudiante, reduciendo el impacto del ruido de fondo.",
          "Hablar de frente al estudiante, con buena iluminación, facilita la lectura labial como apoyo complementario.",
          "Proporcionar materiales escritos o digitales que complementen la información transmitida de forma oral.",
          "Permitir que el estudiante se siente en una posición donde pueda ver bien al docente y a los compañeros que participan.",
          "En evaluaciones orales, asegurarse de hablar con claridad, sin acelerarse y en un entorno sin ruido de fondo.",
          "Los subtítulos en videos y las transcripciones de contenido de audio son fundamentales."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Los audífonos modernos amplifican selectivamente las frecuencias afectadas y suelen incluir reducción de ruido y conectividad Bluetooth.",
          "Los sistemas FM o de bucle de inducción magnética mejoran significativamente la comprensión en espacios grandes o ruidosos.",
          "Las aplicaciones de subtitulado en tiempo real, como Google Live Transcribe u Otter.ai, son útiles en reuniones y clases.",
          "Los audífonos de conducción ósea son una alternativa para algunas personas con hipoacusia conductiva.",
          "Las notificaciones visuales y vibratorias en teléfonos y dispositivos inteligentes complementan las alertas sonoras."
        ]
      },
      {
        title: "Tratamientos",
        paragraphs: [
          "El tratamiento depende de la causa y el tipo de hipoacusia.",
          "La hipoacusia conductiva frecuentemente tiene solución médica o quirúrgica (extracción de tapones de cera, cirugía de otosclerosis, tratamiento de infecciones).",
          "La hipoacusia neurosensorial generalmente no es reversible, pero los audífonos y en casos severos los implantes cocleares mejoran significativamente la funcionalidad.",
          "La rehabilitación auditiva con logopeda ayuda a mejorar la discriminación del habla y el uso efectivo de dispositivos de amplificación."
        ]
      },
      {
        title: "Mitos frecuentes",
        paragraphs: [
          "La hipoacusia no es lo mismo que sordera total: muchas personas conservan audición funcional con distintos grados de apoyo.",
          "Subir el volumen no siempre resuelve la comprensión; el problema puede estar en la discriminación del habla o en el ruido de fondo.",
          "No afecta de la misma manera a todas las edades ni a todas las personas, por lo que las adaptaciones deben individualizarse."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Conviene hablar con claridad, sin exagerar la articulación, a una velocidad normal y siempre de frente al estudiante.",
          "Si el estudiante no comprende, es mejor repetir o reformular el mensaje en lugar de limitarse a repetirlo igual.",
          "Reducir el ruido de fondo durante explicaciones importantes, por ejemplo cerrando puertas o pidiendo silencio, mejora mucho la comprensión.",
          "También es útil usar subtítulos en todos los videos, proporcionar materiales escritos y permitir que el estudiante grabe las clases si lo considera útil.",
          "Las estrategias más efectivas deben consultarse directamente con el estudiante, porque las necesidades varían mucho según el grado y el tipo de hipoacusia."
        ]
      }
    ],
    image: "",
  },
   SorderaUnilateral: {
    title: "Sordera unilateral",
    subtitle: "Pérdida auditiva en un solo oído, con audición normal o casi normal en el otro.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "La sordera unilateral es una pérdida auditiva en un solo oído, con audición normal o casi normal en el otro.",
          "A diferencia de la sordera bilateral, las personas con sordera unilateral pueden utilizar su oído funcional para compensar parte de la pérdida en el otro.",
          "Se clasifica según el grado de pérdida en decibelios: leve (26-40 dB), moderada (41-60 dB), severa (61-80 dB) y profunda (más de 81 dB).",
          "Puede ser unilateral (en un solo oído) o bilateral, conductiva (problema en oído externo o medio), neurosensorial (daño en cóclea o nervio) o mixta."
        ]
      },
      {
        title: "¿Cómo se percibe?",
        paragraphs: [
          "Las personas con sordera unilateral pueden escuchar sonidos pero con dificultad para discriminar palabras, especialmente en entornos ruidosos.",
          "Frecuentemente solicitan que se repitan las frases o hablan con un volumen más alto de lo usual.",
          "La comprensión del habla puede deteriorarse significativamente en espacios con eco, ruido de fondo o cuando el interlocutor no habla de frente.",
          "El esfuerzo auditivo sostenido durante el día puede causar fatiga mental considerable."
        ]
      },
      {
        title: "Situaciones cotidianas",
        paragraphs: [
          "Conversaciones en grupos numerosos o entornos ruidosos (restaurantes, transporte público) son especialmente desafiantes.",
          "Las llamadas telefónicas pueden ser difíciles si la línea no es clara o el interlocutor habla rápido.",
          "Ver televisión o escuchar música puede requerir un volumen más alto que el habitual.",
          "En reuniones o clases, puede perderse parte del contenido si el docente habla de espaldas o a distancia.",
          "La fatiga auditiva al final del día puede afectar la concentración y el rendimiento."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "Los sistemas de micrófonos en el aula (como sistemas FM o de bucle magnético) transmiten la voz del docente directamente al audífono del estudiante, reduciendo el impacto del ruido de fondo.",
          "Hablar de frente al estudiante, con buena iluminación, facilita la lectura labial como apoyo complementario.",
          "Proporcionar materiales escritos o digitales que complementen la información transmitida de forma oral.",
          "Permitir que el estudiante se siente en una posición donde pueda ver bien al docente y a los compañeros que participan.",
          "En evaluaciones orales, asegurarse de hablar con claridad, sin acelerarse y en un entorno sin ruido de fondo.",
          "Los subtítulos en videos y las transcripciones de contenido de audio son fundamentales."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Los audífonos modernos amplifican selectivamente las frecuencias afectadas y suelen incluir reducción de ruido y conectividad Bluetooth.",
          "Los sistemas FM o de bucle de inducción magnética mejoran significativamente la comprensión en espacios grandes o ruidosos.",
          "Las aplicaciones de subtitulado en tiempo real, como Google Live Transcribe u Otter.ai, son útiles en reuniones y clases.",
          "Los audífonos de conducción ósea pueden ser una alternativa para algunas personas con sordera unilateral.",
          "Las notificaciones visuales y vibratorias en teléfonos y dispositivos inteligentes complementan las alertas sonoras."
        ]
      },
      {
        title: "Tratamientos",
        paragraphs: [
          "El tratamiento depende de la causa y el tipo de sordera unilateral.",
          "La sordera unilateral frecuentemente tiene solución médica o quirúrgica (extracción de tapones de cera, cirugía de otosclerosis, tratamiento de infecciones).",
          "La sordera unilateral neurosensorial generalmente no es reversible, pero los audífonos y en casos severos los implantes cocleares mejoran significativamente la funcionalidad.",
          "La rehabilitación auditiva con logopeda ayuda a mejorar la discriminación del habla y el uso efectivo de dispositivos de amplificación."
        ]
      },
      {
        title: "Mitos frecuentes",
        paragraphs: [
          "La sordera unilateral no es un problema menor: puede afectar mucho la localización de sonidos y la comprensión en ambientes ruidosos.",
          "No siempre se compensa por completo con el otro oído; muchas personas siguen necesitando apoyos y ajustes en el aula o trabajo.",
          "No significa que la persona no escuche nada: la audición puede ser normal en un lado y muy limitada en el otro."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Conviene hablar con claridad, sin exagerar la articulación, a una velocidad normal y siempre de frente al estudiante.",
          "Si el estudiante no comprende, es mejor repetir o reformular el mensaje en lugar de limitarse a repetirlo igual.",
          "Reducir el ruido de fondo durante explicaciones importantes, por ejemplo cerrando puertas o pidiendo silencio, mejora mucho la comprensión.",
          "También es útil usar subtítulos en todos los videos, proporcionar materiales escritos y permitir que el estudiante grabe las clases si lo considera útil.",
          "Las estrategias más efectivas deben consultarse directamente con el estudiante, porque las necesidades varían mucho según el grado y tipo de sordera unilateral."
        ]
      }
    ],
    image: "",
  },
trastornoProcesamientoAuditivo: {
  title: "Trastorno del procesamiento auditivo (TPA)",
  subtitle: "Dificultad para interpretar y procesar la información sonora, a pesar de tener una audición normal o casi normal.",
  sections: [
    {
      title: "¿Qué es?",
      paragraphs: [
        "El trastorno del procesamiento auditivo (TPA) ocurre cuando el cerebro presenta dificultades para interpretar correctamente los sonidos que recibe.",
        "Las pruebas auditivas convencionales pueden mostrar una audición normal.",
        "La dificultad no está en escuchar los sonidos, sino en comprenderlos, organizarlos o diferenciarlos adecuadamente.",
        "Puede afectar la comprensión del habla, especialmente en ambientes con múltiples estímulos auditivos."
      ]
    },
    {
      title: "¿Cómo se percibe?",
      paragraphs: [
        "La persona escucha los sonidos pero tiene dificultades para interpretar su significado.",
        "Puede confundir palabras similares o perder información durante conversaciones.",
        "Las instrucciones verbales largas suelen ser difíciles de recordar.",
        "La comprensión empeora notablemente cuando existe ruido de fondo."
      ]
    },
    {
      title: "Situaciones cotidianas",
      paragraphs: [
        "Seguir conversaciones en aulas, comedores o espacios concurridos puede resultar complicado.",
        "Las instrucciones dadas únicamente de forma oral pueden olvidarse o interpretarse incorrectamente.",
        "Puede parecer que la persona no presta atención cuando en realidad tiene dificultades para procesar la información auditiva.",
        "Las conversaciones rápidas suelen requerir un esfuerzo adicional de comprensión."
      ]
    },
    {
      title: "Educación inclusiva",
      paragraphs: [
        "Las instrucciones deben presentarse de forma breve, clara y secuencial.",
        "Es recomendable complementar la información oral con apoyos visuales y escritos.",
        "Los organizadores gráficos ayudan a estructurar la información.",
        "Permitir tiempo adicional para procesar instrucciones puede mejorar el desempeño académico.",
        "La ubicación cercana al docente reduce la interferencia del ruido ambiental."
      ]
    },
    {
      title: "Tecnologías de apoyo",
      paragraphs: [
        "Los sistemas FM ayudan a mejorar la claridad de la voz del docente y reducen la interferencia del ruido ambiental.",
        "Las grabaciones de clases permiten revisar la información posteriormente y recuperar detalles perdidos en la escucha inicial.",
        "Las aplicaciones de transcripción automática facilitan el seguimiento de explicaciones extensas.",
        "Las agendas digitales y las herramientas visuales ayudan a organizar instrucciones y tareas de forma más accesible."
      ]
    },
    {
      title: "Tratamientos",
      paragraphs: [
        "La intervención suele centrarse en el entrenamiento de habilidades auditivas y estrategias compensatorias.",
        "Los profesionales en audiología y terapia del lenguaje pueden diseñar programas específicos de apoyo.",
        "Las adaptaciones educativas son una parte importante del proceso de intervención.",
        "La detección temprana favorece el desarrollo de estrategias efectivas de aprendizaje."
      ]
    },
    {
      title: "Mitos frecuentes",
      paragraphs: [
        "El TPA no es falta de atención ni rebeldía; la persona escucha, pero procesa la información sonora con dificultad.",
        "Subir la voz no suele resolver el problema cuando el reto está en interpretar, ordenar o diferenciar sonidos.",
        "No implica necesariamente problemas de audición en las pruebas básicas, por eso puede pasar desapercibido si no se evalúa correctamente."
      ]
    },
    {
      title: "Recomendaciones para docentes",
      paragraphs: [
        "Conviene dar instrucciones paso a paso y en un orden claro.",
        "Siempre que sea posible, los apoyos visuales deben acompañar la información oral.",
        "Confirmar la comprensión pidiendo al estudiante que explique la instrucción con sus propias palabras ayuda a detectar errores de interpretación.",
        "Reducir fuentes innecesarias de ruido en el aula mejora la comprensión auditiva.",
        "Las actividades complejas funcionan mejor cuando se dividen en tareas pequeñas y organizadas."
      ]
    }
  ],
  image: "",
},

};