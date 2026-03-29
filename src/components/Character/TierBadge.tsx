import clsx from 'clsx'

interface TierBadgeProps {
  tier: 'free' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * TierBadge component to display whether a character is FREE or PREMIUM.
 * Built with DaisyUI badge component.
 */
export function TierBadge({ tier, size = 'md', className }: TierBadgeProps) {
  const isPremium = tier === 'premium'

  return (
    <div
      className={clsx(
        'badge font-black uppercase tracking-tighter shadow-sm shrink-0',
        {
          'badge-success text-success-content': tier === 'free',
          'bg-gradient-to-tr from-warning to-amber-500 border-none text-warning-content shadow-warning/20':
            isPremium,
          'badge-sm h-4 text-[8px]': size === 'sm',
          'badge-md h-5 text-[10px]': size === 'md',
          'badge-lg h-6 text-[12px]': size === 'lg',
        },
        className
      )}
    >
      {isPremium ? <span className="flex items-center gap-1">Premium</span> : 'Free'}
    </div>
  )
}
