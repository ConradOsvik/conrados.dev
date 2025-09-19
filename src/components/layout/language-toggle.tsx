'use client'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { LanguageIcon } from '@heroicons/react/24/solid'
import { useChangeLocale, useCurrentLocale } from '~/locales/client'

export const LanguageToggle = () => {
    const changeLocale = useChangeLocale()
    const locale = useCurrentLocale()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-10">
                    <LanguageIcon className="size-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
