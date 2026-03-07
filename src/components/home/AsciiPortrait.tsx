import { useEffect, useState } from 'react'

const ASCII_CHARS = ' .:-=+*#%@'
const COLS = 150

export function AsciiPortrait({ src }: { src: string }) {
    const [ascii, setAscii] = useState('')

    useEffect(() => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!

            // Monospace chars are ~2x taller than wide, compensate
            const rows = Math.round(
                (COLS / (img.width / img.height)) * 0.5
            )
            canvas.width = COLS
            canvas.height = rows

            ctx.drawImage(img, 0, 0, COLS, rows)
            const data = ctx.getImageData(0, 0, COLS, rows).data

            let result = ''
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < COLS; x++) {
                    const i = (y * COLS + x) * 4
                    const alpha = data[i + 3]
                    if (alpha < 128) {
                        result += ' '
                        continue
                    }
                    const brightness =
                        (data[i] * 0.299 +
                            data[i + 1] * 0.587 +
                            data[i + 2] * 0.114) /
                        255
                    result +=
                        ASCII_CHARS[
                            Math.floor(brightness * (ASCII_CHARS.length - 1))
                        ]
                }
                result += '\n'
            }

            setAscii(result)
        }
        img.src = src
    }, [src])

    if (!ascii) return null

    return (
        <pre
            className="text-foreground/15 select-none font-mono text-[5px] leading-[5px]"
            aria-hidden="true"
        >
            {ascii}
        </pre>
    )
}
