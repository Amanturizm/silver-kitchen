import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  to: string;
  content?: string;
  withoutIcon?: boolean;
}

const AddButton: React.FC<Props> = ({ to, content, withoutIcon = false }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(to)}
      className="rounded-md bg-green-600 text-white py-2 px-4 hover:bg-green-700 transition cursor-pointer flex items-center gap-2"
    >
      {!withoutIcon && <Plus size={18} />}
      {content || 'Создать'}
    </button>
  );
};

export default AddButton;
