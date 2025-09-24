import React, { type JSX } from 'react'
import { cn } from '~/lib/utils'

type Variant =
    | 'display-lg'
    | 'display-md'
    | 'display-sm'
    | 'headline-lg'
    | 'headline-md'
    | 'headline-sm'
    | 'title-lg'
    | 'title-md'
    | 'title-sm'
    | 'body-lg'
    | 'body-md'
    | 'body-sm'
    | 'label-lg'
    | 'label-md'
    | 'label-sm'

const variantToClassName: Record<Variant, string> = {
    'display-lg': 'typo-display-lg',
    'display-md': 'typo-display-md',
    'display-sm': 'typo-display-sm',
    'headline-lg': 'typo-headline-lg',
    'headline-md': 'typo-headline-md',
    'headline-sm': 'typo-headline-sm',
    'title-lg': 'typo-title-lg',
    'title-md': 'typo-title-md',
    'title-sm': 'typo-title-sm',
    'body-lg': 'typo-body-lg',
    'body-md': 'typo-body-md',
    'body-sm': 'typo-body-sm',
    'label-lg': 'typo-label-lg',
    'label-md': 'typo-label-md',
    'label-sm': 'typo-label-sm'
}

const variantToDefaultTag: Record<Variant, keyof JSX.IntrinsicElements> = {
    'display-lg': 'h1',
    'display-md': 'h1',
    'display-sm': 'h1',
    'headline-lg': 'h2',
    'headline-md': 'h2',
    'headline-sm': 'h3',
    'title-lg': 'h4',
    'title-md': 'h5',
    'title-sm': 'h6',
    'body-lg': 'p',
    'body-md': 'p',
    'body-sm': 'p',
    'label-lg': 'span',
    'label-md': 'span',
    'label-sm': 'span'
}

export interface TypographyProps {
    variant: Variant
    asChild?: boolean
    as?: keyof JSX.IntrinsicElements
    className?: string
    children?: React.ReactNode
    ref?: React.Ref<HTMLElement>
}

export function Typography({
    variant,
    className,
    as,
    ref,
    ...props
}: TypographyProps) {
    const tagName = as ?? variantToDefaultTag[variant]
    const Component = tagName as keyof JSX.IntrinsicElements

    return React.createElement(Component, {
        ref,
        className: cn(variantToClassName[variant], className),
        ...props
    })
}

export function withTypography(
    variant: Variant,
    tag?: keyof JSX.IntrinsicElements
) {
    const Component = ({
        className,
        ref,
        ...props
    }: React.HTMLAttributes<HTMLElement> & {
        ref?: React.Ref<HTMLElement>
    }) => {
        const tagName = tag ?? variantToDefaultTag[variant]
        const Element = tagName as keyof JSX.IntrinsicElements

        return React.createElement(Element, {
            ref,
            className: cn(variantToClassName[variant], className),
            ...props
        })
    }

    Component.displayName = `WithTypography(${variant}${tag ? ` as ${tag}` : ''})`

    return Component
}

export type { Variant as TypographyVariant }
