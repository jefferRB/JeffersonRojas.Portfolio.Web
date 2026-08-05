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
      contact: 'Contactarme',
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
      'Estoy abierto a oportunidades de ingeniería de software donde pueda contribuir, aprender de un equipo experimentado y ayudar a construir productos confiables.',
    emailLabel: 'Correo',
    linkedinLabel: 'LinkedIn',
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
        alt: 'Dashboard financiero: ingresos, egresos y ganancia del mes, además del desglose de ingresos por método de pago y el gráfico de ganancias mensuales.',
        caption:
          'Para que el usuario esté consciente siempre del estado financiero en el que está.',
      },
      analytics: {
        alt: 'Dashboard de información con gráficos de citas por mes, por semana y por funcionario, junto a los servicios más solicitados.',
        caption: 'Para tomar decisiones operativas sobre cómo optimizar y mejorar el negocio.',
      },
      calendar: {
        alt: 'Calendario mensual de citas con la cantidad de citas de cada día, junto a un panel que lista el día actual con el estado de confirmación de cada cita.',
        caption:
          'Para ver cómo se va a operar el día y llevar seguimiento de cada cliente, incluyendo si está confirmado o si cancela por WhatsApp.',
      },
      'calendar-day': {
        alt: 'Vista diaria del calendario ordenada en una columna por colaborador, con cada cita mostrando su hora, su cliente y su servicio, y un botón para cobrar.',
        caption:
          'Vista de la agenda acomodada estratégicamente para facilitar el uso, mostrando la operación en columnas y permitiendo cobrar las citas desde ahí con precios cargados automáticamente.',
      },
      income: {
        alt: 'Módulo de ingresos que lista cada cobro con su fecha, cliente, funcionario, servicio, monto y método de pago, sobre totales separados en neto e impuestos.',
        caption:
          'Para llevar el control de los cobros realizados, registrar cobros manualmente, incluir venta de productos y mantener el stock alineado con el conteo real.',
      },
      products: {
        alt: 'Catálogo de productos con el precio, el stock y el estado de cada artículo, sobre los contadores de productos totales, bajo stock y valor del inventario.',
        caption: 'Para estar al tanto del stock desde cualquier parte.',
      },
      staff: {
        alt: 'Tabla de funcionarios con el puesto de cada colaborador, su porcentaje de ganancia, su porcentaje de producto, la fecha de ingreso y su estado de acceso.',
        caption:
          'Se administra toda la información de los colaboradores y se configuran porcentajes y modos de trabajo, como empleado o alquiler de silla.',
      },
      payroll: {
        alt: 'Desglose de planilla por colaborador con producción, IVA incluido, monto del colaborador, total a pagar y saldo pendiente, con el cálculo escrito debajo.',
        caption:
          'La plataforma genera automáticamente los pagos correspondientes de los colaboradores según la configuración y la operación registrada.',
      },
      'public-site-editor': {
        alt: 'Editor de la página pública con los espacios para subir logo, portada e imagen de ubicación, la galería del negocio y el almacenamiento utilizado.',
        caption:
          'Cada usuario puede tener su propia página pública agregando imágenes y textos. Está diseñada para que solo necesite cargar contenido y permita reservas en línea conectadas a la agenda, notificando por WhatsApp la aprobación.',
      },
      'public-site': {
        alt: 'Página pública de un negocio, con su propia marca, un botón para reservar, un enlace a servicios y accesos de contacto.',
        caption: 'Así se ve la página pública de cada tenant desde la vista de los usuarios.',
      },

      overview: {
        alt: 'Resumen general de NexoPOS: ventas, tiquetes, productos con stock bajo, reposición sugerida y saldos consolidados, sobre una tarjeta por sucursal veterinaria.',
        caption:
          'Resumen general de la empresa para tomar decisiones rápidamente y operar con precisión.',
      },
      branches: {
        alt: 'Vista de sucursales que lista cada sede veterinaria con su estado, sus existencias y los recursos asignados.',
        caption: 'Permite ver detalladamente el estado y el inventario de cada sucursal.',
      },
      inventory: {
        alt: 'Inventario combinado de todas las sucursales, con la cantidad y el estado de cada artículo.',
        caption: 'Muestra el inventario general combinado de todas las sucursales.',
      },
      services: {
        alt: 'Catálogo de servicios y paquetes, con cada entrada lista para llamarse durante una consulta.',
        caption: 'Permite operar más rápido llamando y gestionando los servicios.',
      },
      'mobile-kits': {
        alt: 'Vista de botiquines móviles con las unidades transferidas del inventario general al kit que el veterinario lleva a domicilio.',
        caption:
          'Permite transferir unidades del inventario general a un kit móvil que los veterinarios llevan a consultas a domicilio.',
      },
      billing: {
        alt: 'Vista de facturación que lista los comprobantes recientes con su sucursal, cliente, emisor, tipo, método de pago, total y estado de aceptación.',
        caption: 'Permite emitir las facturas y llevar el control de la operación comercial.',
      },
      restocking: {
        alt: 'Vista de reposición con los artículos por reponer y las cantidades sugeridas según el consumo.',
        caption: 'Permite poner el inventario al día de forma más fácil y ordenada.',
      },
    },
  },

  footer: {
    role: 'Ingeniero de software · Product Builder · Costa Rica',
    navLabel: 'Pie de página',
  },
};
