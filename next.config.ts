import { type NextConfig } from 'next'
import { type Options } from 'rehype-pretty-code'
import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code'
import './src/env.js'

const prettyCodeConfig: Options = {
    theme: {
        light: 'github-dark-dimmed',
        dark: 'github-dark-default'
    },
    keepBackground: true,
    grid: true
}

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter]],
        rehypePlugins: [[rehypePrettyCode, prettyCodeConfig]]
    }
})

const config: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: false
    }
}
export default withMDX(config)
