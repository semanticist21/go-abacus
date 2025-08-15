import {invoke} from '@tauri-apps/api/core';
import {isEqual} from 'lodash-es';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

import {createPagesThenSave} from '../../components/docx/create-pages';
import {Button} from '../../shared/button';
import {useOptionStore} from '../../store/option-store';
import {ISolutions, initialOptions, optionsSchema} from '../../store/type';

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
      className="px-3 bg-gray-50 flex justify-between items-center border-b border-gray-300 gap-2 h-16"
      id="header"
    >
      <address>
        <ul className="flex items-center text-gray-600 hover:text-gray-900 gap-2">
          <li className="group" aria-label="creator">
            <span className="font-semibold not-italic">• 제작: </span>
            <a
              className="group-hover:underline rounded-md border-none bg-transparent px-0"
              type="email"
              href="mailto:semanticist0@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              semanticist0@gmail.com
            </a>
          </li>

          <li className="group" aria-label="bug-inquiry">
            <span className="font-semibold not-italic">• 버그 문의: </span>
            <a
              className="group-hover:underline rounded-md border-none bg-transparent not-italic"
              id="kakaotalk-link"
              type="link"
              href="https://open.kakao.com/o/s6LPfYJg"
              target="_blank"
              rel="noopener noreferrer"
            >
              카카오톡
            </a>
          </li>
        </ul>
      </address>

      <div className="flex gap-2 items-center">
        <Button
          className="bg-gray-700 disabled:bg-gray-400 transition-all duration-300"
          aria-labelledby="reset"
          disabled={!isEqualToInitial}
          onClick={() => {
            reset();
            toast.success('초기화되었습니다.');
          }}
        >
          초기화
        </Button>
        <Button
          className="disabled:bg-gray-400 transition-all duration-300"
          aria-labelledby="save"
          onClick={async () => {
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
