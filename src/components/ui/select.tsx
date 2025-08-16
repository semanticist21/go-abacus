import {ChevronDown} from 'lucide-react';
import {SelectHTMLAttributes} from 'react';

import {cn} from '@/util/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  containerClassName?: string;
}

const Select = ({label, containerClassName, className, children, ...props}: SelectProps) => {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            'w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default Select;