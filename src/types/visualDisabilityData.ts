import type { DisabilityContent } from "./disability";

export const sensorialVisualContent: Record<string, DisabilityContent> = {
  ceguera: {
    title: "Ceguera",
    subtitle: "Pérdida total de visión o percepción mínima de luz.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "La ceguera es una condición visual caracterizada por la pérdida total de la visión o por una capacidad visual tan reducida que impide utilizar la vista de manera funcional incluso con corrección óptica.",
          "Puede estar presente desde el nacimiento (ceguera congénita) o desarrollarse durante la vida debido a enfermedades, lesiones, alteraciones genéticas o envejecimiento.",
          "Según la OMS, se considera ceguera legal cuando la agudeza visual en el mejor ojo es inferior a 3/60 o el campo visual es menor a 10 grados, incluso con la mejor corrección posible."
        ]
      },
      {
        title: "¿Cómo percibe el mundo una persona con ceguera?",
        paragraphs: [
          "La experiencia visual varía considerablemente entre individuos. No todas las personas con ceguera perciben lo mismo.",
          "Algunas personas perciben únicamente oscuridad total, mientras que otras pueden distinguir cambios de luz, sombras difusas o movimientos generales sin lograr identificar formas ni detalles.",
          "Las personas con ceguera desarrollan una mayor agudeza en otros sentidos como el tacto, el oído y el olfato, no porque los tengan más desarrollados biológicamente, sino porque aprenden a prestarles más atención y a interpretarlos con mayor detalle.",
          "El uso del bastón blanco, por ejemplo, permite detectar obstáculos mediante la vibración y el sonido que genera al tocar distintas superficies."
        ]
      },
      {
        title: "Situaciones cotidianas",
        paragraphs: [
          "La lectura puede realizarse mediante Braille, audiolibros o lectores de pantalla que convierten el texto en voz.",
          "Los teléfonos inteligentes modernos permiten enviar mensajes, navegar por internet y utilizar redes sociales mediante comandos de voz y tecnologías accesibles integradas.",
          "Para desplazarse, muchas personas utilizan bastón blanco, perros guía o aplicaciones de navegación adaptadas con instrucciones de audio.",
          "En el hogar, el etiquetado táctil, los electrodomésticos con controles accesibles y los asistentes de voz facilitan la autonomía en las tareas diarias.",
          "En el trabajo, los lectores de pantalla y el software especializado permiten el acceso a computadoras, documentos y sistemas de gestión."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "Los estudiantes pueden acceder a materiales en Braille, audiolibros, gráficos táctiles y plataformas digitales compatibles con lectores de pantalla.",
          "Es fundamental que los docentes describan verbalmente el contenido visual presentado en clase, como imágenes, gráficos o esquemas proyectados.",
          "Las universidades y centros educativos modernos incorporan cada vez más herramientas accesibles que favorecen la participación en igualdad de condiciones.",
          "Las evaluaciones pueden adaptarse para realizarse de forma oral, mediante Braille o con tiempo adicional cuando se utiliza tecnología de apoyo.",
          "Es importante fomentar un entorno inclusivo donde el estudiante no deba solicitar adaptaciones en cada instancia, sino que estas estén integradas desde el diseño del curso."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Los lectores de pantalla más utilizados son NVDA y JAWS en Windows, VoiceOver en dispositivos Apple y TalkBack en Android.",
          "Las líneas Braille electrónicas convierten el texto de la pantalla en caracteres Braille táctiles en tiempo real.",
          "Aplicaciones como Seeing AI, Be My Eyes o Envision AI permiten identificar objetos, leer documentos, reconocer personas y describir el entorno mediante la cámara del teléfono.",
          "Los asistentes de voz como Siri, Google Assistant y Alexa facilitan el control del entorno, la búsqueda de información y la comunicación sin necesidad de pantalla.",
          "Impresoras Braille y software de transcripción permiten convertir documentos digitales en material táctil accesible."
        ]
      },
      {
        title: "Tratamientos e investigación",
        paragraphs: [
          "Los tratamientos dependen de la causa específica de la pérdida visual y no siempre tienen como objetivo restaurar la visión completa.",
          "Actualmente se investigan terapias génicas para enfermedades hereditarias como la retinosis pigmentaria, con resultados prometedores en ensayos clínicos.",
          "Los implantes retinianos, como el Argus II, convierten señales de video en impulsos eléctricos que estimulan las células ganglionares de la retina.",
          "Las técnicas de medicina regenerativa, como el trasplante de células madre en la retina, representan una línea de investigación activa con potencial para restaurar parcialmente la visión.",
          "La inteligencia artificial está siendo incorporada en prótesis visuales para mejorar la interpretación de imágenes y la navegación en entornos complejos."
        ]
      },
      {
        title: "Mitos frecuentes",
        paragraphs: [
          "No todas las personas ciegas perciben oscuridad absoluta. Muchas distinguen luz, sombras o formas difusas.",
          "Las personas con ceguera no poseen necesariamente un oído extraordinario; lo que desarrollan es una mayor capacidad de atención y entrenamiento sensorial consciente.",
          "La ceguera no impide llevar una vida independiente, profesional y socialmente activa. Con los apoyos adecuados, las personas ciegas pueden desempeñarse en una amplia variedad de campos.",
          "El Braille no es el único medio de acceso a la información. Los lectores de pantalla y el contenido de audio son igualmente utilizados y en muchos contextos más prácticos.",
          "Las personas con ceguera no necesitan que se les hable en voz alta ni despacio. Se comunican de la misma forma que cualquier otra persona."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Describir verbalmente todo el contenido visual presentado en clase: imágenes, gráficos, esquemas y expresiones faciales relevantes.",
          "Proporcionar los materiales del curso en formatos digitales accesibles (Word o PDF etiquetado) con anticipación suficiente.",
          "Evitar señalar objetos o escribir en la pizarra sin describir lo que se está haciendo.",
          "Consultar directamente con el estudiante cuáles son sus preferencias y necesidades específicas, en lugar de asumir.",
          "Asegurarse de que las plataformas digitales utilizadas en el curso sean compatibles con lectores de pantalla."
        ]
      }
    ],
    image: "",
  },

  "baja-vision": {
    title: "Baja visión",
    subtitle: "Disminución significativa de la capacidad visual que no puede corregirse completamente mediante lentes, cirugía o tratamientos convencionales.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "La baja visión es una condición en la que la persona conserva cierto grado de visión útil, pero presenta limitaciones importantes para realizar actividades cotidianas que no pueden resolverse con lentes convencionales.",
          "No implica ceguera total, pero sí dificultades funcionales que persisten incluso con la mejor corrección disponible.",
          "Según la OMS, se habla de baja visión cuando la agudeza visual en el mejor ojo es inferior a 6/18 pero igual o superior a 3/60, o cuando el campo visual es menor a 20 grados."
        ]
      },
      {
        title: "¿Cómo se percibe?",
        paragraphs: [
          "Algunas personas observan imágenes constantemente borrosas, mientras que otras presentan pérdida de visión central (escotoma central) que les impide ver directamente lo que enfocan.",
          "Otras experimentan reducción del campo visual periférico, lo que les hace ver como a través de un tubo, o dificultades para percibir contrastes entre colores similares.",
          "La sensibilidad al deslumbramiento es común: la luz intensa puede resultar dolorosa o reducir aún más la visión funcional.",
          "La experiencia visual puede variar considerablemente entre individuos incluso con el mismo diagnóstico."
        ]
      },
      {
        title: "Situaciones cotidianas",
        paragraphs: [
          "Leer textos pequeños puede requerir ampliación digital, lupas electrónicas o dispositivos de aumento.",
          "Reconocer rostros a distancia suele resultar difícil, lo que puede generar situaciones sociales incómodas cuando no se saluda a alguien conocido.",
          "Identificar señales, números de autobús o información impresa puede requerir acercarse considerablemente o utilizar el zoom del teléfono.",
          "Actividades como cocinar, leer el correo o manejar pueden verse limitadas o requerir adaptaciones específicas.",
          "El manejo nocturno o en condiciones de poca luz puede ser especialmente difícil debido a la reducción adicional de la capacidad visual."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "Los estudiantes pueden beneficiarse de materiales ampliados, pantallas grandes, software de aumento y ubicaciones preferenciales dentro del aula (cerca del frente y alejados de ventanas con luz directa).",
          "La iluminación adecuada y el contraste visual en presentaciones y documentos son factores determinantes para la comprensión del contenido.",
          "Los docentes deben evitar utilizar fuentes pequeñas, colores de bajo contraste o presentaciones con mucho contenido visual comprimido.",
          "El uso de software de magnificación como ZoomText o las funciones de accesibilidad integradas en los sistemas operativos puede ser de gran ayuda.",
          "Es recomendable ofrecer tiempo adicional en evaluaciones, ya que la lectura con baja visión suele ser más lenta y demandante."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Lupas electrónicas, ampliadores digitales portátiles y pantallas de gran tamaño facilitan el acceso a materiales impresos y digitales.",
          "El software de magnificación como ZoomText o Magnifier de Windows permite ampliar el contenido de la pantalla manteniendo la resolución.",
          "Muchas personas combinan estas herramientas con lectores de pantalla parciales para acceder a contenido que no pueden ver con claridad.",
          "Los filtros de pantalla y modos de alto contraste reducen el deslumbramiento y mejoran la legibilidad.",
          "Aplicaciones móviles como Seeing AI o Google Lens permiten ampliar y leer texto en tiempo real usando la cámara."
        ]
      },
      {
        title: "Tratamientos",
        paragraphs: [
          "Los tratamientos dependen de la enfermedad subyacente que origina la baja visión.",
          "En condiciones como el glaucoma o la degeneración macular húmeda, el tratamiento médico puede ralentizar significativamente la progresión.",
          "La rehabilitación visual, realizada por especialistas, entrena a la persona para maximizar el uso de su visión residual mediante técnicas y dispositivos específicos.",
          "En algunos casos, cirugías como la extracción de cataratas o procedimientos láser pueden mejorar la agudeza visual de forma significativa."
        ]
      },
      {
        title: "Mitos frecuentes",
        paragraphs: [
          "Tener baja visión no significa ver todo borroso. Los patrones de pérdida visual son muy variados.",
          "Usar lentes no siempre soluciona el problema: en la baja visión, la corrección óptica convencional no es suficiente.",
          "Las personas con baja visión no son candidatas automáticas a aprender Braille; muchas continúan usando su visión residual con apoyos tecnológicos.",
          "La baja visión no es necesariamente progresiva: depende completamente de la causa subyacente."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Usar fuentes grandes (mínimo 18pt) y de alto contraste en presentaciones y materiales impresos.",
          "Evitar fondos con patrones, colores muy similares o texto sobre imágenes.",
          "Permitir que el estudiante use su dispositivo de aumento durante clases y evaluaciones.",
          "Proporcionar materiales digitales con anticipación para que el estudiante pueda ajustar el tamaño antes de la clase.",
          "Preguntar al estudiante si la iluminación del aula le resulta adecuada y ajustarla si es posible."
        ]
      }
    ],
    image: "",
  },

  daltonismo: {
    title: "Daltonismo",
    subtitle: "Dificultad para distinguir ciertos colores, generalmente rojo y verde, debido a una alteración en los fotorreceptores del ojo.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "El daltonismo, o discromaptopsia, es una condición en la que la persona tiene dificultad para distinguir ciertos colores debido a una alteración en los conos de la retina, que son los fotorreceptores responsables de la percepción del color.",
          "La forma más común es la deuteranomalía (dificultad con el verde) y la protanomalía (dificultad con el rojo), ambas parte del grupo rojo-verde. Menos frecuente es la tritanopía, que afecta la percepción del azul-amarillo.",
          "Es mayormente hereditaria y ligada al cromosoma X, por lo que afecta con mayor frecuencia a hombres (8%) que a mujeres (0.5%). No suele ser una condición adquirida."
        ]
      },
      {
        title: "¿Cómo se percibe?",
        paragraphs: [
          "Las personas con daltonismo rojo-verde no ven necesariamente en blanco y negro: perciben colores, pero algunos que para otras personas son claramente distintos, para ellas lucen iguales o muy similares.",
          "El rojo puede percibirse como marrón oscuro o negro. El verde puede confundirse con amarillo o beige. Los semáforos se distinguen por la posición, no por el color.",
          "En casos de acromatopsia (muy rara), la persona sí percibe únicamente en escala de grises."
        ]
      },
      {
        title: "Situaciones cotidianas",
        paragraphs: [
          "Interpretar gráficas, mapas o materiales educativos que usan el color como única forma de diferenciación puede resultar confuso.",
          "Seleccionar ropa, identificar el estado de madurez de alimentos o leer señales de tráfico puede requerir estrategias alternativas.",
          "En entornos digitales, los formularios con mensajes de error en rojo sobre fondo blanco pueden no ser perceptibles.",
          "Actividades como diseño gráfico, electricidad (cables de colores) o algunas áreas de medicina requieren adaptaciones específicas."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "El principal ajuste es nunca usar el color como único medio de transmitir información. Siempre combinar color con etiquetas de texto, patrones o formas.",
          "En gráficas estadísticas, usar tramas o patrones además de colores para diferenciar series de datos.",
          "Las presentaciones deben revisarse con simuladores de daltonismo (como Coblis o el modo de accesibilidad de Figma) para verificar su legibilidad.",
          "Es una condición que muchos estudiantes no reportan por desconocimiento propio o por no considerarla relevante, por lo que los docentes deben diseñar materiales accesibles por defecto."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Aplicaciones como Color Inspector o Colorblind Pal permiten identificar colores usando la cámara del teléfono.",
          "Los sistemas operativos modernos incluyen filtros de color que modifican la pantalla para mejorar la diferenciación de colores.",
          "Herramientas de diseño como Adobe y Figma incluyen modos de simulación de daltonismo para verificar la accesibilidad del contenido."
        ]
      },
      {
        title: "Mitos frecuentes",
        paragraphs: [
          "El daltonismo no significa ver en blanco y negro en la mayoría de los casos. Es una dificultad específica para distinguir ciertos pares de colores.",
          "No tiene cura actualmente, aunque existen lentes especiales (como EnChroma) que en algunos casos mejoran la discriminación de colores.",
          "No impide realizar la mayoría de actividades cotidianas ni académicas si los materiales están bien diseñados."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Nunca usar el color como único indicador de información en gráficas, mapas, rúbricas o retroalimentación.",
          "Agregar texto, iconos o patrones complementarios al color en todos los materiales visuales.",
          "Usar combinaciones de colores accesibles: azul y naranja, o negro sobre amarillo, son combinaciones con alta diferenciación para la mayoría de tipos de daltonismo.",
          "Verificar materiales con herramientas de simulación de daltonismo antes de distribuirlos."
        ]
      }
    ],
    image: "",
  },

  "vision-periferica-reducida": {
    title: "Visión periférica reducida",
    subtitle: "Pérdida del campo visual lateral que limita la capacidad de detectar objetos fuera del área central de enfoque.",
    sections: [
      {
        title: "¿Qué es?",
        paragraphs: [
          "La visión periférica reducida, también llamada hemianopsia o visión en túnel según su grado, es una condición en la que la persona pierde parte o la totalidad del campo visual lateral, conservando únicamente la visión central.",
          "Puede ser causada por glaucoma avanzado, retinosis pigmentaria, accidentes cerebrovasculares, tumores cerebrales o lesiones en el nervio óptico.",
          "El grado de pérdida varía: algunas personas tienen una reducción leve del campo lateral, mientras que otras ven como a través de un tubo estrecho."
        ]
      },
      {
        title: "¿Cómo se percibe?",
        paragraphs: [
          "La persona puede leer texto sin problema, ya que la visión central suele estar conservada, pero tiene dificultades para detectar objetos o personas que se aproximan desde los costados.",
          "Moverse en espacios concurridos, subir escaleras o cruzar calles se vuelve más demandante porque el entorno lateral no es perceptible.",
          "La lectura puede ser lenta si la pérdida afecta también parte de la visión central baja, necesaria para seguir el renglón."
        ]
      },
      {
        title: "Educación inclusiva",
        paragraphs: [
          "Ubicar al estudiante en un lugar donde pueda ver al docente y la pizarra sin necesidad de girar constantemente.",
          "Evitar actividades que requieran rastrear objetos en movimiento en un campo visual amplio sin previo aviso.",
          "Proporcionar materiales digitales que el estudiante pueda ampliar y controlar desde su dispositivo.",
          "En evaluaciones con tiempo limitado, considerar que el rastreo visual puede ser más lento."
        ]
      },
      {
        title: "Tecnologías de apoyo",
        paragraphs: [
          "Software de magnificación y lectores de pantalla para acceder a contenido digital.",
          "Prismas de campo visual que amplían el rango visual percibido en algunos casos de hemianopsia.",
          "Aplicaciones de navegación con alertas de audio para la movilidad en exteriores."
        ]
      },
      {
        title: "Recomendaciones para docentes",
        paragraphs: [
          "Acercarse al estudiante de frente al hablarle, no desde los costados.",
          "Advertir verbalmente cuando se vayan a presentar elementos visuales importantes.",
          "Asegurarse de que el estudiante tenga una ubicación que minimice la necesidad de rastreo visual amplio."
        ]
      }
    ],
    image: "",
  }, 
};