import { useState, useRef, useEffect } from 'react'

export default function ProfileImage() {
    const imageRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState('')
    const [glareStyle, setGlareStyle] = useState({})
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        setIsTouchDevice(
            'ontouchstart' in window || navigator.maxTouchPoints > 0
        )
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current || isTouchDevice) return

        const rect = imageRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const MAX_TILT_AXIS_DEG = 5

        const rotateX = ((y - centerY) / centerY) * -MAX_TILT_AXIS_DEG
        const rotateY = ((x - centerX) / centerX) * MAX_TILT_AXIS_DEG
        const glareX = ((centerX - x) / centerX) * 50 + 50
        const glareY = ((centerY - y) / centerY) * 50 + 50

        const angle = Math.hypot(rotateX, rotateY)
        const axisX = angle ? rotateX / angle : 0
        const axisY = angle ? rotateY / angle : 0
        setTransform(
            `perspective(600px) rotate3d(${axisX}, ${axisY}, 0, ${angle}deg)`
        )
        setGlareStyle({
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
            opacity: 1
        })
    }

    const handleMouseLeave = () => {
        setTransform('perspective(600px) rotate3d(0, 0, 0, 0deg)')
        setGlareStyle({ opacity: 0 })
    }

    return (
        <div
            ref={imageRef}
            className="relative w-full origin-center overflow-hidden rounded-md transition-transform duration-150 ease-out hover:scale-105"
            style={{ transform }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src="/profile.jpg"
                alt="Conrad Osvik"
                width={150}
                height={200}
                className="h-auto w-full object-cover shadow-lg"
            />
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={glareStyle}
            />
        </div>
    )
}
