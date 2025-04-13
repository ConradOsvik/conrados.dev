'use client'

import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import {
    createTRPCClient,
    loggerLink,
    unstable_httpBatchStreamLink
} from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import superjson from 'superjson'
import type { AppRouter } from '~/server/api/root'
import { makeQueryClient } from '~/trpc/query-client'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()
let browserQueryClient: QueryClient
function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient()
    }
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
}
function getUrl() {
    const base = (() => {
        if (typeof window !== 'undefined') return ''
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
        return `http://localhost:${process.env.PORT ?? 3000}`
    })()
    return `${base}/api/trpc`
}
export function TRPCReactProvider(
    props: Readonly<{
        children: React.ReactNode
    }>
) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient()
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === 'development' ||
                        (op.direction === 'down' && op.result instanceof Error)
                }),
                unstable_httpBatchStreamLink({
                    transformer: superjson,
                    url: getUrl()
                })
            ]
        })
    )
    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {props.children}
            </TRPCProvider>
        </QueryClientProvider>
    )
}
