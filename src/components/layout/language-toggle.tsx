'use client'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { LanguageIcon } from '@heroicons/react/24/solid'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '~/i18n/navigation'
import { Locale } from '~/i18n/config'

export const LanguageToggle = () => {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const changeLocale = (locale: Locale) => {
        router.push(pathname, { locale: locale })
    }

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
