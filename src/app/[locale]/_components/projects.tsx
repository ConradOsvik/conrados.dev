'use client'

import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '~/components/ui/card'
import SkillBadge from './skill-badge'
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
} from './devicons'
import SectionTitle from './section-title'
import { useTranslations } from 'next-intl'

type Project = {
    title: string
    description: string
    stack: string[]
    links?: {
        website?: string
        github?: string
    }
}

export default function Projects() {
    const t = useTranslations('projects')

    const projects: Project[] = [
        {
            title: t('photon.title'),
            description: t('photon.description'),
            stack: ['TypeScript', 'Hono', 'PostgreSQL', 'Redis', 'Drizzle'],
            links: {
                github: 'https://github.com/TIHLDE/Photon'
            }
        },
        {
            title: t('coursestats.title'),
            description: t('coursestats.description'),
            stack: ['Next.js', 'SQLite', 'Drizzle', 'TypeScript'],
            links: {
                github: 'https://github.com/ConradOsvik/coursestats',
                website: 'https://cs.conrados.dev'
            }
        },
        {
            title: t('kontres.title'),
            description: t('kontres.description'),
            stack: ['Next.js', 'tRPC', 'PostgreSQL', 'Prisma', 'TypeScript'],
            links: {
                github: 'https://github.com/TIHLDE/kontresv2'
            }
        },
        {
            title: t('kvark.title'),
            description: t('kvark.description'),
            stack: [
                'React',
                'Django',
                'Python',
                'TanStack Query',
                'TanStack Router'
            ],
            links: {
                github: 'https://github.com/TIHLDE/Kvark'
            }
        }
    ]

    return (
        <section id="projects" className="flex flex-col">
            <SectionTitle id="projects">{t('sectionTitle')}</SectionTitle>
            <div className="mt-4 space-y-4">
                {projects.map((project) => (
                    <Card key={project.title}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {project.title}
                            </CardTitle>
                            <CardDescription>
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => {
                                    const getIcon = (techName: string) => {
                                        switch (techName) {
                                            case 'TypeScript':
                                                return <TypeScript />
                                            case 'React':
                                                return <React />
                                            case 'Next.js':
                                                return <Next />
                                            case 'Python':
                                                return <Python />
                                            case 'Django':
                                                return <Django />
                                            case 'PostgreSQL':
                                                return <PostgreSQL />
                                            case 'SQLite':
                                                return <SQLite />
                                            case 'Redis':
                                                return <Redis />
                                            case 'Hono':
                                                return <Hono />
                                            case 'Drizzle':
                                                return <Drizzle />
                                            case 'Prisma':
                                                return <Prisma />
                                            case 'tRPC':
                                                return <TRPC />
                                            case 'TanStack Query':
                                            case 'TanStack Router':
                                                return <React />
                                            default:
                                                return undefined
                                        }
                                    }

                                    return (
                                        <SkillBadge
                                            key={tech}
                                            label={tech}
                                            icon={getIcon(tech)}
                                        />
                                    )
                                })}
                            </div>
                            {(project.links?.website ||
                                project.links?.github) && (
                                <div className="mt-3 flex gap-4 text-sm">
                                    {project.links?.website && (
                                        <Link
                                            href={{
                                                pathname: project.links.website
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline underline-offset-4 hover:opacity-80"
                                            aria-label={`Open website for ${project.title}`}
                                        >
                                            {t('links.website')}
                                        </Link>
                                    )}
                                    {project.links?.github && (
                                        <Link
                                            href={{
                                                pathname: project.links.github
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline underline-offset-4 hover:opacity-80"
                                            aria-label={`Open GitHub repo for ${project.title}`}
                                        >
                                            {t('links.github')}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
