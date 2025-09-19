// locales/en.ts
export default {
    hello: 'Hello',
    'hello.world': 'Hello world!',
    welcome: 'Hello {name}!',

    // Hero section
    'hero.intro':
        "Hey, I'm Conrad. I like to build things that people enjoy using! I've been programming for over 6 years, and I'm currently studying a B.Sc in Computer Science at NTNU. Outside of coding, I enjoy skiing, gaming, and working with my student association.",

    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Section titles
    'sections.experience': 'Experience',
    'sections.education': 'Education',
    'sections.projects': 'Featured projects',
    'sections.skills': 'Skills',
    'sections.contact': 'Contact',

    // Experience
    'experience.tihlde.role': 'Software Developer',
    'experience.tihlde.org': 'TIHLDE',
    'experience.tihlde.location': 'Trondheim',
    'experience.tihlde.period': 'September 2023 - Present',
    'experience.tihlde.highlight1':
        'Working as a fullstack developer for my student organization',
    'experience.tihlde.highlight2':
        'Developed a standalone item booking solution with a small team',
    'experience.tihlde.highlight3':
        'Maintaining core infrastructure and legacy systems',
    'experience.tihlde.highlight4':
        'Developing a new backend solution architecture',

    // Education
    'education.ntnu.degree': 'B.Sc. in Computer Science',
    'education.ntnu.school':
        'NTNU - Norwegian University of Science and Technology',
    'education.ntnu.period': '2023 - 2026',
    'education.ntnu.details':
        'Focus on software engineering, algorithms, and human‑computer interaction.',

    // Projects
    'projects.photon.title': 'Photon',
    'projects.photon.description':
        "TIHLDE's new backend solution. A Hono REST API utilizing postgres, redis, drizzle, and typescript.",
    'projects.coursestats.title': 'CourseStats',
    'projects.coursestats.description':
        'Course statistics for norwegian universities. A NextJS fullstack application using sqlite, drizzle, and typescript. Uses publicly available data from the HKDIR DBH api.',
    'projects.kontres.title': 'KontRes',
    'projects.kontres.description':
        "TIHLDE's booking solution. A NextJS tRPC fullstack application using postgres, prisma, and typescript. The auth solution is tightly integrated with our backend, LEPTON.",
    'projects.kvark.title': 'Kvark / Lepton',
    'projects.kvark.description':
        "TIHLDE's frontend / backend solution. A React SPA frontend utilizing Tanstack router and query. And a Django python backend.",
    'projects.links.website': 'Website',
    'projects.links.github': 'GitHub',

    // Skills categories
    'skills.languages': 'Languages',
    'skills.libraries': 'Libraries',
    'skills.frameworks': 'Frameworks',
    'skills.databases': 'Databases',
    'skills.tools': 'Tools',

    // Contact
    'contact.description': 'Want to collaborate or just say hi? Reach out:',

    // Footer
    'footer.copyright': '© {year} Conrad Osvik'
} as const
