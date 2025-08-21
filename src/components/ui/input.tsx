import {InputHTMLAttributes, ReactNode, useId, FC} from 'react';
import {cn} from '../../util/cn';

interface MainOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  formProps?: {
    maxLength: number;
    textCount: number;
  };
  containerClassName?: string;
  label?: ReactNode;
}

const Input: FC<MainOptionProps> = ({containerClassName, className, formProps, label, ...rest}) => {
  const id = useId();

  return (
    <div className={containerClassName} aria-controls={id}>
      {label && (
        <label
          className="mb-2 flex items-center justify-between pr-3 text-sm font-medium text-gray-900"
          htmlFor={id}
        >
          {label}

          {formProps && (
            <data
              data-invalid={formProps.textCount > formProps.maxLength || formProps.textCount === 0}
              className="text-xs font-normal text-gray-500 data-[invalid=true]:text-red-500"
              value={formProps.textCount}
              aria-label="현재 입력된 텍스트 길이"
            >
              ({formProps.textCount}/{formProps.maxLength})자
            </data>
          )}
        </label>
      )}
      <input
        className={cn(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500',
          className
        )}
        type="text"
        required
        id={id}
        {...rest}
      />
    </div>
  );
};

export default Input;
