import { NewsCard } from './NewsCard';
import type { News } from '../types/news.types';

interface NewsListProps {
  news: News[];
}

export const NewsList = ({ news }: NewsListProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};
