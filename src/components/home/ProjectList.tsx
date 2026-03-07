import {
    HoverHighlightRoot,
    HoverHighlightItem,
} from '~/components/ui/HoverHighlight'

interface Project {
    title: string
    description: string
    links: { github?: string; website?: string }
}

export function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <HoverHighlightRoot className="flex flex-col -mx-3">
            {projects.map((project) => (
                <HoverHighlightItem key={project.title}>
                    <div className="flex flex-col gap-0.5 px-3 py-2">
                        <div className="flex items-baseline gap-3">
                            <span className="text-sm font-medium text-foreground">
                                {project.title}
                            </span>
                            <span className="flex gap-2 text-xs text-muted-foreground">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        GitHub ↗
                                    </a>
                                )}
                                {project.links.website && (
                                    <a
                                        href={project.links.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Site ↗
                                    </a>
                                )}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {project.description}
                        </p>
                    </div>
                </HoverHighlightItem>
            ))}
        </HoverHighlightRoot>
    )
}
