'use client';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  id: number;
  name: string;
}

interface Props {
  chain: BreadcrumbItem[];
  startPath: string;
  startPathTitle?: string;
  paramName?: string;
}

export const Breadcrumbs = ({ chain, startPath, startPathTitle, paramName }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-[16px]">
      <button
        className="text-gray-600 cursor-pointer hover:underline"
        onClick={() => router.push(startPath)}
      >
        {startPathTitle || 'Все'}
      </button>

      {chain.map((c) => (
        <div key={c.id} className="flex items-center gap-2">
          <span className="text-gray-400">{'>'}</span>
          <button
            className="text-gray-600 cursor-pointer hover:underline"
            onClick={() => router.push(`${startPath}?${paramName}=${c.id}`)}
          >
            {c.name}
          </button>
        </div>
      ))}
    </div>
  );
};
