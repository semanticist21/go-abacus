import {InputHTMLAttributes, useId} from 'react';
import {cn} from '../../util/cn';

interface MainOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  formProps?: {
    textCount: number;
    maxLength: number;
  };
}

const MainOption = ({
  label,
  containerClassName,
  className,
  formProps,
  ...rest
}: MainOptionProps) => {
  const id = useId();

  return (
    <div className={containerClassName} aria-controls={id}>
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 flex justify-between items-center pr-3"
      >
        {label}

        {formProps && (
          <data
            className="text-gray-500 text-sm data-[invalid=true]:text-red-500"
            aria-label="현재 입력된 텍스트 길이"
            value={formProps.textCount}
            data-invalid={formProps.textCount > formProps.maxLength || formProps.textCount === 0}
          >
            ({formProps.textCount}/{formProps.maxLength})자
          </data>
        )}
      </label>
      <input
        id={id}
        className={cn(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all',
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
