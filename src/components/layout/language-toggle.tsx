'use client'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { LanguageIcon } from '@heroicons/react/24/solid'
import { useChangeLocale, useCurrentLocale } from '~/locales/client'

export default function LanguageToggle() {
    const changeLocale = useChangeLocale()
    const locale = useCurrentLocale()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="my-2 size-10 cursor-pointer"
                >
                    <LanguageIcon className="size-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={locale === 'en'}
                    onCheckedChange={() => changeLocale('en')}
                >
                    English
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={locale === 'no'}
                    onCheckedChange={() => changeLocale('no')}
                >
                    Norwegian
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
