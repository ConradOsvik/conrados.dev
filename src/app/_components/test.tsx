'use client'

import { Button } from '~/components/ui'

export default function Test() {
    return (
        <Button intent="secondary" onPress={() => alert('Hello')}>
            Click
        </Button>
    )
}
