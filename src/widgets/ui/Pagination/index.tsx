'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    const start = Math.max(2, page - siblingCount);
    const end = Math.min(totalPages - 1, page + siblingCount);

    pages.push(1);

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-2 py-1 h-8 rounded-md bg-gray-200 disabled:opacity-50"
        style={{
          cursor: page === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={idx}
            onClick={() => onChange(p)}
            className={`px-3.5 py-1 h-8 rounded-md cursor-pointer ${
              p === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-3 py-1 h-8 cursor-pointer">
            {p}
          </span>
        ),
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-2 py-1 h-8 rounded-md bg-gray-200 disabled:opacity-50"
        style={{
          cursor: page === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
