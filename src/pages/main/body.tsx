import {BookText, Save, Star} from 'lucide-react';
import {useOptionStore} from '@/pages/main/store';
import {Checkbox} from '../../components/ui/checkbox';
import Input from '../../components/ui/input';

const MainBody = () => {
  // store
  const {setOptions, options} = useOptionStore();

  return (
    <main className="scrollbar-overlay flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-4">
      <fieldset className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex items-center gap-2 rounded-md text-gray-400 transition-colors">
          <Save className="size-4" /> 저장
        </legend>

        <Input
          onChange={(e) => setOptions({file_name: e.target.value})}
          placeholder="저장할 파일 이름 (ex. 주산덧셈뺄셈)"
          containerClassName="flex-1"
          value={options.file_name}
          spellCheck={false}
          label="파일 이름"
        />
      </fieldset>

      <fieldset className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-4 focus-within:*:text-gray-900">
        <legend className="flex items-center gap-2 rounded-md text-gray-400 transition-colors">
          <BookText className="size-4" /> 문서
        </legend>

        <Input
          formProps={{
            textCount: options.title.length,
            maxLength: 30,
          }}
          onChange={(e) => setOptions({title: e.target.value})}
          placeholder="문서 제목 (ex. LEVEL 1)"
          containerClassName="flex-1"
          value={options.title}
          spellCheck={false}
          label="문서 제목"
        />
        <Input
          formProps={{
            textCount: options.subtitle.length,
            maxLength: 30,
          }}
          onChange={(e) => setOptions({subtitle: e.target.value})}
          placeholder="문서 부제목 (ex. 주산 암산)"
          containerClassName="flex-1"
          value={options.subtitle}
          spellCheck={false}
          label="문서 부제목"
        />
        <Input
          label={
            <>
              생성할 페이지 수<span className="text-xs text-gray-400"> (~100p)</span>
            </>
          }
          onChange={(e) => setOptions({page_count: Number(e.target.value)})}
          placeholder="생성할 문제 페이지 수 (ex. 10)"
          containerClassName="flex-1"
          value={options.page_count}
          type="number"
          max={20}
          min={1}
        />
      </fieldset>

      <fieldset className="flex w-full flex-wrap items-end justify-between gap-8 rounded-md border border-gray-200 p-4 text-nowrap focus-within:*:text-gray-900">
        <legend className="flex w-max items-center gap-2 rounded-md text-gray-400 transition-colors">
          <Star className="size-5" /> 문제 설정
        </legend>

        <Input
          onChange={(e) => setOptions({digit: Number(e.target.value)})}
          containerClassName="flex-1"
          placeholder="자리 수 (ex. 4)"
          value={options.digit}
          label="자리 수(최대 7자리)"
          type="number"
          max={7}
          min={1}
        />
        <div className="grid w-full flex-2 grid-cols-3 gap-2">
          <Checkbox
            containerProps={{
              title: '마이너스 문제가 번갈아서 포함됩니다.',
            }}
            onChange={(e) => setOptions({include_minus: e.target.checked})}
            checked={options.include_minus}
            label="마이너스 문제 포함"
          />
          <Checkbox
            containerProps={{
              title: '자리 수가 무작위로 설정됩니다. 본래 자리수가 뜰 확률이 더 높게 설정됩니다.',
            }}
            onChange={(e) => setOptions({is_random_digit: e.target.checked})}
            checked={options.is_random_digit}
            label="자리 수 무작위"
          />
          <Checkbox
            onChange={(e) => setOptions({include_comma: e.target.checked})}
            checked={options.include_comma}
            label="쉼표 여부"
          />
          <Checkbox
            containerProps={{
              title:
                '2자리 수 이상만 가능하며, 2자리는 소수점 1자리, 그 이상은 소수점 2자리로 표시됩니다.',
            }}
            onChange={(e) => setOptions({is_decimal: e.target.checked})}
            checked={options.is_decimal}
            label="소수점 계산"
          />
        </div>
      </fieldset>
    </main>
  );
};

export default MainBody;
