import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {cn} from '@/util/cn';
import {Tooltip} from './tooltip';

interface RangeSliderProps {
  onChange: (value: [number, number]) => void;
  containerClassName?: string;
  value: [number, number];
  onBlur?: () => void;
  hasError?: boolean;
  tooltip?: string;
  label?: string;
  step?: number;
  max: number;
  min: number;
}

const RangeSlider = ({
  containerClassName,
  hasError = false,
  onChange,
  step = 1,
  tooltip,
  onBlur,
  label,
  value,
  max,
  min,
}: RangeSliderProps) => {
  const labelContent = (
    <span className="cursor-help text-sm font-medium text-gray-700">{label}</span>
  );

  return (
    <div className={cn('flex flex-col gap-3', containerClassName)}>
      {label &&
        (tooltip ? (
          <Tooltip content={tooltip}>{labelContent}</Tooltip>
        ) : (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        ))}
      <div className="px-1">
        <Slider
          styles={{
            handle: {
              backgroundColor: hasError ? '#ef4444' : '#3b82f6',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '2px solid #ffffff',
              marginTop: -6,
              height: 16,
              width: 16,
            },
            track: {
              backgroundColor: hasError ? '#ef4444' : '#3b82f6',
              height: 4,
            },
            rail: {
              backgroundColor: hasError ? '#fecaca' : '#e5e7eb',
              height: 4,
            },
          }}
          onChange={(val) => onChange(val as [number, number])}
          onAfterChange={onBlur}
          value={value}
          step={step}
          max={max}
          min={min}
          range
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>최소: {value[0]}</span>
        <span>최대: {value[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
