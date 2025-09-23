'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function ProfileImage() {
    const imageRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState('')
    const [glareStyle, setGlareStyle] = useState({})
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        // Detect if device supports touch
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

        // Calculate rotation (inverted for tilt effect) - reduced intensity
        const rotateX = ((y - centerY) / centerY) * -5 // Max 5 degrees (reduced from 10)
        const rotateY = ((x - centerX) / centerX) * 5 // Max 5 degrees (reduced from 10)

        // Calculate glare position (opposite to mouse)
        const glareX = ((centerX - x) / centerX) * 50 + 50 // 0-100%
        const glareY = ((centerY - y) / centerY) * 50 + 50 // 0-100%

        setTransform(
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`
        )
        setGlareStyle({
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
            opacity: 1
        })
    }

    const handleMouseLeave = () => {
        setTransform(
            'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        )
        setGlareStyle({ opacity: 0 })
    }

    return (
        <div
            ref={imageRef}
            className="relative w-full overflow-hidden rounded-md transition-transform duration-200 ease-out hover:scale-105"
            style={{ transform }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src="/profile.jpg"
                alt="Conrad Osvik"
                width={150}
                height={200}
                className="h-auto w-full object-cover shadow-lg"
                priority
            />
            {/* Glare overlay */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={glareStyle}
            />
        </div>
    )
}
