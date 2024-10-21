import {MainCheckbox} from './main-checkbox';
import MainOption from './main-option';

const MainBody = () => {
  return (
    <main className="p-4 flex flex-col gap-4">
      <fieldset className="border w-full rounded-md p-4 flex justify-between items-center gap-2">
        <legend className="text-gray-900 rounded-md">문서 설정</legend>
        <MainOption
          containerClassName="flex-1"
          label="문서 제목"
          placeholder="문서 제목"
        />
        <MainOption
          containerClassName="flex-1"
          label="문서 부제목"
          placeholder="문서 부제목"
        />
        <MainOption
          containerClassName="flex-1"
          label="생성할 페이지 수 (최대 50p)"
          placeholder="생성할 문제 페이지 수"
        />
      </fieldset>
      <fieldset className="border w-full rounded-md p-4 flex justify-between items-end gap-4">
        <legend className="text-gray-900 rounded-md">문제 설정</legend>
        <MainOption
          containerClassName="flex-1"
          label="자리 수(최대 10자리)"
          placeholder="자리 수"
          type="number"
          min={1}
        />
        <MainCheckbox containerClassName="flex-1" label="마이너스 문제 포함" />
      </fieldset>
    </main>
  );
};

export default MainBody;
