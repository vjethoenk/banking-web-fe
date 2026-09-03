import { ArrowLeft, CalendarDays, Tag, Share2, Bookmark, Clock, Eye, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { News } from '../types/news.types';

interface NewsDetailProps {
  news: News;
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

const formatDateFull = (date: string) => {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return '—';

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value);
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Công nghệ': 'bg-blue-500 text-white',
    'Kinh doanh': 'bg-emerald-500 text-white',
    'Sức khỏe': 'bg-rose-500 text-white',
    'Giáo dục': 'bg-amber-500 text-white',
    'Giải trí': 'bg-purple-500 text-white',
    'Thể thao': 'bg-orange-500 text-white',
  };
  return colors[category] || 'bg-slate-500 text-white';
};

export const NewsDetail = ({ news }: NewsDetailProps) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary || '',
          url: url,
        });
      } catch (error) {
        // User cancelled
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Save to localStorage or API
    console.log('Bookmark toggled:', news.id);
  };

  const handlePrint = () => {
    window.print();
  };

  // Simulate reading time (about 200 words per minute)
  const readingTime = Math.max(1, Math.ceil((news.content?.length || 0) / 1000 / 200 * 60));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            className="group gap-2 px-4 text-slate-600 transition-all hover:-translate-x-1 hover:text-blue-600"
            onClick={() => navigate('/news')}
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Quay lại tin tức
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-slate-600 hover:text-blue-600"
              onClick={handleBookmark}
            >
              <Bookmark className={cn("size-4", isBookmarked && "fill-blue-600 text-blue-600")} />
              <span className="hidden sm:inline">{isBookmarked ? 'Đã lưu' : 'Lưu'}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-slate-600 hover:text-blue-600"
              onClick={handleShare}
            >
              <Share2 className="size-4" />
              <span className="hidden sm:inline">{isCopied ? 'Đã sao chép!' : 'Chia sẻ'}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden gap-1.5 text-slate-600 hover:text-blue-600 sm:flex"
              onClick={handlePrint}
            >
              <Printer className="size-4" />
              In
            </Button>
          </div>
        </div>

        {/* Main Article */}
        <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 transition-all">
          {/* Header */}
          <header className="border-b border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white p-6 sm:p-10 lg:p-12">
            {/* Category & Meta */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm',
                getCategoryColor(news.category)
              )}>
                <Tag className="size-3.5" />
                {news.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <CalendarDays className="size-4" />
                {formatDateFull(news.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Clock className="size-4" />
                {readingTime} phút đọc
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Eye className="size-4" />
                {Math.floor(Math.random() * 5000) + 1000} lượt xem
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
              {news.title}
            </h1>

            {/* Divider */}
            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </header>

          {/* Thumbnail */}
          {news.thumbnail && (
            <div className="relative border-b border-slate-200/80 bg-slate-100">
              <img
                src={news.thumbnail}
                alt={news.title}
                className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[480px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            {/* Summary */}
            {news.summary && (
              <div className="mb-8 rounded-2xl border-l-4 border-blue-500 bg-blue-50/60 p-5 backdrop-blur-sm">
                <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
                  <span className="mr-2 text-blue-500">✦</span>
                  {news.summary}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:pr-4 sm:prose-lg lg:prose-xl">
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>

            {/* Footer Divider */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Kết thúc</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>

            {/* Share Bottom */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50/80 p-4">
              <span className="text-sm font-medium text-slate-600">Chia sẻ bài viết</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  onClick={handleShare}
                >
                  <Share2 className="size-4" />
                  Chia sẻ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  onClick={handleBookmark}
                >
                  <Bookmark className={cn("size-4", isBookmarked && "fill-blue-600 text-blue-600")} />
                  {isBookmarked ? 'Đã lưu' : 'Lưu bài'}
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Back to top button */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="ghost"
            className="gap-2 text-sm text-slate-500 hover:text-blue-600"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowLeft className="size-4 rotate-90" />
            Lên đầu trang
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function for className merging
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};