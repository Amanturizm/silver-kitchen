'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { InputField } from '@/widgets/ui/InputField';

type Option = {
  label: string;
  value: string;
};

type TableFilterProps = {
  name: string;
  label?: string;
  options: Option[];
};

const TableFilter = ({ name, label, options }: TableFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get(name) || '';

  const handleChange = (value: string) => {
    const p = new URLSearchParams(params.toString());
    if (!value) p.delete(name);
    else p.set(name, value);
    router.push(`${pathname}?${p.toString()}`);
  };

  return (
    <InputField
      type="select"
      name={name}
      label={label}
      options={options}
      value={current}
      onChange={handleChange}
    />
  );
};

export default TableFilter;
