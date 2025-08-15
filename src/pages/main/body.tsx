import {MainCheckbox} from '../../components/shared/main-checkbox';
import MainOption from '../../components/shared/main-option';
import {useOptionStore} from '../../store/option-store';

const MainBody = () => {
  // store
  const {options, setOptions} = useOptionStore();

  return (
    <main className="p-4 flex flex-col gap-4">
      <fieldset className="border w-full rounded-md p-4 flex justify-between items-center gap-2 border-gray-200">
        <legend className="text-gray-500 rounded-md italic">Files</legend>

        <MainOption
          containerClassName="flex-1"
          label="파일 이름"
          placeholder="저장할 파일 이름 (ex. 주산덧셈뺄셈)"
          value={options.file_name}
          onChange={(e) => setOptions({file_name: e.target.value})}
          spellCheck={false}
          aria-labelledby="file-name"
        />
      </fieldset>

      <fieldset className="border w-full rounded-md p-4 flex justify-between items-center gap-2 border-gray-200">
        <legend className="text-gray-500 rounded-md italic">Documents</legend>

        <MainOption
          containerClassName="flex-1"
          label="문서 제목"
          formProps={{
            textCount: options.title.length,
            maxLength: 30,
          }}
          placeholder="문서 제목 (ex. LEVEL 1)"
          value={options.title}
          onChange={(e) => setOptions({title: e.target.value})}
          spellCheck={false}
        />
        <MainOption
          containerClassName="flex-1"
          label="문서 부제목"
          formProps={{
            textCount: options.subtitle.length,
            maxLength: 30,
          }}
          placeholder="문서 부제목 (ex. 주산 암산)"
          value={options.subtitle}
          onChange={(e) => setOptions({subtitle: e.target.value})}
          spellCheck={false}
        />
        <MainOption
          containerClassName="flex-1"
          label="생성할 페이지 수 (최대 100p)"
          placeholder="생성할 문제 페이지 수 (ex. 10)"
          type="number"
          min={1}
          max={20}
          value={options.page_count}
          onChange={(e) => setOptions({page_count: Number(e.target.value)})}
        />
      </fieldset>

      <fieldset className="border w-full rounded-md p-4 grid grid-cols-3 justify-between items-end gap-8 text-nowrap flex-wrap border-gray-200">
        <legend className="text-gray-500 rounded-md italic">Solutions</legend>

        <MainOption
          containerClassName="flex-1"
          label="자리 수(최대 7자리)"
          placeholder="자리 수 (ex. 4)"
          type="number"
          min={1}
          max={7}
          value={options.digit}
          onChange={(e) => setOptions({digit: Number(e.target.value)})}
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="마이너스 문제 포함"
          checked={options.include_minus}
          onChange={(e) => setOptions({include_minus: e.target.checked})}
          containerProps={{
            title: '마이너스 문제가 번갈아서 포함됩니다.',
          }}
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="자리 수 무작위"
          checked={options.is_random_digit}
          onChange={(e) => setOptions({is_random_digit: e.target.checked})}
          containerProps={{
            title: '자리 수가 무작위로 설정됩니다. 본래 자리수가 뜰 확률이 더 높게 설정됩니다.',
          }}
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="쉼표 여부"
          checked={options.include_comma}
          onChange={(e) => setOptions({include_comma: e.target.checked})}
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="소수점 계산"
          checked={options.is_decimal}
          onChange={(e) => setOptions({is_decimal: e.target.checked})}
          containerProps={{
            title:
              '2자리 수 이상만 가능하며, 2자리는 소수점 1자리, 그 이상은 소수점 2자리로 표시됩니다.',
          }}
        />
      </fieldset>
    </main>
  );
};

export default MainBody;
