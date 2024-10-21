import {InputHTMLAttributes, useId} from 'react';

import {cn} from '../../util/cn';

interface MainOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

const MainOption = ({
  label,
  containerClassName,
  className,
  ...rest
}: MainOptionProps) => {
  const id = useId();

  return (
    <div className={containerClassName} aria-controls={id}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          className
        )}
        type="text"
        required
        {...rest}
      />
    </div>
  );
};

export default MainOption;
