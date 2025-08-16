import {useOptionStore} from '@/pages/main/store';

import {BookText, File, Star} from 'lucide-react';
import {Checkbox} from '../../components/ui/checkbox';
import Input from '../../components/ui/input';

const MainBody = () => {
  // store
  const {options, setOptions} = useOptionStore();

  return (
    <main className="flex flex-col gap-4 p-4">
      <fieldset className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex items-center gap-2 rounded-md text-gray-400 transition-colors">
          <File className="size-4" /> File
        </legend>

        <Input
          containerClassName="flex-1"
          label="파일 이름"
          placeholder="저장할 파일 이름 (ex. 주산덧셈뺄셈)"
          spellCheck={false}
          value={options.file_name}
          onChange={(e) => setOptions({file_name: e.target.value})}
        />
      </fieldset>

      <fieldset className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex items-center gap-2 rounded-md text-gray-400 transition-colors">
          <BookText className="size-4" /> Document
        </legend>

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
          placeholder="문서 부제목 (ex. 주산 암산)"
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
      </fieldset>

      <fieldset className="flex w-full flex-wrap items-end justify-between gap-8 rounded-md border border-gray-200 p-4 text-nowrap focus-within:*:text-gray-900">
        <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
          <Star className="size-5" /> Solutions
        </legend>

        <Input
          containerClassName="flex-1"
          label="자리 수(최대 7자리)"
          max={7}
          min={1}
          placeholder="자리 수 (ex. 4)"
          type="number"
          value={options.digit}
          onChange={(e) => setOptions({digit: Number(e.target.value)})}
        />
        <div className="grid w-full flex-2 grid-cols-3 gap-2">
          <Checkbox
            checked={options.include_minus}
            label="마이너스 문제 포함"
            containerProps={{
              title: '마이너스 문제가 번갈아서 포함됩니다.',
            }}
            onChange={(e) => setOptions({include_minus: e.target.checked})}
          />
          <Checkbox
            checked={options.is_random_digit}
            label="자리 수 무작위"
            containerProps={{
              title: '자리 수가 무작위로 설정됩니다. 본래 자리수가 뜰 확률이 더 높게 설정됩니다.',
            }}
            onChange={(e) => setOptions({is_random_digit: e.target.checked})}
          />
          <Checkbox
            checked={options.include_comma}
            label="쉼표 여부"
            onChange={(e) => setOptions({include_comma: e.target.checked})}
          />
          <Checkbox
            checked={options.is_decimal}
            label="소수점 계산"
            containerProps={{
              title:
                '2자리 수 이상만 가능하며, 2자리는 소수점 1자리, 그 이상은 소수점 2자리로 표시됩니다.',
            }}
            onChange={(e) => setOptions({is_decimal: e.target.checked})}
          />
        </div>
      </fieldset>
    </main>
  );
};

export default MainBody;
