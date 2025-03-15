/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
    plugins: ['prettier-plugin-tailwindcss'],
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 80
}

export default prettierConfig
