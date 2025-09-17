interface LogoProps {
    size?: number
    className?: string
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
    // Same design constants as the logo generator
    const DESIGN_CONFIG = {
        baseSize: 800,
        dotRadius: 140,
        innerRadius: 220,
        ringThickness: 80,
        startAngleDeg: 30,
        endAngleDeg: 330
    }

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
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`fill-foreground ${className}`}
            aria-label="Logo"
        >
            {/* Central dot */}
            <circle cx={centerX} cy={centerY} r={dotRadius} />
            {/* C-shaped ring */}
            <path d={ringPath} />
        </svg>
    )
}
