import {ReactNode, FC} from 'react';
import {cn} from '../../util/cn';

interface ShinyTextProps {
  className?: string;
  disabled?: boolean;
  text: ReactNode;
  speed?: number;
}

const ShinyText: FC<ShinyTextProps> = ({disabled = false, className = '', speed = 5, text}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      style={{
        animationDuration: animationDuration,
      }}
      className={cn('relative inline-block', className)}
    >
      <span
        style={{
          background: !disabled
            ? 'linear-gradient(120deg, #6B7280 30%, #D1D5DB 50%, #6B7280 70%)'
            : '#6B7280',
          animationDuration: animationDuration,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
        }}
        className={cn('relative z-10', !disabled && 'animate-shine')}
      >
        {text}
      </span>
    </div>
  );
};

export default ShinyText;
