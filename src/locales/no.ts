// locales/no.ts
export default {
    hello: 'Hallo',
    'hello.world': 'Hallo verden!',
    welcome: 'Hallo {name}!',

    // Hero section
    'hero.intro':
        'Hei, jeg heter Conrad. Jeg liker å bygge ting som folk liker å bruke! Jeg har programmert i over 6 år, og studerer for tiden en bachelor i datateknologi ved NTNU. Utenfor programmering liker jeg å stå på ski, spille spill og å jobbe i linjeforeningen.',

    // Navigation
    'nav.home': 'Hjem',
    'nav.blog': 'Blogg',

    // Section titles
    'sections.experience': 'Erfaring',
    'sections.education': 'Utdanning',
    'sections.projects': 'Utvalgte prosjekter',
    'sections.skills': 'Ferdigheter',
    'sections.contact': 'Kontakt',

    // Experience
    'experience.tihlde.role': 'Utvikler',
    'experience.tihlde.org': 'TIHLDE',
    'experience.tihlde.location': 'Trondheim',
    'experience.tihlde.period': 'September 2023 - nåværende',
    'experience.tihlde.highlight1':
        'Jobber som fullstack-utvikler for min linjeforening',
    'experience.tihlde.highlight2':
        'Utviklet en frittstående bookingløsning med et lite team',
    'experience.tihlde.highlight3':
        'Vedlikeholder kjerneinfrastruktur og legacy-systemer',
    'experience.tihlde.highlight4': 'Utvikler ny backend-løsningsarkitektur',

    // Education
    'education.ntnu.degree': 'Bachelor i datateknologi',
    'education.ntnu.school':
        'NTNU - Norges teknisk-naturvitenskapelige universitet',
    'education.ntnu.period': '2023 - 2026',
    'education.ntnu.details':
        'Fokus på programvareutvikling, algoritmer og maskinlæring.',

    // Projects
    'projects.photon.title': 'Photon',
    'projects.photon.description':
        'TIHLDEs nye backend-løsning. Et Hono REST API som bruker postgres, redis, drizzle og typescript.',
    'projects.coursestats.title': 'CourseStats',
    'projects.coursestats.description':
        'Emnestatistikk for norske universiteter. En NextJS fullstack-applikasjon som bruker sqlite, drizzle og typescript. Bruker offentlig tilgjengelige data fra HKDIR DBH API.',
    'projects.kontres.title': 'KontRes',
    'projects.kontres.description':
        'TIHLDEs bookingløsning. En NextJS tRPC fullstack-applikasjon som bruker postgres, prisma og typescript. Auth-løsningen er tett integrert med vår backend, LEPTON.',
    'projects.kvark.title': 'Kvark / Lepton',
    'projects.kvark.description':
        'TIHLDEs frontend / backend-løsning. En React SPA frontend som bruker Tanstack router og query. Og en Django python backend.',
    'projects.links.website': 'Nettside',
    'projects.links.github': 'GitHub',

    // Skills categories
    'skills.languages': 'Språk',
    'skills.libraries': 'Biblioteker',
    'skills.frameworks': 'Rammeverk',
    'skills.databases': 'Databaser',
    'skills.tools': 'Verktøy',

    // Contact
    'contact.description': 'Vil du samarbeide eller bare si hei? Ta kontakt:',

    // Footer
    'footer.copyright': '© {year} Conrad Osvik',
    'footer.projects': 'Prosjekter',
    'footer.contact': 'Kontakt'
} as const
