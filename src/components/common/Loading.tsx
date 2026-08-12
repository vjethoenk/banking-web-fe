import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-500/10 border-t-blue-600 animate-spin" />
        {/* Inner reverse spin ring */}
        <div className="absolute w-10 h-10 rounded-full border-4 border-indigo-500/10 border-b-indigo-500 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse tracking-wide uppercase">
        Đang tải dữ liệu...
      </p>
    </div>
  );
};

export default Loading;
