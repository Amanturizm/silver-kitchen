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
    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
      <button
        className="text-gray-600 cursor-pointer hover:underline truncate max-w-[120px] sm:max-w-none"
        onClick={() => router.push(startPath)}
      >
        {startPathTitle || 'Все'}
      </button>

      {chain.map((c) => (
        <div key={c.id} className="flex items-center gap-2 min-w-0">
          <span className="text-gray-400 cursor-default shrink-0">{'>'}</span>
          <button
            className="text-gray-600 cursor-pointer hover:underline truncate max-w-[120px] sm:max-w-[200px] md:max-w-none"
            onClick={() => router.push(`${startPath}?${paramName}=${c.id}`)}
          >
            {c.name}
          </button>
        </div>
      ))}

      {endPathTitle && (
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-gray-400 cursor-default shrink-0">{'>'}</span>
          <span className="text-gray-600 truncate max-w-[150px] sm:max-w-[250px] md:max-w-none">
            {endPathTitle}
          </span>
        </div>
      )}
    </div>
  );
};
