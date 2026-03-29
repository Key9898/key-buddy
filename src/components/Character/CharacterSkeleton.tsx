import clsx from 'clsx'

/**
 * CharacterSkeleton component to provide a pulsing loading state while character lazy loads.
 * Matches general character dimensions to prevent layout shifts.
 */
export function CharacterSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'w-64 h-64 bg-base-200 animate-pulse rounded-3xl relative overflow-hidden flex items-center justify-center p-8',
        className
      )}
    >
      {/* Inner body skeleton */}
      <div className="w-[80%] h-[70%] bg-base-300 rounded-[2.5rem] relative shadow-inner">
        {/* Eyes skeleton */}
        <div className="absolute top-[35%] left-[25%] flex gap-12 w-full justify-center">
          <div className="w-3 h-3 rounded-full bg-base-content/10" />
          <div className="w-3 h-3 rounded-full bg-base-content/10" />
        </div>

        {/* Paws skeleton */}
        <div className="absolute -bottom-4 left-[20%] right-[20%] flex justify-between">
          <div className="w-12 h-14 bg-base-content/5 rounded-t-2xl border border-white/5" />
          <div className="w-12 h-14 bg-base-content/5 rounded-t-2xl border border-white/5" />
        </div>
      </div>

      {/* Background gradient effect during pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  )
}
