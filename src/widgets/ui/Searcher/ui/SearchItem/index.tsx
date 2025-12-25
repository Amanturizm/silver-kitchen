import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToMain } from '@/shared/constants';

interface Props extends PropsWithChildren {
  to: string;
}

const SearchItem: React.FC<Props> = ({ to, children }) => {
  const router = useRouter();

  return (
    <li
      className="px-4 max-[992px]:px-3 py-2 max-[992px]:py-1.5 hover:bg-gray-100 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis max-[992px]:text-sm"
      onClick={() => {
        router.push(to, { scroll: false });

        scrollToMain();
      }}
    >
      {children}
    </li>
  );
};

export default SearchItem;
