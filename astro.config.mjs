// @ts-check
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

const site =
    process.env.VERCEL_ENV === 'production'
        ? 'https://conrados.dev'
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'https://conrados.dev'

export default defineConfig({
    site,
    markdown: {
        // rehypeSlug and rehypeKatex go here so they're included in the MDX
        // pipeline's defaults, alongside the rehype-expressive-code plugin that
        // astro-expressive-code injects into markdown.rehypePlugins.
        // (Specifying rehypePlugins directly in mdx() would override defaults via ??,
        // which would drop expressive-code from the MDX pipeline.)
        rehypePlugins: [rehypeSlug, rehypeKatex]
    },
    integrations: [
        expressiveCode({
            // Light theme first = default at :root; dark theme scoped to .dark
            themes: ['github-light', 'github-dark-dimmed'],
            useDarkModeMediaQuery: false,
            themeCssSelector: (theme) =>
                theme.type === 'dark' ? '.dark' : ':root',
            styleOverrides: {
                borderRadius: '0.5rem',
                borderWidth: '1px',
                codeFontFamily:
                    "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                // Match --card background and --border color
                codeBackground: ({ theme }) =>
                    theme.type === 'dark'
                        ? 'oklch(0.175 0.008 255)'
                        : 'oklch(1 0 0)',
                borderColor: ({ theme }) =>
                    theme.type === 'dark'
                        ? 'oklch(1 0 0 / 9%)'
                        : 'oklch(0.88 0.008 250)',
                frames: {
                    frameBoxShadowCssValue: 'none',
                    // Editor background (matches --card)
                    editorBackground: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(0.175 0.008 255)'
                            : 'oklch(1 0 0)',
                    // Tab bar background (matches --background / --muted)
                    editorTabBarBackground: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(0.135 0.008 255)'
                            : 'oklch(0.95 0.004 250)',
                    editorActiveTabBackground: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(0.175 0.008 255)'
                            : 'oklch(1 0 0)',
                    editorTabBarBorderColor: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(1 0 0 / 9%)'
                            : 'oklch(0.88 0.008 250)',
                    editorTabBarBorderBottomColor: ({ theme }) =>
                        theme.type === 'dark'
                            ? 'oklch(1 0 0 / 9%)'
                            : 'oklch(0.88 0.008 250)',
                    editorActiveTabBorderColor: 'transparent'
                }
            }
        }),
        react(),
        mdx({
            syntaxHighlight: false,
            remarkPlugins: [remarkGfm, remarkMath]
        }),
        sitemap()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
})
