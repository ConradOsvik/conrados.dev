import SkillBadge from '~/components/SkillBadge'
import {
    TypeScript,
    React,
    Next,
    Python,
    PostgreSQL,
    SQLite,
    Redis,
    Hono,
    Drizzle,
    Prisma,
    TRPC,
    Django
} from '~/components/devicons'

const projects = [
    {
        title: 'Photon',
        description:
            "TIHLDE's new backend solution. A Hono REST API utilizing postgres, redis, drizzle, and typescript.",
        stack: ['TypeScript', 'Hono', 'PostgreSQL', 'Redis', 'Drizzle'],
        links: { github: 'https://github.com/TIHLDE/Photon' }
    },
    {
        title: 'CourseStats',
        description:
            'Course statistics for norwegian universities. A NextJS fullstack application using sqlite, drizzle, and typescript. Uses publicly available data from the HKDIR DBH api.',
        stack: ['Next.js', 'SQLite', 'Drizzle', 'TypeScript'],
        links: {
            github: 'https://github.com/ConradOsvik/coursestats',
            website: 'https://cs.conrados.dev'
        }
    },
    {
        title: 'KontRes',
        description:
            "TIHLDE's booking solution. A NextJS tRPC fullstack application using postgres, prisma, and typescript. The auth solution is tightly integrated with our backend, LEPTON.",
        stack: ['Next.js', 'tRPC', 'PostgreSQL', 'Prisma', 'TypeScript'],
        links: { github: 'https://github.com/TIHLDE/kontresv2' }
    },
    {
        title: 'Kvark / Lepton',
        description:
            "TIHLDE's frontend / backend solution. A React SPA frontend utilizing Tanstack router and query. And a Django python backend.",
        stack: ['React', 'Django', 'Python', 'TanStack Query', 'TanStack Router'],
        links: { github: 'https://github.com/TIHLDE/Kvark' }
    }
]

function getIcon(tech: string) {
    switch (tech) {
        case 'TypeScript': return <TypeScript />
        case 'React': return <React />
        case 'Next.js': return <Next />
        case 'Python': return <Python />
        case 'Django': return <Django />
        case 'PostgreSQL': return <PostgreSQL />
        case 'SQLite': return <SQLite />
        case 'Redis': return <Redis />
        case 'Hono': return <Hono />
        case 'Drizzle': return <Drizzle />
        case 'Prisma': return <Prisma />
        case 'tRPC': return <TRPC />
        case 'TanStack Query':
        case 'TanStack Router': return <React />
        default: return undefined
    }
}

export default function Projects() {
    return (
        <section id="projects" className="flex flex-col gap-4">
            <h2 className="section-title">Featured projects</h2>
            <div className="space-y-3">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="bg-card text-card-foreground rounded-xl ring-1 ring-foreground/10 shadow-xs overflow-hidden"
                    >
                        <div className="px-5 pt-5 pb-4">
                            <p className="font-semibold text-sm leading-snug">
                                {project.title}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {project.stack.map((tech) => (
                                    <SkillBadge
                                        key={tech}
                                        label={tech}
                                        icon={getIcon(tech)}
                                    />
                                ))}
                            </div>
                            {(project.links?.website || project.links?.github) && (
                                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                                    {project.links?.website && (
                                        <a
                                            href={project.links.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-foreground underline underline-offset-4 transition-colors"
                                        >
                                            Website ↗
                                        </a>
                                    )}
                                    {project.links?.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-foreground underline underline-offset-4 transition-colors"
                                        >
                                            GitHub ↗
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
