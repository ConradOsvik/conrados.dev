import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '~/lib/utils'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

function createHeading(Tag: HeadingTag, baseClasses: string) {
    const Component = ({
        id,
        className,
        children,
        ...props
    }: { id?: string } & ComponentPropsWithoutRef<'h1'>) => {
        return (
            <Tag id={id} className={cn(baseClasses, className)} {...props}>
                <a
                    href={`#${id}`}
                    data-heading-link
                    className="group inline-flex items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                    {children}
                    <span className="heading-link-icon shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    </span>
                </a>
            </Tag>
        )
    }
    Component.displayName = `Heading(${Tag})`
    return Component
}

export const mdxComponents: MDXComponents = {
    h1: createHeading(
        'h1',
        'text-foreground text-2xl font-bold tracking-tight scroll-m-20 mt-8 mb-6 first:mt-0 lg:text-3xl'
    ),
    h2: createHeading(
        'h2',
        'text-foreground text-xl font-semibold tracking-tight scroll-m-20 mt-8 mb-4 first:mt-0'
    ),
    h3: createHeading(
        'h3',
        'text-foreground text-lg font-semibold tracking-tight scroll-m-20 mt-6 mb-4 first:mt-0'
    ),
    h4: createHeading(
        'h4',
        'text-foreground text-base font-semibold tracking-tight scroll-m-20 mt-5 mb-3 first:mt-0'
    ),
    a: ({ className, ...props }) => (
        <a
            className={cn(
                'text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                className
            )}
            {...props}
        />
    ),
    img: ({ src, alt, title, className, ...props }) => {
        // Astro imports inline MDX images as ImageMetadata objects rather than
        // plain URL strings. Extract .src (and dimensions) when that's the case.
        const isMetadata =
            src !== null && typeof src === 'object' && 'src' in (src as object)
        const resolvedSrc = isMetadata ? (src as { src: string }).src : (src as string)
        const resolvedWidth = isMetadata
            ? (src as { width: number }).width
            : undefined
        const resolvedHeight = isMetadata
            ? (src as { height: number }).height
            : undefined

        const image = (
            <img
                src={resolvedSrc}
                alt={alt ?? ''}
                width={resolvedWidth}
                height={resolvedHeight}
                className={cn(
                    'h-auto w-full rounded-lg border border-border',
                    className
                )}
                {...props}
            />
        )
        if (!title) return image
        return (
            <figure>
                {image}
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {title}
                </figcaption>
            </figure>
        )
    },
    hr: ({ className, ...props }) => (
        <hr className={cn('border-border my-8', className)} {...props} />
    ),
    code: ({ className, children, ...props }) => (
        <code
            className={cn(
                'bg-primary/5 text-foreground rounded px-1.5 py-0.5 font-mono text-[0.875em] before:content-none after:content-none',
                className
            )}
            {...props}
        >
            {children}
        </code>
    )
}
