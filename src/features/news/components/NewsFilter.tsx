import {
  Search,
  RotateCcw,
  Filter,
  X,
  ChevronDown,
  BookOpen,
  Newspaper,
  Shield,
  Zap,
  Wallet,
  Megaphone,
  Brain,
  CheckCircle,
  FileText,
  Hash
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const categoryOptions = [
  { value: '', label: 'Tất cả danh mục', icon: Hash },
  { value: 'Tin tức', label: 'Tin tức', icon: Newspaper },
  { value: 'Hướng dẫn', label: 'Hướng dẫn', icon: BookOpen },
  { value: 'Bảo mật', label: 'Bảo mật', icon: Shield },
  { value: 'Tính năng', label: 'Tính năng', icon: Zap },
  { value: 'Tài chính', label: 'Tài chính', icon: Wallet },
  { value: 'Thông báo', label: 'Thông báo', icon: Megaphone },
  { value: 'Kiến thức', label: 'Kiến thức', icon: Brain },
];

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'draft', label: 'Bản nháp' },
];

interface NewsFilterProps {
  search: string;
  category: string;
  published: boolean | null;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPublishedChange: (value: boolean | null) => void;
  onReset: () => void;
  totalResults?: number;
}

export const NewsFilter = ({
  search,
  category,
  published,
  onSearchChange,
  onCategoryChange,
  onPublishedChange,
  onReset,
  totalResults,
}: NewsFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasActiveFilters = search || category || published !== null;

  const getActiveFilterCount = () => {
    let count = 0;
    if (search) count++;
    if (category) count++;
    if (published !== null) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Get category icon component
  const getCategoryIcon = (categoryValue: string) => {
    const option = categoryOptions.find(opt => opt.value === categoryValue);
    if (!option) return Hash;
    return option.icon;
  };

  // const CategoryIcon = getCategoryIcon(category);

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/80 shadow-lg shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="relative">
                <Search className={cn(
                  "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 transition-colors duration-200",
                  isSearchFocused ? "text-blue-500" : "text-slate-400"
                )} />
                <Input
                  ref={searchInputRef}
                  value={search}
                  onChange={(event) => onSearchChange(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={cn(
                    "h-11 pl-10 pr-12 text-sm transition-all duration-200",
                    "border-slate-200 bg-slate-50/50 focus:bg-white",
                    "focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20",
                    isSearchFocused && "border-blue-400 bg-white shadow-sm"
                  )}
                  placeholder="Tìm kiếm tin tức..."
                />
                {search && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="size-3.5" />
                  </button>
                )}

              </div>
            </div>

            {/* Filter Toggle (Mobile) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2 border-slate-200"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Filter className="size-4" />
                Bộ lọc
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
                <ChevronDown className={cn(
                  "size-4 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )} />
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-slate-500 hover:text-red-600"
                  onClick={onReset}
                >
                  <RotateCcw className="size-3.5" />
                  <span className="hidden xs:inline">Reset</span>
                </Button>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden items-center gap-3 lg:flex">
              <div className="w-44">
                <Select
                  value={category || 'Tất cả danh mục'}
                  onValueChange={(value) => {
                    onCategoryChange(value === 'all' || value == null ? '' : value);
                  }
                  }
                >
                  <SelectTrigger className="h-12 w-full border-slate-200 bg-slate-50/50 transition-colors hover:bg-slate-100/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <SelectItem key={option.value || 'all'} value={option.value || 'all'}>
                          <span className="flex items-center gap-2">
                            <IconComponent className="size-4" />
                            {option.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-40">
                <Select
                  value={published === null ? 'Tất cả trạng thái' : published ? 'published' : 'draft'}
                  onValueChange={(value) => {
                    if (value === 'all') onPublishedChange(null);
                    else onPublishedChange(value === 'published');
                  }}
                >
                  <SelectTrigger className="h-12 w-full border-slate-200 bg-slate-50/50 transition-colors hover:bg-slate-100/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          {option.value === 'published' && <CheckCircle className="size-4 text-emerald-500" />}
                          {option.value === 'draft' && <FileText className="size-4 text-amber-500" />}
                          {option.value === 'all' && <Hash className="size-4 text-slate-400" />}
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="h-11 gap-2 border-slate-200 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                onClick={onReset}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200/60 pt-3">
              <span className="text-xs font-medium text-slate-500">Bộ lọc đang áp dụng:</span>
              {search && (
                <Badge variant="secondary" className="gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100">
                  <Search className="size-3" />
                  {search}
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {category && (
                <Badge variant="secondary" className="gap-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100">
                  {(() => {
                    const IconComponent = getCategoryIcon(category);
                    return <IconComponent className="size-3" />;
                  })()}
                  {category}
                  <button
                    onClick={() => onCategoryChange('')}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-purple-200"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {published !== null && (
                <Badge variant="secondary" className={cn(
                  "gap-1.5",
                  published ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                )}>
                  {published ? <CheckCircle className="size-3" /> : <FileText className="size-3" />}
                  {published ? 'Đã xuất bản' : 'Bản nháp'}
                  <button
                    onClick={() => onPublishedChange(null)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-current/20"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-slate-400 hover:text-red-500"
                onClick={onReset}
              >
                Xóa tất cả
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {totalResults !== undefined && (
          <div className="border-t border-slate-200/60 bg-slate-50/50 px-5 py-2.5">
            <p className="text-xs text-slate-500">
              Tìm thấy <span className="font-semibold text-slate-700">{totalResults}</span> kết quả
              {hasActiveFilters && ` với bộ lọc hiện tại`}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Expanded Filters */}
      {isExpanded && (
        <div className="lg:hidden">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Danh mục</label>
                <Select
                  value={category || 'all'}
                  onValueChange={(value) => {
                    onCategoryChange(value === 'all' || value == null ? '' : value);
                  }}
                >
                  <SelectTrigger className="h-10 border-slate-200">
                    <SelectValue placeholder="Tất cả danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <SelectItem key={option.value || 'all'} value={option.value || 'all'}>
                          <span className="flex items-center gap-2">
                            <IconComponent className="size-4" />
                            {option.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Trạng thái</label>
                <Select
                  value={published === null ? 'all' : published ? 'published' : 'draft'}
                  onValueChange={(value) => {
                    if (value === 'all') onPublishedChange(null);
                    else onPublishedChange(value === 'published');
                  }}
                >
                  <SelectTrigger className="h-10 border-slate-200">
                    <SelectValue placeholder="Tất cả trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          {option.value === 'published' && <CheckCircle className="size-4 text-emerald-500" />}
                          {option.value === 'draft' && <FileText className="size-4 text-amber-500" />}
                          {option.value === 'all' && <Hash className="size-4 text-slate-400" />}
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200"
                  onClick={() => {
                    setIsExpanded(false);
                    onReset();
                  }}
                >
                  <RotateCcw className="mr-2 size-4" />
                  Reset tất cả
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsExpanded(false)}
                >
                  Áp dụng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for className merging
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};