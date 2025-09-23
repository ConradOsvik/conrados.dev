import { TableOfContents } from './_components/table-of-contents'
import { getPostBySlug } from '~/lib/posts'

export default async function BlogLayout({
    children,
    params
}: LayoutProps<'/[locale]/blog/[...slug]'>) {
    const slugPath = (await params).slug.join('/')
    const post = await getPostBySlug(slugPath)

    const { tableOfContents, toc } = post

    return (
        <div className="flex w-full justify-center">
            <aside className="hidden w-full lg:block"></aside>
            <div className="w-full max-w-xl shrink-0">{children}</div>
            <aside className="hidden w-full lg:block">
                {toc && <TableOfContents toc={tableOfContents} />}
            </aside>
        </div>
    )
}
