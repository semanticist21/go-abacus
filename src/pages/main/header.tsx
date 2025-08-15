import {invoke} from '@tauri-apps/api/core';
import {isEqual} from 'lodash-es';
import {Bug, Pickaxe} from 'lucide-react';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

import {createPagesThenSave} from '../../components/docx/create-pages';
import {Button} from '../../components/ui/button';
import {useOptionStore} from '../../store/option-store';
import {initialOptions, ISolutions, optionsSchema} from '../../store/type';

const Header = () => {
  // store
  const {reset, options} = useOptionStore();

  // state props
  const [isEqualToInitial, setIsEqualToInitial] = useState(true);

  useEffect(() => {
    setIsEqualToInitial(!isEqual(initialOptions, options));
  }, [options]);

  return (
    <header
      className="flex h-16 items-center justify-between gap-2 border-b border-gray-300 bg-gray-50 px-3"
      id="header"
    >
      <address className="pl-3">
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li aria-label="creator" className="group flex items-center gap-1">
            <span className="flex items-center gap-1 font-semibold not-italic" id="creator-label">
              <Pickaxe className="size-3" />
              제작
            </span>
            <a
              aria-describedby="creator-label"
              className="rounded-md border-none bg-transparent px-0 group-hover:underline"
              href="mailto:semanticist0@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
              type="email"
            >
              semanticist0@gmail.com
            </a>
          </li>

          <hr className="h-4 w-px border-l border-gray-300" />

          <li className="group flex items-center gap-1">
            <span
              className="flex items-center gap-1 font-semibold not-italic"
              id="bug-inquiry-label"
            >
              <Bug className="size-3" />
              버그 문의
            </span>
            <a
              aria-describedby="bug-inquiry-label"
              className="rounded-md border-none bg-transparent not-italic group-hover:underline"
              href="https://open.kakao.com/o/s6LPfYJg"
              id="kakaotalk-link"
              rel="noopener noreferrer"
              target="_blank"
              type="link"
            >
              카카오톡
            </a>
          </li>
        </ul>
      </address>

      <div className="flex items-center gap-2">
        <Button
          className="bg-gray-600 transition-all duration-300 hover:bg-gray-700 disabled:bg-gray-400"
          disabled={!isEqualToInitial}
          type="reset"
          onClick={(e) => {
            e.preventDefault();

            reset();
            toast.success('초기화되었습니다.');
          }}
        >
          초기화
        </Button>
        <Button
          className="transition-all duration-300 disabled:bg-gray-400"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            try {
              const {success, error} = await optionsSchema.safeParseAsync(options);

              if (!success) {
                toast.error(error.issues[0]?.message ?? '옵션 검증에 실패했습니다.');
                return;
              }

              if (options.is_decimal && options.digit === 1) {
                toast.error('소수점은 1자리 수로 생성할 수 없습니다.');
                return;
              }

              const result: ISolutions = await invoke('generate', {options});
              await createPagesThenSave(options, result.solutions);
            } catch (e) {
              console.error(e);
              toast.error('생성 중 오류가 발생했습니다.');
            }
          }}
        >
          생성 및 저장
        </Button>
      </div>
    </header>
  );
};

export default Header;
