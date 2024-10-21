import {InputHTMLAttributes, useId} from 'react';

import {cn} from '../../util/cn';

interface MainCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

export const MainCheckbox = ({
  label,
  containerClassName,
  ...rest
}: MainCheckboxProps) => {
  const id = useId();

  return (
    <div className={cn('flex items-center', containerClassName)}>
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        id={id}
        type="checkbox"
        {...rest}
      />
      <label
        htmlFor={id}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};
