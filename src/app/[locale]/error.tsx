'use client'

import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
            <div className="space-y-6">
                <h1 className="typo-display-lg">Something went wrong</h1>
                <p className="typo-body-lg text-muted-foreground mx-auto max-w-prose">
                    An unexpected error occurred. You can try again, or go back
                    to the homepage.
                </p>
                {error?.digest ? (
                    <p className="typo-label-sm text-muted-foreground/70">
                        Error ID:{' '}
                        <span className="font-mono">{error.digest}</span>
                    </p>
                ) : null}
                <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' })
                        )}
                    >
                        Try again
                    </button>
                    <Link
                        href={{ pathname: '/' }}
                        className={cn(
                            buttonVariants({ variant: 'outline', size: 'lg' })
                        )}
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    )
}
