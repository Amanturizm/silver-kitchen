import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

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

        setTimeout(() => {
          const el = document.getElementById(`products`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }}
    >
      {children}
    </li>
  );
};

export default SearchItem;
