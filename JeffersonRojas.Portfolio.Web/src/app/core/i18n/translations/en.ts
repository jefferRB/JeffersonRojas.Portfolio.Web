import { Translations } from './translations.model';

/** Primary locale. */
export const EN_TRANSLATIONS: Translations = {
  meta: {
    home: {
      title: 'Jefferson Rojas - Software Engineer & Product Builder',
      description:
        'I turn real operational challenges into reliable software products, working across product discovery, architecture, development and production operations.',
    },
    luxurycloud: {
      title: 'LuxuryCloud case study - Jefferson Rojas',
      description:
        'How a request to manage customers grew into a production multi-tenant SaaS: the discovery, the data model, the tenant isolation, the integrations and the day-to-day operations behind it.',
    },
  },

  a11y: {
    skipToContent: 'Skip to main content',
    languageGroupLabel: 'Language',
    languageChanged: 'Language changed to English.',
    localeNames: {
      en: 'English',
      es: 'Spanish',
    },
    themeControlLabel: 'Theme control',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    opensInNewTab: 'opens in a new tab',
  },

  common: {
    downloadResume: 'Download résumé',
    linkedin: 'LinkedIn',
    resumeFormatLabel: 'PDF',
    backToPortfolio: 'Back to portfolio',
    viewCaseStudy: 'View case study',
    visitSite: 'Visit luxurycloud.app',
    roleLabel: 'Role',
    statusLabel: 'Status',
    stackLabel: 'Built with',
  },

  nav: {
    brand: 'Jefferson Rojas',
    primaryLabel: 'Sections',
    caseNavLabel: 'Case study sections',
    openIndex: 'Open the section index',
    closeIndex: 'Close the section index',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'projects', label: 'Projects' },
      { id: 'process', label: 'Process' },
      { id: 'about', label: 'About' },
      { id: 'toolkit', label: 'Toolkit' },
      { id: 'contact', label: 'Contact' },
    ],
    caseItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'context', label: 'Context' },
      { id: 'role', label: 'My role' },
      { id: 'process', label: 'Process' },
      { id: 'scope', label: 'Product scope' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'challenges', label: 'Engineering challenges' },
      { id: 'learned', label: 'What I learned' },
      { id: 'status', label: 'Current status' },
    ],
  },

  hero: {
    title: 'Jefferson Rojas',
    subtitle: 'Software Engineer & Product Builder',
    description:
      'I design, build and operate reliable software products, transforming real business workflows into maintainable systems from discovery through production.',
    secondary:
      'Founder and engineer behind a production multi-tenant SaaS, with hands-on experience in C#, .NET, SQL Server, Angular, integrations and cloud operations.',
    actions: {
      viewWork: 'View my work',
    },
    flow: {
      label: 'How work reaches production',
      steps: [
        'Discovery',
        'Requirements',
        'Architecture',
        'Software product',
        'Production feedback',
      ],
    },
  },

  process: {
    eyebrow: 'How I work',
    title: 'From problem to product',
    listLabel: 'Delivery process, four stages',
    activeStageLabel: 'Current stage',
    stages: [
      {
        id: 'discover',
        step: '01',
        name: 'Discover',
        description: 'Meet with users, understand workflows and identify constraints.',
      },
      {
        id: 'design',
        step: '02',
        name: 'Design',
        description: 'Translate requirements into data models, architecture and product flows.',
      },
      {
        id: 'build',
        step: '03',
        name: 'Build',
        description: 'Develop, integrate, test and document the solution.',
      },
      {
        id: 'operate',
        step: '04',
        name: 'Operate',
        description: 'Deploy, monitor production behavior and improve from real feedback.',
      },
    ],
  },

  work: {
    title: 'Projects',
    lead: 'Three products at different stages, each listed as what it actually is today.',
    featured: {
      id: 'luxurycloud',
      name: 'LuxuryCloud',
      status: 'Production SaaS',
      role: 'Founder & Software Engineer',
      description:
        'A production multi-tenant SaaS that helps beauty and appointment-based businesses manage clients, scheduling, staff, payments, inventory, online booking and recurring operational workflows from one platform.',
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
        status: 'Custom software prototype',
        description:
          'A centralized solution designed to run three veterinary clinics under one company, with per-branch inventory, traceability, billing, operational closings and consolidated visibility.',
        stack: ['.NET Web API', 'React', 'TypeScript', 'Clean Architecture'],
      },
      {
        id: 'personalos',
        name: 'PersonalOS',
        status: 'In development',
        description:
          'A personal application for planning, habits, learning and progress tracking, also used to build hands-on experience with Angular and structured frontend architecture.',
        stack: ['Angular', 'TypeScript', '.NET'],
      },
    ],
  },

  about: {
    title: 'About',
    paragraphs: [
      'I am a Systems Engineering graduate from Universidad Fidélitas in Costa Rica. I enjoy understanding how people work before deciding what to build.',
      'Building LuxuryCloud gave me experience beyond implementing features. I have had to clarify requirements, make architectural decisions, investigate production issues, communicate with users and take responsibility for the behavior of a real system.',
      'I work calmly, communicate clearly and pay close attention to details that affect reliability, security and user experience. I am looking to grow within an engineering team where quality, collaboration and meaningful products matter.',
    ],
    education: {
      label: 'Education',
      degree: 'Systems Engineering',
      institution: 'Universidad Fidélitas, Costa Rica',
      year: '2026',
    },
    languages: {
      label: 'Languages',
      items: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'B2, professional working proficiency' },
      ],
    },
    principles: {
      label: 'How I work',
      items: [
        'Understand before building',
        'Make decisions explicit',
        'Test the important paths',
        'Operate what you create',
        'Keep learning',
      ],
    },
  },

  toolkit: {
    title: 'Engineering toolkit',
    lead: 'The technologies, tools and practices I use to design, build and run software that has to keep working.',
    technologiesLabel: 'Technologies I work with',
    strip: {
      label: 'Technologies I work with',
    },
    skillsLabel: 'Skills and fundamentals',
    skills: [
      {
        id: 'oop',
        title: 'Object-oriented programming',
        description: 'Class design, inheritance and encapsulation that stay readable.',
      },
      {
        id: 'di',
        title: 'Dependency injection',
        description: 'Decoupled code that is testable and cheap to change.',
      },
      {
        id: 'ui',
        title: 'Responsive interfaces',
        description: 'Adaptable, accessible UI across every screen size.',
      },
      {
        id: 'data',
        title: 'Relational databases',
        description: 'Schema design, tuned queries, indexes and migrations.',
      },
      {
        id: 'api',
        title: 'APIs and web services',
        description: 'RESTful APIs, third-party integrations and webhooks.',
      },
      {
        id: 'git',
        title: 'Version control with Git',
        description: 'Branching, pull requests and team conventions.',
      },
      {
        id: 'devops',
        title: 'Deployment and DevOps',
        description: 'Linux, Nginx, Cloudflare and scripted releases.',
      },
      {
        id: 'security',
        title: 'Security practices',
        description: 'Authentication, authorization and data protection.',
      },
      {
        id: 'testing',
        title: 'Testing and code quality',
        description: 'Unit tests, error handling and SOLID in practice.',
      },
      {
        id: 'observability',
        title: 'Diagnostics and monitoring',
        description: 'Logging, production monitoring and incident triage.',
      },
    ],
    cta: {
      title: 'Always learning, always building',
      message:
        'Technology keeps moving and so do I: learning in the open and shipping work that holds up.',
      action: 'View projects',
    },
  },

  contact: {
    title: 'Contact',
    message:
      'I’m open to software engineering opportunities where I can contribute to reliable products, learn from experienced teams and continue growing through meaningful engineering challenges.',
    location: 'Based in San José, Costa Rica',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    resumeAction: 'Download PDF',
    githubLabel: 'GitHub',
  },

  caseStudies: {
    luxurycloud: {
      name: 'LuxuryCloud',
      tag: 'Production multi-tenant SaaS',
      role: 'Founder & Software Engineer',
      summary:
        'I designed, built and operate a software platform that grew from an initial customer-management request into a multi-tenant product supporting scheduling, payments, communications and day-to-day business operations.',

      context: {
        title: 'Context',
        paragraphs: [
          'The business already knew how to run itself. Appointments were agreed over WhatsApp, clients and their history lived in spreadsheets, income and expenses were reconciled separately, and the rules that made everything work were held by the people doing the work and passed on by explaining them.',
          'That setup was effective until it had to be repeated. Every new collaborator meant teaching the rules again. Every question about last month meant rebuilding the answer by hand. Nothing was wrong with the process; it simply had no place to live other than in people and in files.',
          'What reached me was a request to manage customers, plus spreadsheets, plus a series of conversations about how the day actually goes. My job was to sit with that material, follow the workflows to their edges, and decide what the software had to represent before writing any of it.',
        ],
      },

      myRole: {
        title: 'My role',
        lead: 'I am the only engineer on the product, so the work spans the whole lifecycle rather than a single phase.',
        groups: [
          {
            label: 'Shaping',
            items: ['Product discovery', 'Requirements analysis', 'Architecture', 'Data modeling'],
          },
          {
            label: 'Building',
            items: [
              'Backend development',
              'Frontend implementation',
              'External integrations',
              'Testing and documentation',
            ],
          },
          {
            label: 'Running',
            items: [
              'Deployment',
              'Production monitoring',
              'Incident investigation',
              'Customer feedback and continuous improvement',
            ],
          },
        ],
      },

      flow: {
        title: 'From workflow to product',
        stages: [
          {
            id: 'discover',
            name: 'Discover',
            description:
              'Meetings with the people running the business, reading their spreadsheets line by line, and following how appointments, clients, collaborators, payments and the daily close actually connect.',
          },
          {
            id: 'design',
            name: 'Design',
            description:
              'Turning those workflows into entities and modules, then deciding permissions, business rules, product flows and where one tenant ends and the next begins.',
          },
          {
            id: 'build',
            name: 'Build',
            description:
              'Implementing the product and its integrations, adding validation at the boundaries, covering the paths that would hurt if they broke, and documenting the decisions behind them.',
          },
          {
            id: 'operate',
            name: 'Operate',
            description:
              'Deploying, reading logs, running migrations, watching background workers, investigating incidents and folding what production teaches back into the product.',
          },
        ],
      },

      scope: {
        title: 'Product scope',
        groups: [
          {
            label: 'Daily operation',
            items: [
              'Client management',
              'Appointment calendar',
              'Staff and collaborator workflows',
              'Inventory',
            ],
          },
          {
            label: 'Money',
            items: ['Income and expense tracking', 'Subscription billing', 'Monthly reporting'],
          },
          {
            label: 'Reaching customers',
            items: [
              'Online booking',
              'Public business pages',
              'WhatsApp confirmations and reminders',
              'Transactional email',
            ],
          },
          {
            label: 'Keeping it running',
            items: ['Platform monitoring'],
          },
        ],
      },

      architecture: {
        title: 'Architecture',
        lead: 'A layered ASP.NET Core application. The interesting part is not the stack, it is what cuts across every layer.',
        diagramLabel: 'Application layers, from request to database',
        layers: [
          { id: 'web', name: 'ASP.NET Core MVC', note: 'Requests, views, model binding' },
          {
            id: 'services',
            name: 'Application and domain services',
            note: 'Business rules and orchestration',
          },
          { id: 'data', name: 'Entity Framework Core', note: 'Query filters, migrations' },
          { id: 'database', name: 'SQL Server', note: 'Relational model, Row-Level Security' },
        ],
        crossCutting: {
          label: 'Cuts across every layer',
          items: [
            'Tenant context',
            'Authorization',
            'Row-Level Security',
            'Audit information',
            'Background processing',
            'External integrations',
          ],
        },
      },

      challenges: {
        title: 'Engineering challenges',
        problemLabel: 'Problem',
        decisionLabel: 'Decision',
        verificationLabel: 'Verification',
        items: [
          {
            id: 'tenant-isolation',
            title: 'Tenant isolation',
            problem:
              'A multi-tenant platform has to keep one business from reaching another business data, and it has to keep doing that when a query is written carelessly or a service forgets to filter.',
            decision:
              'Carry tenant context through claims and services, filter at the application layer, enforce it again through authorization, and put SQL Server Row-Level Security underneath so the database refuses to serve the wrong rows even if the code above it is wrong.',
            verification:
              'Tests, controlled queries against known tenants, permission reviews, and diagnostics against production behavior.',
          },
          {
            id: 'payments',
            title: 'Reliable payment processing',
            problem:
              'Payment providers retry webhooks, and the retried event does not always carry every identifier the first one did. Treating each delivery as a fresh event double-charges or double-activates.',
            decision:
              'Process webhooks idempotently, track the provider transaction alongside the local record, write audit entries for every state change, and reconcile subscriptions against the provider rather than trusting a single callback.',
            verification:
              'Replaying repeated events, reading through the resulting logs, querying the billing tables directly, and monitoring subscription state over time.',
          },
          {
            id: 'scheduling',
            title: 'Scheduling and communication',
            problem:
              'Whether a reminder should go out depends on local time, the state of the appointment, how the business has configured itself, and what the messaging provider allows. Any one of those being wrong sends a message at the wrong moment, or not at all.',
            decision:
              'Per-tenant configuration, explicit time zone handling rather than server-local assumptions, approved message templates, scheduled processes for the send windows, and rate limits that respect the provider.',
            verification:
              'Creating appointments across time windows, watching which messages the scheduler picks up, and following individual messages through to their delivery state.',
          },
          {
            id: 'operations',
            title: 'Production operations',
            problem:
              'A feature that is correct in development says very little about how it behaves in production, on a working day, when a real business depends on it.',
            decision:
              'Structured logging, audit trails, background workers that report their own activity, migrations applied deliberately, service monitoring, and a deployment procedure that is the same every time.',
            verification:
              'Reading logs, running diagnostic queries, checking behavior after each deploy, and following real usage rather than assuming the happy path held.',
          },
        ],
      },

      learned: {
        title: 'What I learned',
        items: [
          'The process has to be understood before it can be modeled. The spreadsheet was not the requirement; it was a record of a requirement nobody had written down.',
          'Data boundaries should be explicit and enforced more than once. Isolation that lives only in application code is one forgotten filter away from not existing.',
          'A failure you cannot see is a failure you cannot fix. Logs and audit trails are what turn a customer report into something I can actually investigate.',
          'An integration will not always follow its own documented flow. The retries, the missing fields and the out-of-order deliveries are the parts worth designing for.',
          'Decisions get validated by the people using the product, not by how reasonable they looked while I was making them.',
          'Building something and running it are different skills, and the second one changes how you build.',
        ],
      },

      status: {
        title: 'Current status',
        value: 'In production and continuously improved from operational feedback.',
      },
    },
  },

  screenshots: {
    pending: 'Screenshot not published yet.',
    zoomLabel: 'Enlarge this screenshot',
    dialogLabel: 'Enlarged screenshot',
    close: 'Close',
    carousel: {
      roleDescription: 'screenshot gallery',
      previous: 'Previous screenshot',
      next: 'Next screenshot',
      goTo: 'Go to screenshot {n}',
      position: 'Screenshot {current} of {total}',
    },
    items: {
      dashboard: {
        alt: 'LuxuryCloud financial dashboard with income, expense and profitability indicators.',
        caption:
          'Provides a clear view of income, expenses, profitability, payroll and payment methods, helping owners understand the financial position of the business at a glance.',
      },
      analytics: {
        alt: 'LuxuryCloud charts of appointments per month, per week and per collaborator.',
        caption:
          'Turns business activity into practical indicators that support operational decisions and reveal opportunities for improvement.',
      },
      calendar: {
        alt: 'Monthly appointment calendar beside the list of the current day’s appointments.',
        caption:
          'Organizes upcoming appointments and tracks each client’s status, including confirmations and cancellations received through WhatsApp.',
      },
      'calendar-day': {
        alt: 'Day view of the agenda with one column per collaborator and a charge button on each appointment.',
        caption:
          'Presents the day in clear operational columns and allows appointments to be charged directly using automatically loaded service prices.',
      },
      income: {
        alt: 'Table of recorded charges with client, collaborator, service, amount and payment method.',
        caption:
          'Centralizes completed charges and manual payments, including product sales, while updating inventory to reflect actual stock.',
      },
      products: {
        alt: 'Product catalogue with prices, stock levels and low-stock counters.',
        caption:
          'Provides an up-to-date view of product availability and stock levels from anywhere.',
      },
      staff: {
        alt: 'Staff table with each collaborator’s role, commission percentages and access state.',
        caption:
          'Centralizes collaborator information and configures commissions and work models, including employees and chair-rental arrangements.',
      },
      payroll: {
        alt: 'Payroll cards per collaborator with production, commission and total to pay.',
        caption:
          'Automatically calculates collaborator payments from completed services, commission rules and the working arrangement configured for each person.',
      },
      'public-site-editor': {
        alt: 'Public page editor with upload slots for the logo, cover and gallery images.',
        caption:
          'Lets each business customize its public page with images and content, while connecting online booking directly to the calendar and WhatsApp approval workflow.',
      },
      'public-site': {
        alt: 'Public page of a business with its branding and a booking button.',
        caption:
          'Shows the customer-facing experience where visitors can explore the business, review its services and start an online booking.',
      },

      overview: {
        alt: 'NexoPOS overview with sales, tickets and stock indicators, and a card per veterinary branch.',
        caption:
          'Consolidates the company’s main operational indicators so management can make faster decisions and operate with greater precision.',
      },
      branches: {
        alt: 'NexoPOS branch view with the status and inventory of each veterinary location.',
        caption:
          'Provides a detailed view of each branch, including its operational status and individual inventory position.',
      },
      inventory: {
        alt: 'NexoPOS combined inventory listing each item with its quantity and location.',
        caption:
          'Combines inventory information from every branch into a single view while preserving visibility into where each unit is located.',
      },
      services: {
        alt: 'NexoPOS catalogue of services and packages.',
        caption:
          'Creates a structured service catalog that allows staff to locate, select and apply services more efficiently during daily operations.',
      },
      'mobile-kits': {
        alt: 'NexoPOS mobile kit with the units transferred out of general inventory.',
        caption:
          'Transfers inventory units into mobile kits used by veterinarians during home visits, preserving traceability outside the branch.',
      },
      billing: {
        alt: 'NexoPOS billing list with recent receipts, their branch, type and total.',
        caption:
          'Supports invoice creation and centralizes the commercial information required to complete and track each transaction.',
      },
      restocking: {
        alt: 'NexoPOS restocking view with the items to replenish and their suggested quantities.',
        caption:
          'Simplifies inventory replenishment by identifying required units and organizing the process of bringing stock back to expected levels.',
      },
    },
  },

  footer: {
    role: 'Software Engineer · Product Builder · Costa Rica',
    navLabel: 'Footer',
  },
};
