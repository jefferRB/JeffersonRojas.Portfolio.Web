import { Translations } from './translations.model';

/** Secondary locale. Written, not machine translated. */
export const ES_TRANSLATIONS: Translations = {
  meta: {
    home: {
      title: 'Jefferson Rojas - Ingeniero de software y Product Builder',
      description:
        'Transformo desafíos operativos reales en productos de software confiables, trabajando desde el descubrimiento y la arquitectura hasta el desarrollo y la operación en producción.',
    },
    luxurycloud: {
      title: 'Caso de estudio LuxuryCloud - Jefferson Rojas',
      description:
        'Cómo una solicitud para gestionar clientes se convirtió en un SaaS multi-tenant en producción: el descubrimiento, el modelo de datos, el aislamiento entre tenants, las integraciones y la operación diaria detrás del producto.',
    },
  },

  a11y: {
    skipToContent: 'Saltar al contenido principal',
    languageGroupLabel: 'Idioma',
    languageChanged: 'Idioma cambiado a español.',
    localeNames: {
      en: 'Inglés',
      es: 'Español',
    },
    themeControlLabel: 'Control de tema',
    switchToLight: 'Cambiar al tema claro',
    switchToDark: 'Cambiar al tema oscuro',
    opensInNewTab: 'se abre en una pestaña nueva',
  },

  common: {
    downloadResume: 'Descargar currículum',
    linkedin: 'LinkedIn',
    resumeFormatLabel: 'PDF',
    backToPortfolio: 'Volver al portafolio',
    viewCaseStudy: 'Ver caso de estudio',
    visitSite: 'Visitar luxurycloud.app',
    roleLabel: 'Rol',
    statusLabel: 'Estado',
    stackLabel: 'Construido con',
  },

  nav: {
    brand: 'Jefferson Rojas',
    primaryLabel: 'Secciones',
    caseNavLabel: 'Secciones del caso de estudio',
    openIndex: 'Abrir el índice de secciones',
    closeIndex: 'Cerrar el índice de secciones',
    items: [
      { id: 'overview', label: 'Inicio' },
      { id: 'projects', label: 'Proyectos' },
      { id: 'process', label: 'Proceso' },
      { id: 'about', label: 'Sobre mí' },
      { id: 'toolkit', label: 'Herramientas' },
      { id: 'contact', label: 'Contacto' },
    ],
    caseItems: [
      { id: 'overview', label: 'Resumen' },
      { id: 'context', label: 'Contexto' },
      { id: 'role', label: 'Mi rol' },
      { id: 'process', label: 'Proceso' },
      { id: 'scope', label: 'Alcance del producto' },
      { id: 'architecture', label: 'Arquitectura' },
      { id: 'challenges', label: 'Retos de ingeniería' },
      { id: 'learned', label: 'Lo que aprendí' },
      { id: 'status', label: 'Estado actual' },
    ],
  },

  hero: {
    title: 'Jefferson Rojas',
    subtitle: 'Ingeniero de Software & Product Builder',
    description:
      'Diseño, desarrollo y opero productos de software confiables, transformando procesos reales de negocio en sistemas mantenibles desde el descubrimiento hasta producción.',
    secondary:
      'Fundador e ingeniero detrás de un SaaS multi-tenant en producción, con experiencia práctica en C#, .NET, SQL Server, Angular, integraciones y operación en la nube.',
    actions: {
      viewWork: 'Ver mis proyectos',
    },
    flow: {
      label: 'Cómo el trabajo llega a producción',
      steps: [
        'Descubrimiento',
        'Requerimientos',
        'Arquitectura',
        'Producto de software',
        'Retroalimentación en producción',
      ],
    },
  },

  process: {
    eyebrow: 'Cómo trabajo',
    title: 'Del problema al producto',
    listLabel: 'Proceso de entrega, cuatro etapas',
    activeStageLabel: 'Etapa actual',
    stages: [
      {
        id: 'discover',
        step: '01',
        name: 'Descubrir',
        description: 'Reunirme con usuarios, comprender sus procesos e identificar restricciones.',
      },
      {
        id: 'design',
        step: '02',
        name: 'Diseñar',
        description:
          'Convertir requerimientos en modelos de datos, arquitectura y flujos de producto.',
      },
      {
        id: 'build',
        step: '03',
        name: 'Construir',
        description: 'Desarrollar, integrar, probar y documentar la solución.',
      },
      {
        id: 'operate',
        step: '04',
        name: 'Operar',
        description:
          'Desplegar, monitorear el comportamiento en producción y mejorar con retroalimentación real.',
      },
    ],
  },

  work: {
    title: 'Proyectos',
    lead: 'Tres productos en etapas distintas, cada uno presentado como lo que realmente es hoy.',
    featured: {
      id: 'luxurycloud',
      name: 'LuxuryCloud',
      status: 'SaaS en producción',
      role: 'Fundador e ingeniero de software',
      description:
        'Un SaaS multi-tenant en producción que ayuda a negocios de belleza y servicios con citas a gestionar clientes, agenda, colaboradores, pagos, inventario, reservas en línea y procesos operativos recurrentes desde una sola plataforma.',
      primaryStack: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server'],
      secondaryStack: [
        'JavaScript',
        'Bootstrap',
        'Linux',
        'Cloudflare',
        'Meta WhatsApp Cloud API',
        'Tilopay',
        'Resend',
        'Webhooks',
        'Background workers',
      ],
      demo: {
        label: 'Ver demostración para clientes - español',
        ariaLabel:
          'Ver la demostración de LuxuryCloud para clientes, grabada en español, en YouTube (se abre en una pestaña nueva)',
      },
    },
    others: [
      {
        id: 'nexopos',
        name: 'NexoPOS',
        status: 'Prototipo de software a la medida',
        description:
          'Una solución centralizada diseñada para administrar tres clínicas veterinarias bajo una misma razón social, con inventarios por sucursal, trazabilidad, facturación, cierres operativos y visibilidad consolidada.',
        stack: ['.NET Web API', 'React', 'TypeScript', 'Clean Architecture'],
      },
      {
        id: 'personalos',
        name: 'PersonalOS',
        status: 'En desarrollo',
        description:
          'Una aplicación personal para planificación, hábitos, aprendizaje y seguimiento del progreso, que además uso para desarrollar experiencia práctica con Angular y arquitectura frontend estructurada.',
        stack: ['Angular', 'TypeScript', '.NET'],
      },
    ],
  },

  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Soy graduado de Ingeniería en Sistemas de la Universidad Fidélitas en Costa Rica. Disfruto comprender cómo trabajan las personas antes de decidir qué construir.',
      'Desarrollar LuxuryCloud me dio experiencia más allá de implementar funcionalidades. He tenido que aclarar requerimientos, tomar decisiones de arquitectura, investigar problemas en producción, comunicarme con usuarios y asumir responsabilidad por el comportamiento de un sistema real.',
      'Trabajo con calma, me comunico de forma clara y presto atención a los detalles que afectan la confiabilidad, la seguridad y la experiencia de usuario. Busco seguir creciendo dentro de un equipo de ingeniería donde importen la calidad, la colaboración y los productos con propósito.',
    ],
    education: {
      label: 'Formación',
      degree: 'Ingeniería en Sistemas',
      institution: 'Universidad Fidélitas, Costa Rica',
      year: '2026',
    },
    languages: {
      label: 'Idiomas',
      items: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'B2, nivel profesional de trabajo' },
      ],
    },
    principles: {
      label: 'Cómo trabajo',
      items: [
        'Comprender antes de construir',
        'Hacer explícitas las decisiones',
        'Probar los caminos importantes',
        'Operar lo que se construye',
        'Seguir aprendiendo',
      ],
    },
  },

  toolkit: {
    title: 'Herramientas de trabajo',
    lead: 'Las tecnologías, herramientas y prácticas que utilizo para diseñar, construir y operar software que debe seguir funcionando.',
    technologiesLabel: 'Tecnologías que utilizo',
    strip: {
      label: 'Tecnologías que utilizo',
    },
    skillsLabel: 'Habilidades y fundamentos',
    skills: [
      {
        id: 'oop',
        title: 'Programación orientada a objetos',
        description: 'Diseño de clases, herencia y encapsulamiento legibles.',
      },
      {
        id: 'di',
        title: 'Inyección de dependencias',
        description: 'Código desacoplado, testeable y fácil de cambiar.',
      },
      {
        id: 'ui',
        title: 'Interfaces responsivas',
        description: 'UI adaptable y accesible en cualquier pantalla.',
      },
      {
        id: 'data',
        title: 'Bases de datos relacionales',
        description: 'Diseño de esquemas, consultas, índices y migraciones.',
      },
      {
        id: 'api',
        title: 'APIs y servicios web',
        description: 'APIs RESTful, integraciones externas y webhooks.',
      },
      {
        id: 'git',
        title: 'Control de versiones con Git',
        description: 'Ramas, pull requests y convenciones de equipo.',
      },
      {
        id: 'devops',
        title: 'Despliegue y DevOps',
        description: 'Linux, Nginx, Cloudflare y releases automatizados.',
      },
      {
        id: 'security',
        title: 'Seguridad y buenas prácticas',
        description: 'Autenticación, autorización y protección de datos.',
      },
      {
        id: 'testing',
        title: 'Pruebas y calidad de código',
        description: 'Unit testing, manejo de errores y SOLID aplicado.',
      },
      {
        id: 'observability',
        title: 'Diagnóstico y monitoreo',
        description: 'Logging, monitoreo en producción y resolución de fallos.',
      },
    ],
    cta: {
      title: 'Siempre aprendiendo, siempre construyendo',
      message:
        'La tecnología avanza y yo también: aprender, compartir y construir cosas que se sostengan.',
      action: 'Ver proyectos',
    },
  },

  contact: {
    title: 'Contacto',
    message:
      'Estoy abierto a oportunidades de ingeniería de software donde pueda contribuir a productos confiables, aprender de equipos experimentados y seguir creciendo mediante retos de ingeniería con propósito.',
    location: 'Ubicado en San José, Costa Rica',
    emailLabel: 'Correo',
    linkedinLabel: 'LinkedIn',
    resumeAction: 'Descargar PDF',
    githubLabel: 'GitHub',
  },

  caseStudies: {
    luxurycloud: {
      name: 'LuxuryCloud',
      tag: 'SaaS multi-tenant en producción',
      role: 'Fundador e ingeniero de software',
      summary:
        'Diseñé, desarrollé y opero una plataforma de software que evolucionó desde una solicitud inicial de gestión de clientes hasta convertirse en un producto multi-tenant para agenda, pagos, comunicaciones y operaciones diarias del negocio.',

      context: {
        title: 'Contexto',
        paragraphs: [
          'El negocio ya sabía cómo operar. Las citas se coordinaban por WhatsApp, los clientes y su historial vivían en hojas de cálculo, los ingresos y gastos se cuadraban aparte, y las reglas que hacían funcionar todo estaban en las personas que hacían el trabajo y se transmitían explicándolas.',
          'Ese esquema funcionaba bien hasta que había que repetirlo. Cada colaborador nuevo significaba enseñar las reglas otra vez. Cada pregunta sobre el mes anterior significaba reconstruir la respuesta a mano. El proceso no estaba mal; simplemente no tenía dónde vivir salvo en las personas y en los archivos.',
          'Lo que llegó a mis manos fue una solicitud para gestionar clientes, además de hojas de cálculo y una serie de conversaciones sobre cómo transcurre realmente el día. Mi trabajo fue sentarme con ese material, seguir los flujos hasta sus límites y decidir qué debía representar el software antes de escribir una línea.',
        ],
      },

      demo: {
        label: 'Demostración para clientes',
        title: 'Cómo presenté el producto a clientes potenciales en Costa Rica',
        description:
          'Este recorrido grabado se compartió como una primera introducción al producto para clientes potenciales. La demostración muestra cómo comuniqué el valor de la plataforma, expliqué sus flujos principales y transformé un sistema operativo complejo en una historia de producto clara.',
        action: 'Ver demostración del producto',
        thumbnailAlt: 'Primer fotograma de la demostración grabada del producto LuxuryCloud.',
      },

      myRole: {
        title: 'Mi rol',
        lead: 'Soy el único ingeniero del producto, así que el trabajo abarca todo el ciclo de vida y no una sola fase.',
        groups: [
          {
            label: 'Definir',
            items: [
              'Descubrimiento de producto',
              'Análisis de requerimientos',
              'Arquitectura',
              'Modelado de datos',
            ],
          },
          {
            label: 'Construir',
            items: [
              'Desarrollo backend',
              'Implementación frontend',
              'Integraciones externas',
              'Pruebas y documentación',
            ],
          },
          {
            label: 'Operar',
            items: [
              'Despliegue',
              'Monitoreo en producción',
              'Investigación de incidentes',
              'Retroalimentación de clientes y mejora continua',
            ],
          },
        ],
      },

      flow: {
        title: 'Del proceso al producto',
        stages: [
          {
            id: 'discover',
            name: 'Descubrir',
            description:
              'Reuniones con las personas que llevan el negocio, lectura de sus hojas de cálculo línea por línea y seguimiento de cómo se conectan realmente las citas, los clientes, los colaboradores, los pagos y el cierre diario.',
          },
          {
            id: 'design',
            name: 'Diseñar',
            description:
              'Convertir esos procesos en entidades y módulos, y luego decidir permisos, reglas de negocio, flujos de producto y dónde termina un tenant y empieza el siguiente.',
          },
          {
            id: 'build',
            name: 'Construir',
            description:
              'Implementar el producto y sus integraciones, validar en los bordes, cubrir con pruebas los caminos que dolerían si fallaran y documentar las decisiones detrás de ellos.',
          },
          {
            id: 'operate',
            name: 'Operar',
            description:
              'Desplegar, leer logs, ejecutar migraciones, vigilar los procesos en segundo plano, investigar incidentes y devolver al producto lo que enseña la producción.',
          },
        ],
      },

      scope: {
        title: 'Alcance del producto',
        groups: [
          {
            label: 'Operación diaria',
            items: [
              'Gestión de clientes',
              'Calendario de citas',
              'Flujos de personal y colaboradores',
              'Inventario',
            ],
          },
          {
            label: 'Dinero',
            items: [
              'Control de ingresos y gastos',
              'Facturación de suscripciones',
              'Reportes mensuales',
            ],
          },
          {
            label: 'Llegar a los clientes',
            items: [
              'Reservas en línea',
              'Páginas públicas del negocio',
              'Confirmaciones y recordatorios por WhatsApp',
              'Correo transaccional',
            ],
          },
          {
            label: 'Mantenerlo funcionando',
            items: ['Monitoreo de la plataforma'],
          },
        ],
      },

      architecture: {
        title: 'Arquitectura',
        lead: 'Una aplicación ASP.NET Core por capas. Lo interesante no es el stack, sino lo que atraviesa todas las capas.',
        diagramLabel: 'Capas de la aplicación, de la petición a la base de datos',
        layers: [
          { id: 'web', name: 'ASP.NET Core MVC', note: 'Peticiones, vistas, model binding' },
          {
            id: 'services',
            name: 'Servicios de aplicación y dominio',
            note: 'Reglas de negocio y orquestación',
          },
          { id: 'data', name: 'Entity Framework Core', note: 'Filtros de consulta, migraciones' },
          {
            id: 'database',
            name: 'SQL Server',
            note: 'Modelo relacional, Row-Level Security',
          },
        ],
        crossCutting: {
          label: 'Atraviesa todas las capas',
          items: [
            'Contexto de tenant',
            'Autorización',
            'Row-Level Security',
            'Información de auditoría',
            'Procesamiento en segundo plano',
            'Integraciones externas',
          ],
        },
      },

      challenges: {
        title: 'Retos de ingeniería',
        problemLabel: 'Problema',
        decisionLabel: 'Decisión',
        verificationLabel: 'Verificación',
        items: [
          {
            id: 'tenant-isolation',
            title: 'Aislamiento entre tenants',
            problem:
              'Una plataforma multi-tenant debe impedir que un negocio alcance los datos de otro, y debe seguir haciéndolo cuando una consulta se escribe con descuido o un servicio olvida filtrar.',
            decision:
              'Llevar el contexto de tenant en los claims y los servicios, filtrar en la capa de aplicación, reforzarlo con autorización y colocar debajo Row-Level Security de SQL Server, para que la base de datos se niegue a entregar las filas equivocadas aunque el código de arriba se equivoque.',
            verification:
              'Pruebas, consultas controladas contra tenants conocidos, revisión de permisos y diagnóstico sobre el comportamiento real en producción.',
          },
          {
            id: 'payments',
            title: 'Procesamiento confiable de pagos',
            problem:
              'Los proveedores de pago reintentan los webhooks, y el evento reintentado no siempre trae todos los identificadores que traía el primero. Tratar cada entrega como un evento nuevo termina cobrando o activando dos veces.',
            decision:
              'Procesar los webhooks de forma idempotente, registrar la transacción del proveedor junto al registro local, escribir auditoría en cada cambio de estado y reconciliar las suscripciones contra el proveedor en lugar de confiar en un solo callback.',
            verification:
              'Reenviar eventos repetidos, revisar los logs resultantes, consultar directamente las tablas de facturación y monitorear el estado de las suscripciones a lo largo del tiempo.',
          },
          {
            id: 'scheduling',
            title: 'Agenda y comunicación',
            problem:
              'Que un recordatorio deba salir depende de la hora local, del estado de la cita, de cómo se configuró el negocio y de lo que permite el proveedor de mensajería. Que cualquiera de esos factores falle envía el mensaje en el momento equivocado, o no lo envía.',
            decision:
              'Configuración por tenant, manejo explícito de zona horaria en lugar de asumir la del servidor, plantillas de mensaje aprobadas, procesos programados para las ventanas de envío y límites de frecuencia que respetan al proveedor.',
            verification:
              'Crear citas en distintas ventanas de tiempo, observar qué mensajes toma el programador y seguir mensajes individuales hasta su estado de entrega.',
          },
          {
            id: 'operations',
            title: 'Operación en producción',
            problem:
              'Una funcionalidad correcta en desarrollo dice muy poco sobre cómo se comporta en producción, en un día de trabajo, cuando un negocio real depende de ella.',
            decision:
              'Logs estructurados, trazas de auditoría, procesos en segundo plano que reportan su propia actividad, migraciones aplicadas de forma deliberada, monitoreo de servicios y un procedimiento de despliegue que es el mismo cada vez.',
            verification:
              'Leer logs, ejecutar consultas de diagnóstico, revisar el comportamiento después de cada despliegue y seguir el uso real en lugar de asumir que el camino ideal se cumplió.',
          },
        ],
      },

      learned: {
        title: 'Lo que aprendí',
        items: [
          'El proceso hay que entenderlo antes de poder modelarlo. La hoja de cálculo no era el requerimiento; era el registro de un requerimiento que nadie había escrito.',
          'Los límites de los datos deben ser explícitos y estar reforzados más de una vez. Un aislamiento que vive solo en el código de aplicación está a un filtro olvidado de no existir.',
          'Una falla que no se puede ver es una falla que no se puede corregir. Los logs y la auditoría son lo que convierte el reporte de un cliente en algo que puedo investigar.',
          'Una integración no siempre sigue su propio flujo documentado. Los reintentos, los campos ausentes y las entregas fuera de orden son justamente las partes que vale la pena diseñar.',
          'Las decisiones las validan las personas que usan el producto, no lo razonables que parecían mientras las tomaba.',
          'Construir algo y operarlo son habilidades distintas, y la segunda cambia la forma en que construyes.',
        ],
      },

      status: {
        title: 'Estado actual',
        value: 'En producción y en mejora continua a partir de retroalimentación operativa.',
      },
    },
  },

  screenshots: {
    pending: 'Captura aún no publicada.',
    zoomLabel: 'Ampliar esta captura',
    dialogLabel: 'Captura ampliada',
    close: 'Cerrar',
    carousel: {
      roleDescription: 'galería de capturas',
      previous: 'Captura anterior',
      next: 'Captura siguiente',
      goTo: 'Ir a la captura {n}',
      position: 'Captura {current} de {total}',
    },
    items: {
      dashboard: {
        alt: 'Dashboard financiero de LuxuryCloud con indicadores de ingresos, egresos y rentabilidad.',
        caption:
          'Ofrece una vista clara de ingresos, egresos, rentabilidad, planilla y métodos de pago para comprender rápidamente la posición financiera del negocio.',
      },
      analytics: {
        alt: 'Gráficos de LuxuryCloud con citas por mes, por semana y por colaborador.',
        caption:
          'Convierte la actividad del negocio en indicadores prácticos para apoyar decisiones operativas e identificar oportunidades de mejora.',
      },
      calendar: {
        alt: 'Calendario mensual de citas junto a la lista de las citas del día actual.',
        caption:
          'Organiza las próximas citas y permite dar seguimiento al estado de cada cliente, incluidas confirmaciones y cancelaciones recibidas por WhatsApp.',
      },
      'calendar-day': {
        alt: 'Vista diaria de la agenda con una columna por colaborador y un botón para cobrar en cada cita.',
        caption:
          'Presenta la operación del día en columnas claras y permite cobrar las citas directamente con los precios de los servicios cargados automáticamente.',
      },
      income: {
        alt: 'Tabla de cobros registrados con cliente, colaborador, servicio, monto y método de pago.',
        caption:
          'Centraliza los cobros realizados y los registros manuales, incluidas las ventas de productos, mientras actualiza el inventario según el stock real.',
      },
      products: {
        alt: 'Catálogo de productos con precios, niveles de stock y contadores de bajo stock.',
        caption:
          'Permite consultar desde cualquier lugar la disponibilidad de productos y los niveles actuales de inventario.',
      },
      staff: {
        alt: 'Tabla de colaboradores con su puesto, sus porcentajes de comisión y su estado de acceso.',
        caption:
          'Centraliza la información de los colaboradores y permite configurar comisiones y modalidades de trabajo, como empleado o alquiler de silla.',
      },
      payroll: {
        alt: 'Tarjetas de planilla por colaborador con producción, comisión y total a pagar.',
        caption:
          'Calcula automáticamente los pagos de los colaboradores a partir de los servicios realizados, las reglas de comisión y la modalidad configurada.',
      },
      'public-site-editor': {
        alt: 'Editor de la página pública con los espacios para subir logo, portada e imágenes de galería.',
        caption:
          'Permite personalizar la página pública con imágenes y contenido, conectando las reservas en línea con la agenda y el flujo de aprobación por WhatsApp.',
      },
      'public-site': {
        alt: 'Página pública de un negocio con su marca y un botón para reservar.',
        caption:
          'Muestra la experiencia que recibe el cliente para conocer el negocio, consultar sus servicios e iniciar una reserva en línea.',
      },

      overview: {
        alt: 'Resumen de NexoPOS con indicadores de ventas, tiquetes y stock, y una tarjeta por sucursal veterinaria.',
        caption:
          'Consolida los principales indicadores operativos de la empresa para tomar decisiones con mayor rapidez y operar con precisión.',
      },
      branches: {
        alt: 'Vista de sucursales de NexoPOS con el estado y el inventario de cada sede veterinaria.',
        caption:
          'Ofrece una vista detallada de cada sucursal, incluido su estado operativo y la posición individual de su inventario.',
      },
      inventory: {
        alt: 'Inventario combinado de NexoPOS con la cantidad y la ubicación de cada artículo.',
        caption:
          'Combina el inventario de todas las sucursales en una sola vista, conservando la visibilidad sobre la ubicación de cada unidad.',
      },
      services: {
        alt: 'Catálogo de servicios y paquetes de NexoPOS.',
        caption:
          'Organiza el catálogo de servicios para que el personal pueda localizarlos, seleccionarlos y aplicarlos con mayor rapidez durante la operación diaria.',
      },
      'mobile-kits': {
        alt: 'Botiquín móvil de NexoPOS con las unidades transferidas desde el inventario general.',
        caption:
          'Permite transferir unidades de inventario a kits utilizados por los veterinarios en consultas a domicilio, manteniendo su trazabilidad fuera de la sucursal.',
      },
      billing: {
        alt: 'Lista de facturación de NexoPOS con los comprobantes recientes, su sucursal, tipo y total.',
        caption:
          'Facilita la emisión de facturas y centraliza la información comercial necesaria para completar y dar seguimiento a cada transacción.',
      },
      restocking: {
        alt: 'Vista de reposición de NexoPOS con los artículos por reponer y sus cantidades sugeridas.',
        caption:
          'Simplifica la reposición al identificar las unidades necesarias y organizar el proceso para devolver el inventario a los niveles esperados.',
      },
    },
  },

  videoDemo: {
    play: 'Reproducir el video: {title}',
    close: 'Cerrar',
  },

  footer: {
    role: 'Ingeniero de software · Product Builder · Costa Rica',
    navLabel: 'Pie de página',
  },
};
