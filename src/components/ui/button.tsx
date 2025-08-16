import {ButtonHTMLAttributes, FC} from 'react';

import {cn} from '../../util/cn';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({children, className, ...props}) => {
  return (
    <button
      type="button"
      className={cn(
        'cursor-pointer rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
