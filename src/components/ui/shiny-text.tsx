import {FC} from 'react';

import {cn} from '../../util/cn';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: FC<ShinyTextProps> = ({text, disabled = false, speed = 5, className = ''}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={cn('relative inline-block', className)}
      style={{
        animationDuration: animationDuration,
      }}
    >
      <span
        className={cn('relative z-10', !disabled && 'animate-shine')}
        style={{
          background: !disabled
            ? 'linear-gradient(120deg, #6B7280 30%, #D1D5DB 50%, #6B7280 70%)'
            : '#6B7280',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animationDuration: animationDuration,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default ShinyText;
