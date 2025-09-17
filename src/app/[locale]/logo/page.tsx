'use client'

import { useEffect, useRef } from 'react'
import satori from 'satori'

export default function Test() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Shared design constants (base size for 800x800 canvas)
    const DESIGN_CONFIG = {
        baseSize: 800,
        dotRadius: 140,
        innerRadius: 220,
        ringThickness: 80,
        startAngleDeg: 30,
        endAngleDeg: 330
    }

    // Shared drawing function
    const drawLogo = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        hasBackground: boolean = true
    ) => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Set background if needed
        if (hasBackground) {
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, width, height)
        }

        // Enable anti-aliasing for smoother curves
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        const centerX = width / 2
        const centerY = height / 2
        const scale = width / DESIGN_CONFIG.baseSize

        // Draw central dot (proportionally scaled)
        const dotRadius = DESIGN_CONFIG.dotRadius * scale
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(centerX, centerY, dotRadius, 0, 2 * Math.PI)
        ctx.fill()

        // Draw C-shaped ring (proportionally scaled)
        const innerRadius = DESIGN_CONFIG.innerRadius * scale
        const ringThickness = DESIGN_CONFIG.ringThickness * scale
        const outerRadius = innerRadius + ringThickness

        // Convert degrees to radians
        const startAngle = (DESIGN_CONFIG.startAngleDeg * Math.PI) / 180
        const endAngle = (DESIGN_CONFIG.endAngleDeg * Math.PI) / 180

        ctx.fillStyle = 'white'
        ctx.beginPath()

        // Draw outer arc
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)

        // Draw line to inner radius
        ctx.lineTo(
            centerX + innerRadius * Math.cos(endAngle),
            centerY + innerRadius * Math.sin(endAngle)
        )

        // Draw inner arc (reverse direction)
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)

        // Close the path
        ctx.closePath()
        ctx.fill()
    }

    // React component version for SVG generation
    const LogoComponent = ({
        size,
        hasBackground
    }: {
        size: number
        hasBackground: boolean
    }) => {
        const scale = size / DESIGN_CONFIG.baseSize
        const centerX = size / 2
        const centerY = size / 2
        const dotRadius = DESIGN_CONFIG.dotRadius * scale
        const innerRadius = DESIGN_CONFIG.innerRadius * scale
        const ringThickness = DESIGN_CONFIG.ringThickness * scale
        const outerRadius = innerRadius + ringThickness

        // Convert degrees to radians for calculations
        const startAngleRad = (DESIGN_CONFIG.startAngleDeg * Math.PI) / 180
        const endAngleRad = (DESIGN_CONFIG.endAngleDeg * Math.PI) / 180

        // Calculate arc coordinates
        const outerStartX = centerX + outerRadius * Math.cos(startAngleRad)
        const outerStartY = centerY + outerRadius * Math.sin(startAngleRad)
        const outerEndX = centerX + outerRadius * Math.cos(endAngleRad)
        const outerEndY = centerY + outerRadius * Math.sin(endAngleRad)
        const innerStartX = centerX + innerRadius * Math.cos(startAngleRad)
        const innerStartY = centerY + innerRadius * Math.sin(startAngleRad)
        const innerEndX = centerX + innerRadius * Math.cos(endAngleRad)
        const innerEndY = centerY + innerRadius * Math.sin(endAngleRad)

        // Create the C-shaped path
        const ringPath = [
            `M ${outerStartX} ${outerStartY}`,
            `A ${outerRadius} ${outerRadius} 0 1 1 ${outerEndX} ${outerEndY}`,
            `L ${innerEndX} ${innerEndY}`,
            `A ${innerRadius} ${innerRadius} 0 1 0 ${innerStartX} ${innerStartY}`,
            'Z'
        ].join(' ')

        return (
            <div
                style={{
                    display: 'flex',
                    width: size,
                    height: size,
                    backgroundColor: hasBackground ? 'black' : 'transparent'
                }}
            >
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {/* Central dot */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={dotRadius}
                        fill="white"
                    />
                    {/* C-shaped ring */}
                    <path d={ringPath} fill="white" />
                </svg>
            </div>
        )
    }

    const downloadAsSVG = async (
        size: number = DESIGN_CONFIG.baseSize,
        hasBackground: boolean = false
    ) => {
        try {
            const svg = await satori(
                <LogoComponent size={size} hasBackground={hasBackground} />,
                {
                    width: size,
                    height: size,
                    fonts: [] // No text in our logo, so no fonts needed
                }
            )

            // Create download link
            const blob = new Blob([svg], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `logo-${size}x${size}${hasBackground ? '-black' : '-transparent'}.svg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error generating SVG:', error)
        }
    }

    const downloadAsPNG = (transparent: boolean = true) => {
        // Create a new canvas for the PNG
        const pngCanvas = document.createElement('canvas')
        pngCanvas.width = DESIGN_CONFIG.baseSize
        pngCanvas.height = DESIGN_CONFIG.baseSize
        const ctx = pngCanvas.getContext('2d')
        if (!ctx) return

        // Draw the logo with or without background
        drawLogo(
            ctx,
            DESIGN_CONFIG.baseSize,
            DESIGN_CONFIG.baseSize,
            !transparent
        )

        // Convert to blob and download
        pngCanvas.toBlob((blob) => {
            if (!blob) return

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `logo-${transparent ? 'transparent' : 'black'}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }, 'image/png')
    }

    const downloadAsFavicon = (size: number) => {
        // Create a new canvas for the favicon size
        const faviconCanvas = document.createElement('canvas')
        faviconCanvas.width = size
        faviconCanvas.height = size
        const ctx = faviconCanvas.getContext('2d')
        if (!ctx) return

        // Draw the logo using shared logic (with black background for favicon)
        drawLogo(ctx, size, size, true)

        // Convert to blob and download
        faviconCanvas.toBlob((blob) => {
            if (!blob) return

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `favicon-${size}x${size}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }, 'image/png')
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Draw the logo using shared logic (with black background for display)
        drawLogo(ctx, canvas.width, canvas.height, true)
    }, [])

    return (
        <div className="flex flex-col items-center gap-4">
            <canvas ref={canvasRef} width={800} height={800} />
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => downloadAsPNG(true)}
                        className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        PNG Transparent
                    </button>
                    <button
                        onClick={() => downloadAsPNG(false)}
                        className="rounded bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                    >
                        PNG Black BG
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            downloadAsSVG(DESIGN_CONFIG.baseSize, false)
                        }
                        className="rounded bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
                    >
                        SVG Transparent
                    </button>
                    <button
                        onClick={() =>
                            downloadAsSVG(DESIGN_CONFIG.baseSize, true)
                        }
                        className="rounded bg-purple-800 px-4 py-2 text-white transition-colors hover:bg-purple-900"
                    >
                        SVG Black BG
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => downloadAsFavicon(16)}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
                    >
                        Favicon 16x16
                    </button>
                    <button
                        onClick={() => downloadAsFavicon(32)}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
                    >
                        Favicon 32x32
                    </button>
                    <button
                        onClick={() => downloadAsFavicon(48)}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
                    >
                        Favicon 48x48
                    </button>
                </div>
            </div>
        </div>
    )
}
