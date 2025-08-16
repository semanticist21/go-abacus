import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import {ReactNode} from 'react';

import {cn} from '@/util/cn';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({children, content, side = 'top', className}: TooltipProps) => {
  return (
    <TooltipPrimitive.Root delayDuration={100}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          className={cn(
            'z-50 max-w-xs overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md',
            className
          )}
          sideOffset={8}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-gray-900" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

export {Tooltip, TooltipProvider};
