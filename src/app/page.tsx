import { caller } from '~/trpc/server'
import Test from './_components/test'

export default async function Home() {
    const hello = await caller.post.hello({ text: 'world!' })

    return (
        <main>
            <h1>{hello.greeting}</h1>
            <Test />
        </main>
    )
}
