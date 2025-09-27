import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc'
import rehypeExtractTocExport from '@stefanprobst/rehype-extract-toc/mdx'

const nextConfig: NextConfig = {
    experimental: {
        useCache: true
    },
    typedRoutes: true,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx']
}

const prettyCodeOptions = {
    theme: {
        dark: 'github-dark',
        light: 'github-light'
    },
    keepBackground: false,
    defaultLang: 'text',
    grid: true,
    onVisitLine(node: any) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }]
        }
    },
    onVisitHighlightedLine(node: any) {
        node.properties['data-highlighted-line'] = ''
    },
    onVisitHighlightedChars(node: any) {
        node.properties.className = ['highlighted-chars']
    },
    onVisitTitle(node: any) {
        // Add data attributes for styling
        const parent = node.parent
        if (parent && parent.tagName === 'pre') {
            parent.properties['data-title'] = node.children[0].value
        }
    },
    onVisitCaption(node: any) {
        // Add data attributes for styling
        const parent = node.parent
        if (parent && parent.tagName === 'pre') {
            parent.properties['data-caption'] = node.children[0].value
        }
    }
}

const withMDX = createMDX({
    extension: /\.mdx$/,
    options: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
            rehypeKatex,
            rehypeSlug,
            [rehypePrettyCode, prettyCodeOptions],
            rehypeExtractToc,
            rehypeExtractTocExport
        ]
    }
})

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(withMDX(nextConfig))
