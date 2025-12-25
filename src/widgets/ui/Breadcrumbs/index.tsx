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
  endPathTitle?: string | null;
}

export const Breadcrumbs = ({
  chain,
  startPath,
  startPathTitle,
  paramName,
  endPathTitle,
}: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2 text-[16px]">
      <button
        className="text-gray-600 cursor-pointer hover:underline"
        onClick={() => router.push(startPath)}
      >
        {startPathTitle || 'Все'}
      </button>

      {chain.map((c) => (
        <div key={c.id} className="flex items-center gap-2">
          <span className="text-gray-400 cursor-default">{'>'}</span>
          <button
            className="text-gray-600 cursor-pointer hover:underline"
            onClick={() => router.push(`${startPath}?${paramName}=${c.id}`)}
          >
            {c.name}
          </button>
        </div>
      ))}

      {endPathTitle && (
        <div className="flex items-center gap-2">
          <span className="text-gray-400 cursor-default">{'>'}</span>
          <span className="text-gray-600">{endPathTitle}</span>
        </div>
      )}
    </div>
  );
};
