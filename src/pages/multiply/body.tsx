import {useMultiplyOptionStore} from '@/pages/multiply/store';

import {BookText, DivideIcon, File, X} from 'lucide-react';
import {Checkbox} from '../../components/ui/checkbox';
import Input from '../../components/ui/input';

const MultiplyBody = () => {
  const {options, setOptions} = useMultiplyOptionStore();

  return (
    <main className="flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-4">
      <fieldset className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex items-center gap-2 rounded-md text-gray-400 transition-colors">
          <File className="size-4" /> File
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
          <BookText className="size-4" /> Document
        </legend>

        <div className="flex w-full items-center justify-between gap-2">
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
        </div>
        <div className="flex justify-start">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">문제 유형</label>
            <select
              className="rounded border border-gray-300 px-3 py-2 text-sm"
              value={options.generation_mode}
              onChange={(e) =>
                setOptions({generation_mode: e.target.value as 'divide' | 'multiply' | 'mix'})
              }
            >
              <option value="mix">곱셈 + 나눗셈</option>
              <option value="multiply">곱셈만</option>
              <option value="divide">나눗셈만</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="flex w-full flex-col gap-4 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
          <DivideIcon className="size-4" /> 나눗셈 설정
        </legend>

        <div className="flex justify-start">
          <Input
            containerClassName="w-48"
            label="나눗셈 자리 수"
            max={7}
            min={1}
            placeholder="자리 수 (ex. 2)"
            type="number"
            value={options.big_divide_min_digit}
            onChange={(e) => setOptions({big_divide_min_digit: Number(e.target.value)})}
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">큰 수 자리수 범위</label>
            <div className="flex gap-2">
              <Input
                containerClassName="flex-1"
                label=""
                max={7}
                min={1}
                placeholder="최소"
                type="number"
                value={options.big_divide_min_digit}
                onChange={(e) => setOptions({big_divide_min_digit: Number(e.target.value)})}
              />
              <Input
                containerClassName="flex-1"
                label=""
                max={7}
                min={1}
                placeholder="최대"
                type="number"
                value={options.big_divide_max_digit}
                onChange={(e) => setOptions({big_divide_max_digit: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">작은 수 자리수 범위</label>
            <div className="flex gap-2">
              <Input
                containerClassName="flex-1"
                max={7}
                min={1}
                placeholder="최소"
                type="number"
                value={options.small_divide_min_digit}
                onChange={(e) => setOptions({small_divide_min_digit: Number(e.target.value)})}
              />
              <Input
                containerClassName="flex-1"
                max={7}
                min={1}
                placeholder="최대"
                type="number"
                value={options.small_divide_max_digit}
                onChange={(e) => setOptions({small_divide_max_digit: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="flex w-full flex-col gap-4 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
          <X className="size-5" /> 곱셈 설정
        </legend>

        <div className="flex justify-start">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">곱셈 순서</label>
            <select
              className="rounded border border-gray-300 px-3 py-2 text-sm"
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
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="grid flex-1 grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">큰 수 자리수 범위</label>
              <div className="flex gap-2">
                <Input
                  containerClassName="flex-1"
                  max={7}
                  min={1}
                  placeholder="최소"
                  type="number"
                  value={options.big_multiply_min_digit}
                  onChange={(e) => setOptions({big_multiply_min_digit: Number(e.target.value)})}
                />
                <Input
                  containerClassName="flex-1"
                  max={7}
                  min={1}
                  placeholder="최대"
                  type="number"
                  value={options.big_multiply_max_digit}
                  onChange={(e) => setOptions({big_multiply_max_digit: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">작은 수 자리수 범위</label>
              <div className="flex gap-2">
                <Input
                  containerClassName="flex-1"
                  max={7}
                  min={1}
                  placeholder="최소"
                  type="number"
                  value={options.small_multiply_min_digit}
                  onChange={(e) => setOptions({small_multiply_min_digit: Number(e.target.value)})}
                />
                <Input
                  containerClassName="flex-1"
                  max={7}
                  min={1}
                  placeholder="최대"
                  type="number"
                  value={options.small_multiply_max_digit}
                  onChange={(e) => setOptions({small_multiply_max_digit: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>
          <div className="ml-8 flex items-end">
            <Checkbox
              checked={options.exclude_easy}
              label="쉬운 문제 제외"
              containerProps={{
                title: '0, 1이 포함된 쉬운 문제를 제외합니다.',
              }}
              onChange={(e) => setOptions({exclude_easy: e.target.checked})}
            />
          </div>
        </div>
      </fieldset>
    </main>
  );
};

export default MultiplyBody;
