import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    experimental: {
        useCache: true,
    },
    typedRoutes: true,
}

export default nextConfig
