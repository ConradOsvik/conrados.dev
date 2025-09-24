import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function NotFound() {
    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <div className="space-y-6">
                <h1 className="typo-display-lg">404</h1>
                <h2 className="typo-body-lg text-4xl">Page Not Found</h2>
                <div className="pt-2">
                    <Link
                        href={{ pathname: '/' }}
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' })
                        )}
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    )
}
