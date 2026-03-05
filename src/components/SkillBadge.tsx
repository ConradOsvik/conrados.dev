import { Badge } from '~/components/ui/badge'

type SkillBadgeProps = {
    label: string
    icon?: React.ReactNode
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

export default function SkillBadge({
    label,
    icon,
    variant = 'secondary'
}: SkillBadgeProps) {
    return (
        <Badge variant={variant}>
            {icon && <div className="mr-1 h-3 w-3 flex-shrink-0">{icon}</div>}
            {label}
        </Badge>
    )
}
