'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

export function BlogImage({
    src,
    className,
    alt,
    ...props
}: {
    src: StaticImageData
    className?: string
    alt: string
}) {
    return (
        <div className="w-full overflow-hidden rounded-lg">
            <Image src={src} className={className} alt={alt} {...props} />
        </div>
    )
}
