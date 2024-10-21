import {useOptionStore} from '../../store/store';
import {MainCheckbox} from './main-checkbox';
import MainOption from './main-option';

const MainBody = () => {
  // store
  const {options, setOptions} = useOptionStore();

  return (
    <main className="p-4 flex flex-col gap-4">
      <fieldset className="border w-full rounded-md p-4 flex justify-between items-center gap-2">
        <legend className="text-gray-900 rounded-md">문서 설정</legend>

        <MainOption
          containerClassName="flex-1"
          label="문서 제목"
          placeholder="문서 제목 (ex. LEVEL 1)"
          value={options.title}
          onChange={(e) => setOptions({title: e.target.value})}
        />
        <MainOption
          containerClassName="flex-1"
          label="문서 부제목"
          placeholder="문서 부제목 (ex. 주산 암산)"
          value={options.subtitle}
          onChange={(e) => setOptions({subtitle: e.target.value})}
        />
        <MainOption
          containerClassName="flex-1"
          label="생성할 페이지 수 (최대 20p)"
          placeholder="생성할 문제 페이지 수 (ex. 10)"
          type="number"
          min={1}
          max={20}
          value={options.pageCount}
          onChange={(e) => setOptions({pageCount: Number(e.target.value)})}
        />
      </fieldset>

      <fieldset className="border w-full rounded-md p-4 flex justify-between items-end gap-4">
        <legend className="text-gray-900 rounded-md">문제 설정</legend>

        <MainOption
          containerClassName="flex-1"
          label="자리 수(최대 8자리)"
          placeholder="자리 수 (ex. 4)"
          type="number"
          min={1}
          max={8}
          value={options.digitCount}
          onChange={(e) => setOptions({digitCount: Number(e.target.value)})}
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="마이너스 문제 포함"
          checked={options.includeMinus}
          onChange={(e) => setOptions({includeMinus: e.target.checked})}
        />
        <MainCheckbox
          containerClassName="flex-1"
          label="자리 수 무작위"
          checked={options.randomDigit}
          onChange={(e) => setOptions({randomDigit: e.target.checked})}
        />
      </fieldset>
    </main>
  );
};

export default MainBody;
