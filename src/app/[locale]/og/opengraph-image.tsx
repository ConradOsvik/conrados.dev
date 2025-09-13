import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 1024,
    height: 1024
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    // Load Inter from Fontsource (WOFF, supported by Satori). Only include fonts if fetch succeeds.
    const inter = await (
        await fetch(
            'https://unpkg.com/@fontsource/inter@5.0.17/files/inter-latin-700-normal.woff',
            { headers: { Accept: 'application/font-woff,*/*' } }
        )
    ).arrayBuffer()

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent'
                }}
            >
                <div
                    style={{
                        borderRadius: '9999px',
                        width: '75%',
                        height: '75%',
                        backgroundColor: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    >
                        <path
                            d="M50 50 L50 0 A50 50 0 0 1 100 50 Z"
                            fill="white"
                        />
                    </svg>
                    <div
                        style={{
                            width: '75%',
                            height: '75%',
                            backgroundColor: 'white',
                            borderRadius: '9999px'
                        }}
                    ></div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: inter,
                    style: 'normal',
                    weight: 700
                }
            ]
        }
    )
}
