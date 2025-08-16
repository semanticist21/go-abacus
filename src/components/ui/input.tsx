import {FC, InputHTMLAttributes, ReactNode, useId} from 'react';

import {cn} from '../../util/cn';

interface MainOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  containerClassName?: string;
  formProps?: {
    textCount: number;
    maxLength: number;
  };
}

const Input: FC<MainOptionProps> = ({label, containerClassName, className, formProps, ...rest}) => {
  const id = useId();

  return (
    <div aria-controls={id} className={containerClassName}>
      {label && (
        <label
          className="mb-2 flex items-center justify-between pr-3 text-sm font-medium text-gray-900"
          htmlFor={id}
        >
          {label}

          {formProps && (
            <data
              aria-label="현재 입력된 텍스트 길이"
              className="text-xs font-normal text-gray-500 data-[invalid=true]:text-red-500"
              data-invalid={formProps.textCount > formProps.maxLength || formProps.textCount === 0}
              value={formProps.textCount}
            >
              ({formProps.textCount}/{formProps.maxLength})자
            </data>
          )}
        </label>
      )}
      <input
        id={id}
        type="text"
        className={cn(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500',
          className
        )}
        required
        {...rest}
      />
    </div>
  );
};

export default Input;
