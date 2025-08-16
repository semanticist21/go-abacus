import {useMultiplyOptionStore} from '@/pages/multiply/store';

import Select from '@/components/ui/select';
import {BookText, DivideIcon, Save, X} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Checkbox} from '../../components/ui/checkbox';
import Input from '../../components/ui/input';
import RangeSlider from '../../components/ui/range-slider';
import {Tooltip} from '../../components/ui/tooltip';

const MultiplyBody = () => {
  const {options, setOptions} = useMultiplyOptionStore();
  const [divideRangeError, setDivideRangeError] = useState(false);
  const [multiplyRangeError, setMultiplyRangeError] = useState(false);

  const validateDivideRanges = () => {
    if (options.big_divide_min_digit < options.small_divide_max_digit) {
      setDivideRangeError(true);
      toast.dismiss();
      toast.error('에러', {
        description: '큰 수의 최소 자리수가 작은 수의 최대 자리수보다 작을 수 없습니다.',
      });
      return false;
    }
    setDivideRangeError(false);
    return true;
  };

  const validateMultiplyRanges = () => {
    if (options.multiply_min_digit > options.multiply_max_digit) {
      setMultiplyRangeError(true);
      toast.dismiss();
      toast.error('에러', {
        description: '최소 자리수가 최대 자리수보다 클 수 없습니다.',
      });
      return false;
    }
    setMultiplyRangeError(false);
    return true;
  };

  return (
    <main className="scrollbar-overlay flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-4">
      <fieldset className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex items-center gap-2 rounded-md text-gray-400 transition-colors">
          <Save className="size-4" /> 저장
        </legend>

        <Input
          containerClassName="flex-1"
          label="파일 이름"
          placeholder="저장할 파일 이름 (ex. 주산곱셈나눗셈)"
          spellCheck={false}
          value={options.file_name}
          onChange={(e) => setOptions({file_name: e.target.value})}
        />
      </fieldset>

      <fieldset className="flex w-full flex-col gap-4 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
          <BookText className="size-4" /> 문서
        </legend>

        <div className="grid w-full grid-cols-3 items-end gap-2">
          <Input
            containerClassName="flex-1"
            label="문서 제목"
            placeholder="문서 제목 (ex. LEVEL 1)"
            spellCheck={false}
            value={options.title}
            formProps={{
              textCount: options.title.length,
              maxLength: 30,
            }}
            onChange={(e) => setOptions({title: e.target.value})}
          />
          <Input
            containerClassName="flex-1"
            label="문서 부제목"
            placeholder="문서 부제목 (ex. 주산 곱셈 나눗셈)"
            spellCheck={false}
            value={options.subtitle}
            formProps={{
              textCount: options.subtitle.length,
              maxLength: 30,
            }}
            onChange={(e) => setOptions({subtitle: e.target.value})}
          />
          <Input
            containerClassName="flex-1"
            max={20}
            min={1}
            placeholder="생성할 문제 페이지 수 (ex. 10)"
            type="number"
            value={options.page_count}
            label={
              <>
                생성할 페이지 수<span className="text-xs text-gray-400"> (~100p)</span>
              </>
            }
            onChange={(e) => setOptions({page_count: Number(e.target.value)})}
          />
          <Select
            containerClassName="w-48"
            label="문제 유형"
            value={options.generation_mode}
            onChange={(e) =>
              setOptions({generation_mode: e.target.value as 'divide' | 'multiply' | 'mix'})
            }
          >
            <option value="mix">곱셈 + 나눗셈</option>
            <option value="multiply">곱셈만</option>
            <option value="divide">나눗셈만</option>
          </Select>
          <Tooltip content="0, 1이 포함된 쉬운 문제를 제외합니다.">
            <div className="cursor-help">
              <Checkbox
                checked={options.exclude_easy}
                label="쉬운 문제 제외"
                onChange={(e) => setOptions({exclude_easy: e.target.checked})}
              />
            </div>
          </Tooltip>
        </div>
      </fieldset>

      {(options.generation_mode === 'divide' || options.generation_mode === 'mix') && (
        <fieldset className="flex w-full flex-col gap-4 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
          <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
            <DivideIcon className="size-4" /> 나눗셈 설정
          </legend>

          <div className="grid w-full grid-cols-3 gap-4">
            <RangeSlider
              label="큰 수 자리수 범위"
              max={7}
              min={1}
              tooltip="나눗셈에서 피제수(나누어지는 수)의 자릿수 범위를 설정합니다."
              value={[options.big_divide_min_digit, options.big_divide_max_digit]}
              hasError={divideRangeError}
              onChange={([min, max]) =>
                setOptions({
                  big_divide_min_digit: min,
                  big_divide_max_digit: max,
                })
              }
              onBlur={validateDivideRanges}
            />
            <RangeSlider
              label="작은 수 자리수 범위"
              max={7}
              min={1}
              tooltip="나눗셈에서 제수(나누는 수)의 자릿수 범위를 설정합니다."
              value={[options.small_divide_min_digit, options.small_divide_max_digit]}
              hasError={divideRangeError}
              onChange={([min, max]) =>
                setOptions({
                  small_divide_min_digit: min,
                  small_divide_max_digit: max,
                })
              }
              onBlur={validateDivideRanges}
            />
          </div>
        </fieldset>
      )}

      {(options.generation_mode === 'multiply' || options.generation_mode === 'mix') && (
        <fieldset className="flex w-full flex-col gap-4 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
          <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
            <X className="size-5" /> 곱셈 설정
          </legend>

          <div className="grid w-full grid-cols-3 gap-4">
            <Select
              containerClassName="flex-1"
              label="곱셈 순서"
              value={options.multiply_order}
              onChange={(e) =>
                setOptions({
                  multiply_order: e.target.value as 'mix' | 'large_first' | 'small_first' | 'swap',
                })
              }
            >
              <option value="mix">혼합</option>
              <option value="large_first">큰 수 먼저</option>
              <option value="small_first">작은 수 먼저</option>
              <option value="swap">교대로</option>
            </Select>
            <RangeSlider
              label="자리수 범위"
              max={7}
              min={1}
              tooltip="곱셈에서 사용할 숫자의 자릿수 범위를 설정합니다."
              value={[options.multiply_min_digit, options.multiply_max_digit]}
              hasError={multiplyRangeError}
              onChange={([min, max]) =>
                setOptions({
                  multiply_min_digit: min,
                  multiply_max_digit: max,
                })
              }
              onBlur={validateMultiplyRanges}
            />
          </div>
        </fieldset>
      )}
    </main>
  );
};

export default MultiplyBody;
