import { CalendarDays, ChevronRight, Eye, Share2, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { News } from '../types/news.types';

export interface NewsCardProps {
  news: News;
  variant?: 'default' | 'compact' | 'featured';
}

const formatDate = (date: string) => {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return '—';

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(value);
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Công nghệ': 'bg-blue-500/10 text-blue-600 border-blue-200',
    'Kinh doanh': 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    'Sức khỏe': 'bg-rose-500/10 text-rose-600 border-rose-200',
    'Giáo dục': 'bg-amber-500/10 text-amber-600 border-amber-200',
    'Giải trí': 'bg-purple-500/10 text-purple-600 border-purple-200',
    'Thể thao': 'bg-orange-500/10 text-orange-600 border-orange-200',
  };
  return colors[category] || 'bg-slate-500/10 text-slate-600 border-slate-200';
};

export const NewsCard = ({ news, variant = 'default' }: NewsCardProps) => {
  const navigate = useNavigate();

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: news.title,
        url: window.location.origin + `/news/${news.id}`,
      });
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle bookmark logic here
    console.log('Bookmark:', news.id);
  };

  if (variant === 'compact') {
    return (
      <Card
        className={cn(
          'group cursor-pointer p-0 overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-md',
        )}
        onClick={() => navigate(`/news/${news.id}`)}
      >
        <CardContent className="flex gap-4 p-3">
          <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
            {news.thumbnail ? (
              <img
                src={news.thumbnail}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-xs font-medium text-slate-500">
                Tin tức
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1.5">
            <span className="inline-block text-[10px] font-medium text-blue-600">
              {news.category}
            </span>
            <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-blue-600">
              {news.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3" />
                {formatDate(news.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card
        className={cn(
          'group relative cursor-pointer p-0 overflow-hidden border-0 bg-white transition-all duration-500 hover:shadow-2xl',
        )}
        onClick={() => navigate(`/news/${news.id}`)}
      >
        <div className="relative h-80 overflow-hidden">
          {news.thumbnail ? (
            <>
              <img
                src={news.thumbnail}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <span className="text-lg font-semibold">Tin tức nổi bật</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {news.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/80">
                <CalendarDays className="size-3.5" />
                {formatDate(news.createdAt)}
              </span>
            </div>
            <h3 className="line-clamp-2 text-2xl font-bold leading-tight group-hover:underline">
              {news.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {news.summary || 'Không có mô tả ngắn.'}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/30">
                Đọc tiếp
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'group h-full p-0 cursor-pointer overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl',
      )}
      onClick={() => navigate(`/news/${news.id}`)}
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        {news.thumbnail ? (
          <img
            src={news.thumbnail}
            alt={news.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-sm font-medium text-slate-500">
            Tin tức
          </div>
        )}

        {/* Badge overlay */}
        <div className="absolute left-3 top-3">
          <span className={cn(
            'rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm',
            getCategoryColor(news.category)
          )}>
            {news.category}
          </span>
        </div>

        {/* Action buttons */}
        <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={handleBookmark}
            className="rounded-full bg-white/90 p-1.5 text-slate-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-blue-600"
            aria-label="Bookmark"
          >
            <Bookmark className="size-4" />
          </button>
          <button
            onClick={handleShare}
            className="rounded-full bg-white/90 p-1.5 text-slate-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-blue-600"
            aria-label="Share"
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </div>

      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatDate(news.createdAt)}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Eye className="size-3.5" />
            {Math.floor(Math.random() * 1000) + 100}
          </span>
        </div>

        <div className="space-y-2.5">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
            {news.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {news.summary || 'Không có mô tả ngắn.'}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <span>Đọc tiếp</span>
            <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-200/50 to-transparent ml-4" />
        </div>
      </CardContent>
    </Card>
  );
};