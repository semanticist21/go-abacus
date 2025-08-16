import Input from '@/components/ui/input';
import {useMultiplyOptionStore} from '@/pages/multiply/store';

import {File} from 'lucide-react';

const MultiplyBody = () => {
  const {options, setOptions} = useMultiplyOptionStore();

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
    </main>
  );
};

export default MultiplyBody;
