'use client'

import Link from 'next/link'
import { cn } from '~/lib/utils'

interface SectionTitleProps {
    id: string
    children: React.ReactNode
    className?: string
}

export default function SectionTitle({
    id,
    children,
    className
}: SectionTitleProps) {
    return (
        <h2 className={cn('section-title group', className)}>
            <Link
                href={`#${id}`}
                className="flex items-center gap-2 underline-offset-2 hover:underline"
                scroll={true}
            >
                {children}
                <span className="text-lg opacity-0 transition-opacity group-hover:opacity-50">
                    #
                </span>
            </Link>
        </h2>
    )
}
