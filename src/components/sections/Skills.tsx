import SkillBadge from '~/components/SkillBadge'
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
} from '~/components/devicons'

const groups = [
    {
        label: 'Languages',
        skills: [
            { label: 'JavaScript', icon: <JavaScript /> },
            { label: 'TypeScript', icon: <TypeScript /> },
            { label: 'HTML', icon: <HTML /> },
            { label: 'CSS', icon: <CSS /> },
            { label: 'Java', icon: <Java /> },
            { label: 'Kotlin', icon: <Kotlin /> },
            { label: 'Python', icon: <Python /> },
            { label: 'Rust', icon: <Rust /> },
            { label: 'C', icon: <C /> }
        ]
    },
    {
        label: 'Libraries',
        skills: [
            { label: 'Drizzle', icon: <Drizzle /> },
            { label: 'Prisma', icon: <Prisma /> },
            { label: 'tRPC', icon: <TRPC /> },
            { label: 'Tailwind', icon: <Tailwind /> }
        ]
    },
    {
        label: 'Frameworks',
        skills: [
            { label: 'React', icon: <React /> },
            { label: 'Next.js', icon: <Next /> },
            { label: 'SvelteKit', icon: <Svelte /> },
            { label: 'Vue', icon: <Vue /> },
            { label: 'Express.js', icon: <Express /> },
            { label: 'Hono', icon: <Hono /> },
            { label: 'Spring', icon: <Spring /> }
        ]
    },
    {
        label: 'Databases',
        skills: [
            { label: 'MySQL', icon: <MySQL /> },
            { label: 'PostgreSQL', icon: <PostgreSQL /> },
            { label: 'SQLite', icon: <SQLite /> },
            { label: 'NoSQL' },
            { label: 'Redis', icon: <Redis /> }
        ]
    },
    {
        label: 'Tools',
        skills: [
            { label: 'Git', icon: <Git /> },
            { label: 'Docker', icon: <Docker /> }
        ]
    }
]

export default function Skills() {
    return (
        <section id="skills" className="flex flex-col gap-4">
            <h2 className="section-title">Skills</h2>
            <div className="space-y-4">
                {groups.map((group) => (
                    <div key={group.label}>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-2">
                            {group.label}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {group.skills.map((skill) => (
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
