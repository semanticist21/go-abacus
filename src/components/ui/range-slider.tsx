import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {cn} from '@/util/cn';

interface RangeSliderProps {
  label?: string;
  containerClassName?: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

const RangeSlider = ({
  label,
  containerClassName,
  min,
  max,
  value,
  onChange,
  step = 1,
}: RangeSliderProps) => {
  return (
    <div className={cn('flex flex-col gap-3', containerClassName)}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="px-1">
        <Slider
          range
          min={min}
          max={max}
          value={value}
          onChange={(val) => onChange(val as [number, number])}
          step={step}
          styles={{
            rail: {
              backgroundColor: '#e5e7eb',
              height: 4,
            },
            track: {
              backgroundColor: '#3b82f6',
              height: 4,
            },
            handle: {
              backgroundColor: '#3b82f6',
              border: '2px solid #ffffff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: 16,
              height: 16,
              marginTop: -6,
            },
          }}
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