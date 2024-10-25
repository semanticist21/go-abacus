import {useOptionStore} from '../../store/option-store';
import {MainCheckbox} from './main-checkbox';
import MainOption from './main-option';

const MainBody = () => {
  // store
  const {options, setOptions} = useOptionStore();

  return (
    <main className="p-4 flex flex-col gap-4">
      <fieldset className="border w-full rounded-md p-4 flex justify-between items-center gap-2">
        <legend className="text-gray-900 rounded-md">파일 이름</legend>

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

      <fieldset className="border w-full rounded-md p-4 flex justify-between items-center gap-2">
        <legend className="text-gray-900 rounded-md">문서 설정</legend>

        <MainOption
          containerClassName="flex-1"
          label="문서 제목"
          textCount={options.title.length.toLocaleString()}
          placeholder="문서 제목 (ex. LEVEL 1)"
          value={options.title}
          onChange={(e) => setOptions({title: e.target.value})}
          aria-labelledby="title"
          spellCheck={false}
        />
        <MainOption
          containerClassName="flex-1"
          label="문서 부제목"
          textCount={options.subtitle.length.toLocaleString()}
          placeholder="문서 부제목 (ex. 주산 암산)"
          value={options.subtitle}
          onChange={(e) => setOptions({subtitle: e.target.value})}
          aria-labelledby="subtitle"
          spellCheck={false}
        />
        <MainOption
          containerClassName="flex-1"
          label="생성할 페이지 수 (최대 20p)"
          placeholder="생성할 문제 페이지 수 (ex. 10)"
          type="number"
          min={1}
          max={20}
          value={options.page_count}
          onChange={(e) => setOptions({page_count: Number(e.target.value)})}
          aria-labelledby="page-count"
        />
      </fieldset>

      <fieldset className="border w-full rounded-md p-4 flex justify-between items-end gap-4">
        <legend className="text-gray-900 rounded-md">문제 설정</legend>

        <MainOption
          containerClassName="flex-1"
          label="자리 수(최대 6자리)"
          placeholder="자리 수 (ex. 4)"
          type="number"
          min={1}
          max={6}
          value={options.digit}
          onChange={(e) => setOptions({digit: Number(e.target.value)})}
          aria-labelledby="digit"
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="마이너스 문제 포함"
          checked={options.include_minus}
          onChange={(e) => setOptions({include_minus: e.target.checked})}
          aria-labelledby="include-minus"
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="자리 수 무작위"
          checked={options.is_random_digit}
          onChange={(e) => setOptions({is_random_digit: e.target.checked})}
          aria-labelledby="is-random-digit"
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="쉼표 여부"
          checked={options.include_comma}
          onChange={(e) => setOptions({include_comma: e.target.checked})}
          aria-labelledby="include-comma"
        />
      </fieldset>
    </main>
  );
};

export default MainBody;
