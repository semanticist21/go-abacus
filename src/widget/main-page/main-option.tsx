import {InputHTMLAttributes, useId} from 'react';

import {cn} from '../../util/cn';

interface MainOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  textCount?: string;
  containerClassName?: string;
}

const MainOption = ({
  label,
  textCount,
  containerClassName,
  className,
  ...rest
}: MainOptionProps) => {
  const id = useId();

  return (
    <div className={containerClassName} aria-controls={id}>
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-between items-center pr-3"
      >
        {label}

        {textCount && (
          <output
            className="text-gray-500 text-sm"
            name={id}
            aria-label="현재 입력된 텍스트 길이"
          >
            {textCount}
          </output>
        )}
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
