import { LinkIcon } from '@heroicons/react/24/solid'
import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '~/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: createHeading(
            'h1',
            'typo-headline-md lg:typo-headline-lg scroll-m-20 mt-8 mb-6 first:mt-0'
        ),
        h2: createHeading(
            'h2',
            'typo-title-lg scroll-m-20 pb-2 mt-8 mb-4 first:mt-0'
        ),
        h3: createHeading(
            'h3',
            'typo-title-md scroll-m-20 mt-6 mb-4 first:mt-0'
        ),
        h4: createHeading(
            'h4',
            'typo-title-sm scroll-m-20 mt-5 mb-3 first:mt-0'
        ),
        h5: createHeading(
            'h5',
            'text-foreground scroll-m-20 text-base font-semibold tracking-tight mt-4 mb-3 first:mt-0'
        ),
        h6: createHeading(
            'h6',
            'text-foreground scroll-m-20 text-sm font-semibold tracking-tight mt-4 mb-2 first:mt-0'
        ),
        p: ({ className, ...props }) => (
            <p
                className={cn(
                    'typo-body-md',
                    '[&:not(:first-child)]:mt-6',
                    className
                )}
                {...props}
            />
        ),
        ul: ({ className, ...props }) => (
            <ul
                className={cn('my-6 ml-6 list-disc space-y-2', className)}
                {...props}
            />
        ),
        ol: ({ className, ...props }) => (
            <ol
                className={cn('my-6 ml-6 list-decimal space-y-2', className)}
                {...props}
            />
        ),
        li: ({ className, ...props }) => (
            <li className={cn('leading-7', className)} {...props} />
        ),
        blockquote: ({ className, ...props }) => (
            <blockquote
                className={cn(
                    'border-border typo-body-md mt-6 border-l-4 pl-6 italic',
                    '[&>*]:text-muted-foreground',
                    className
                )}
                {...props}
            />
        ),
        figure: ({ className, ...props }) => (
            <figure
                className={cn(
                    'bg-card border-border typo-label-md my-2 rounded-lg border',
                    className
                )}
                {...props}
            />
        ),
        figcaption: ({ className, ...props }) => (
            <figcaption
                className={cn('border-border border-b px-4 py-2', className)}
                {...props}
            />
        ),
        pre: ({ className, ...props }) => (
            <pre
                className={cn(
                    'py-4',
                    'w-full max-w-full min-w-0 overflow-x-auto text-sm',
                    className
                )}
                {...props}
            />
        ),
        code: ({ className, ...props }) => (
            <code
                className={cn(
                    'font-mono',
                    '[&>span[data-line]]:px-4',
                    // Shiki text color
                    '[&>span[data-line]>span]:text-[var(--shiki-light)] dark:[&>span[data-line]>span]:text-[var(--shiki-dark)]',
                    // Shiki highlighted line color
                    '[&>span[data-highlighted-line]]:border-l-2 [&>span[data-highlighted-line]]:border-l-blue-500 [&>span[data-highlighted-line]]:bg-blue-500/20 dark:[&>span[data-highlighted-line]]:bg-blue-500/15',
                    // Shiki highlighted line color by ID
                    '[&>span[data-highlighted-line-id=add]]:border-l-green-500! [&>span[data-highlighted-line-id=add]]:bg-green-500/20! dark:[&>span[data-highlighted-line-id=add]]:bg-green-500/15!',
                    '[&>span[data-highlighted-line-id=remove]]:border-l-red-500! [&>span[data-highlighted-line-id=remove]]:bg-red-500/20! dark:[&>span[data-highlighted-line-id=remove]]:bg-red-500/15!',
                    // Shiki line numbers
                    '[&[data-line-numbers]]:[counter-reset:line]',
                    '[&[data-line-numbers]>span[data-line]::before]:[counter-increment:line]',
                    '[&[data-line-numbers]>span[data-line]::before]:[content:counter(line)]',
                    // Line number alignment and spacing
                    '[&[data-line-numbers]>span[data-line]::before]:inline-block',
                    '[&[data-line-numbers]>span[data-line]::before]:min-w-[3ch]',
                    '[&[data-line-numbers]>span[data-line]::before]:text-right',
                    '[&[data-line-numbers]>span[data-line]::before]:mr-4',
                    '[&[data-line-numbers]>span[data-line]::before]:[font-variant-numeric:tabular-nums]',
                    '[&[data-line-numbers]>span[data-line]::before]:text-muted-foreground',
                    '[&[data-line-numbers]>span[data-line]::before]:opacity-60',
                    className
                )}
                {...props}
            />
        ),
        a: ({ className, ...props }) => {
            const isHeadingLink =
                typeof className === 'string' &&
                className.includes('mdx-heading-link')
            return (
                <a
                    className={cn(
                        isHeadingLink
                            ? 'text-foreground hover:text-foreground no-underline'
                            : 'text-primary hover:text-primary/80 font-medium underline underline-offset-4',
                        className
                    )}
                    {...props}
                />
            )
        },
        hr: ({ className, ...props }) => (
            <hr className={cn('border-border my-8', className)} {...props} />
        ),
        table: ({ className, ...props }) => (
            <div className="my-6 w-full max-w-full overflow-x-auto">
                <table
                    className={cn(
                        'border-border w-full border-collapse border',
                        className
                    )}
                    {...props}
                />
            </div>
        ),
        thead: ({ className, ...props }) => (
            <thead className={cn('bg-muted/50', className)} {...props} />
        ),
        tbody: ({ className, ...props }) => (
            <tbody
                className={cn('[&_tr:last-child]:border-0', className)}
                {...props}
            />
        ),
        tr: ({ className, ...props }) => (
            <tr
                className={cn(
                    'border-border hover:bg-muted/50 border-b transition-colors',
                    className
                )}
                {...props}
            />
        ),
        th: ({ className, ...props }) => (
            <th
                className={cn(
                    'border-border border px-4 py-2 text-left font-semibold',
                    '[&[align=center]]:text-center [&[align=right]]:text-right',
                    className
                )}
                {...props}
            />
        ),
        td: ({ className, ...props }) => (
            <td
                className={cn(
                    'border-border border px-4 py-2',
                    '[&[align=center]]:text-center [&[align=right]]:text-right',
                    className
                )}
                {...props}
            />
        ),
        img: ({ className, ...props }) => (
            <img
                className={cn(
                    'my-6 h-auto max-w-full rounded-lg border',
                    className
                )}
                {...props}
            />
        ),
        strong: ({ className, ...props }) => (
            <strong className={cn('font-bold', className)} {...props} />
        ),
        em: ({ className, ...props }) => (
            <em className={cn('italic', className)} {...props} />
        ),

        ...components
    }
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

function createHeading(Tag: HeadingTag, baseClasses: string) {
    return ({
        id,
        className,
        children,
        ...props
    }: { id?: string } & ComponentPropsWithoutRef<'h1'>) => {
        return (
            <Tag id={id} className={cn(baseClasses, className)} {...props}>
                <a
                    href={`#${id}`}
                    className="group inline-flex items-center justify-center gap-2"
                >
                    {children}
                    <LinkIcon className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
            </Tag>
        )
    }
}
