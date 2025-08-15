import {HTMLAttributes, InputHTMLAttributes, useId} from 'react';
import {Except} from 'type-fest';

import {cn} from '../../util/cn';

interface MainCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  containerProps?: Except<HTMLAttributes<HTMLDivElement>, 'aria-controls' | 'className'>;
}

export const MainCheckbox = ({
  label,
  containerClassName,
  containerProps: divProps,
  ...rest
}: MainCheckboxProps) => {
  const id = useId();

  return (
    <div
      className={cn('flex items-center cursor-pointer', containerClassName)}
      aria-controls={id}
      {...divProps}
    >
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        id={id}
        type="checkbox"
        {...rest}
      />
      <label
        htmlFor={id}
        className="ms-2 text-sm font-medium text-gray-900 select-none cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};
