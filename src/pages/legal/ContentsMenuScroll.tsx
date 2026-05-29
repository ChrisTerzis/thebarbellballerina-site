import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Scrollable “Contents” column; scrollbar is hidden for a cleaner left rail beside the divider.
 */
export default function ContentsMenuScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative min-h-0 min-w-0', className)}>
      <div className="scrollbar-hide max-h-[calc(100vh-7rem)] min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
