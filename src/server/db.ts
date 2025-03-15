import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

import { env } from '~/env'

const createPrismaClient = () => {
    if (env.NODE_ENV === 'production' && env.TURSO_DATABASE_URL) {
        const libsql = createClient({
            url: env.TURSO_DATABASE_URL,
            authToken: env.TURSO_DATABASE_TOKEN
        })

        const adapter = new PrismaLibSQL(libsql)

        return new PrismaClient({ adapter, log: ['error'] })
    }

    return new PrismaClient({
        log: ['query', 'error', 'warn']
    })
}

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db
