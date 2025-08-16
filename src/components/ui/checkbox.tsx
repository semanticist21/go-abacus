import {Check} from 'lucide-react';
import {ChangeEvent, FC, HTMLAttributes, InputHTMLAttributes, useId} from 'react';
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
  className,
  checked,
  onChange,
  disabled,
  ...rest
}) => {
  const id = useId();

  return (
    <div
      className={cn(
        'group flex items-center gap-3',
        disabled && 'opacity-50',
        containerClassName
      )}
      {...divProps}
    >
      <label
        htmlFor={id}
        className={cn(
          'relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border-2 transition-all duration-200 ease-in-out',
          'border-gray-300 bg-white shadow-xs',
          'hover:border-blue-400 hover:shadow-sm',
          'has-[:focus]:ring-2 has-[:focus]:ring-blue-500 has-[:focus]:ring-opacity-20',
          'has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:shadow has-[:checked]:scale-105',
          'group-hover:border-blue-400',
          disabled && 'cursor-not-allowed hover:border-gray-300 hover:shadow-xs'
        )}
      >
        <input
          className={cn('absolute inset-0 opacity-0', className)}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        <Check
          className={cn(
            'pointer-events-none h-3 w-3 text-white transition-all duration-200',
            checked ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          )}
          strokeWidth={3}
          aria-hidden="true"
        />
      </label>
      <label
        className={cn(
          'cursor-pointer text-sm font-medium transition-colors duration-200 select-none',
          'text-gray-700 group-hover:text-gray-900',
          checked && 'text-gray-900',
          disabled && 'cursor-not-allowed'
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
