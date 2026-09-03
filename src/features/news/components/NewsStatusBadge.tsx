import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { News } from '../types/news.types';

interface NewsStatusBadgeProps {
  published: News['published'];
}

export const NewsStatusBadge = ({ published }: NewsStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        'rounded-full border px-2.5 py-1 text-[11px] font-medium',
        published
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-amber-200 bg-amber-50 text-amber-700'
      )}
    >
      {published ? 'Published' : 'Draft'}
    </Badge>
  );
};
