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
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
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
