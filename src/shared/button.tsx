import {ButtonHTMLAttributes} from 'react';

import {cn} from '../util/cn';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
}

export const Button = ({children, className, ...props}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
