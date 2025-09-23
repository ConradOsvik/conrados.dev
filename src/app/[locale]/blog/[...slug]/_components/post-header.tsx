import { cn } from '~/lib/utils'
import { Badge } from '~/components/ui/badge'
import { BlogImage } from './blog-image'
import type { StaticImageData } from 'next/image'

export type PostMetadata = {
    title: string
    description?: string
    date?: string
    author?: string
    image?: StaticImageData
    tags?: string[]
}

function formatDate(date?: string) {
    if (!date) return null
    const d = new Date(date)
    if (Number.isNaN(d.getTime())) return date
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(d)
}

export function PostHeader({
    metadata,
    className
}: {
    metadata: PostMetadata
    className?: string
}) {
    const { title, description, date, author, image, tags } = metadata
    return (
        <header className={cn('mb-8 space-y-4', className)}>
            {image ? <BlogImage src={image} alt="Cover image" /> : null}
            <div className="space-y-3">
                <h1 className="typo-headline-md md:typo-headline-lg">
                    {title}
                </h1>
                {description ? (
                    <p className="typo-body-md md:typo-body-lg">
                        {description}
                    </p>
                ) : null}
            </div>
            <div className="typo-label-md flex flex-wrap items-center gap-x-4 gap-y-2">
                {author ? <span>By {author}</span> : null}
                {date ? <span>{formatDate(date)}</span> : null}
                {tags?.length ? (
                    <span className="flex flex-wrap items-center gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </span>
                ) : null}
            </div>
        </header>
    )
}
