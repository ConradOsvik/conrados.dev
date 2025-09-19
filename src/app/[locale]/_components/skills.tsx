'use client'

import { useI18n } from '~/locales/client'
import SkillBadge from './skill-badge'
import {
    JavaScript,
    TypeScript,
    HTML,
    CSS,
    Java,
    Kotlin,
    Python,
    Rust,
    C,
    Drizzle,
    Prisma,
    TRPC,
    React,
    Next,
    Svelte,
    Vue,
    Express,
    Hono,
    Spring,
    MySQL,
    PostgreSQL,
    SQLite,
    Redis,
    Git,
    Docker,
    Tailwind
} from './devicons'
import SectionTitle from './section-title'

type Skill = {
    label: string
    icon?: React.ReactNode
}

export default function Skills() {
    const t = useI18n()

    const skills: Record<string, Skill[]> = {
        [t('skills.languages')]: [
            { label: 'JavaScript', icon: <JavaScript /> },
            { label: 'TypeScript', icon: <TypeScript /> },
            { label: 'HTML', icon: <HTML /> },
            { label: 'CSS', icon: <CSS /> },
            { label: 'Java', icon: <Java /> },
            { label: 'Kotlin', icon: <Kotlin /> },
            { label: 'Python', icon: <Python /> },
            { label: 'Rust', icon: <Rust /> },
            { label: 'C', icon: <C /> }
        ],
        [t('skills.libraries')]: [
            { label: 'Drizzle', icon: <Drizzle /> },
            { label: 'Prisma', icon: <Prisma /> },
            { label: 'tRPC', icon: <TRPC /> },
            { label: 'Tailwind', icon: <Tailwind /> }
        ],
        [t('skills.frameworks')]: [
            { label: 'React', icon: <React /> },
            { label: 'Next.js', icon: <Next /> },
            { label: 'SvelteKit', icon: <Svelte /> },
            { label: 'Vue', icon: <Vue /> },
            { label: 'Express.js', icon: <Express /> },
            { label: 'Hono', icon: <Hono /> },
            { label: 'Spring', icon: <Spring /> }
        ],
        [t('skills.databases')]: [
            { label: 'MySQL', icon: <MySQL /> },
            { label: 'PostgreSQL', icon: <PostgreSQL /> },
            { label: 'SQLite', icon: <SQLite /> },
            { label: 'NoSQL', icon: undefined },
            { label: 'Redis', icon: <Redis /> }
        ],
        [t('skills.tools')]: [
            { label: 'Git', icon: <Git /> },
            { label: 'Docker', icon: <Docker /> }
        ]
    }

    return (
        <section id="skills" className="flex flex-col">
            <SectionTitle id="skills">{t('sections.skills')}</SectionTitle>
            <div className="mt-4 space-y-4">
                {Object.entries(skills).map(([group, items]) => (
                    <div key={group}>
                        <div className="text-muted-foreground text-sm font-medium">
                            {group}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <SkillBadge
                                    key={skill.label}
                                    label={skill.label}
                                    icon={skill.icon}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
