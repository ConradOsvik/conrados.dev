import { PostHeader } from '~/app/[locale]/blog/[...slug]/_components/post-header'
import { getAllPosts, getPostBySlug } from '~/lib/posts'

export const generateStaticParams = async () => {
    const posts = await getAllPosts()
    return posts.map((post) => post.slug)
}

export async function generateMetadata({
    params
}: PageProps<'/[locale]/blog/[...slug]'>) {
    const post = await getPostBySlug((await params).slug.join('/'))

    const { metadata } = post

    return {
        title: `${metadata.title} - Conrad Osvik`,
        description: metadata.description
    }
}

export default async function BlogPage({
    params
}: PageProps<'/[locale]/blog/[...slug]'>) {
    const slugPath = (await params).slug.join('/')
    const post = await getPostBySlug(slugPath)

    const { default: Post, metadata } = post

    return (
        <article className="relative">
            <PostHeader metadata={metadata} />
            <Post />
        </article>
    )
}
