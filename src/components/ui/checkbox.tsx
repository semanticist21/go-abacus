import {FC, HTMLAttributes, InputHTMLAttributes, useId} from 'react';
import {Except} from 'type-fest';

import {cn} from '../../util/cn';

interface MainCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  containerProps?: Except<HTMLAttributes<HTMLDivElement>, 'aria-controls' | 'className'>;
}

export const Checkbox: FC<MainCheckboxProps> = ({
  label,
  containerClassName,
  containerProps: divProps,
  ...rest
}) => {
  const id = useId();

  return (
    <div
      aria-controls={id}
      className={cn('flex cursor-pointer items-center', containerClassName)}
      {...divProps}
    >
      <input
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
        id={id}
        type="checkbox"
        {...rest}
      />
      <label
        className="ms-2 cursor-pointer text-sm font-medium text-gray-900 select-none"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
