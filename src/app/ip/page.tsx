'use client'

import { Fragment, useState } from 'react'
import { NumberField, TextField } from '~/components/ui'
import { InputOTP } from '~/components/ui/input-otp'

export default function IpPage() {
    const [binary, setBinary] = useState('00000000000000000000000000000000')
    const ip =
        binary
            .match(/.{1,8}/g)
            ?.map((segment) => parseInt(segment, 2))
            .join('.') ?? ''

    return (
        <main className="mt-12 flex flex-col items-center justify-center">
            <div>
                <IpFieldGroup />
            </div>
            <InputOTP maxLength={32} value={binary} onChange={setBinary}>
                <InputOTP.Group>
                    {Array.from({ length: 4 }, (_, i) => (
                        <Fragment key={i}>
                            {Array.from({ length: 8 }, (_, j) => (
                                <InputOTP.Slot key={j} index={i * 8 + j} />
                            ))}
                            {i < 3 && <span>.</span>}
                        </Fragment>
                    ))}
                </InputOTP.Group>
            </InputOTP>

            <h1 className="mt-12 text-4xl font-bold">{ip}</h1>
        </main>
    )
}

function IpFieldGroup() {
    return Array.from({ length: 8 }, (_, i) => (
        <TextField
            type="number"
            key={i}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const input = e.currentTarget

                input.value = input.value.replace(/[^01]/g, '')

                if (input.value.length > 1) {
                    input.value = input.value.slice(-1)
                }

                const value = parseInt(input.value, 10)
                if (isNaN(value)) {
                    input.value = ''
                } else if (value > 1) {
                    input.value = '1'
                }

                if (input.value && i < 7) {
                    const nextInput =
                        input.parentElement?.nextElementSibling?.querySelector(
                            'input'
                        ) as HTMLInputElement | null

                    console.log(input)

                    if (nextInput) {
                        nextInput.focus()
                    }
                }
            }}
        />
    ))
}
