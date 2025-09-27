import { PostHeader } from '~/app/[locale]/blog/[...slug]/_components/post-header'
import { getPosts, getPost } from '~/lib/posts'

export const generateStaticParams = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const posts = await getPosts(locale)
    return posts.map((post) => post.slug)
}

export async function generateMetadata({
    params
}: PageProps<'/[locale]/blog/[...slug]'>) {
    const { locale, slug } = await params
    const slugPath = slug.join('/')
    const post = await getPost(locale, slugPath)

    const { metadata } = post

    return {
        title: `${metadata.title} - Conrad Osvik`,
        description: metadata.description
    }
}

export default async function BlogPage({
    params
}: PageProps<'/[locale]/blog/[...slug]'>) {
    const { locale, slug } = await params
    const slugPath = slug.join('/')
    const post = await getPost(locale, slugPath)

    const { default: Post, metadata } = post

    return (
        <article className="relative">
            <PostHeader metadata={metadata} />
            <Post />
        </article>
    )
}
