import {invoke} from '@tauri-apps/api/tauri';
import {isEqual} from 'lodash';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

import {Button} from '../../shared/button';
import {useOptionStore} from '../../store/store';
import {initialOptions} from '../../store/type';
import {openSavedFolderAsync} from '../../util/explorer';

const Header = () => {
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
              className="group-hover:underline rounded-md border-none bg-transparent"
              type="mail"
              href="mailto:semanticist0@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              semanticist0
            </a>
          </li>

          <li className="group" aria-label="bug-inquiry">
            <span className="font-semibold not-italic">• 버그 문의: </span>
            <a
              className="group-hover:underline rounded-md border-none bg-transparent"
              id="kakao-talk-link"
              type="link"
              href="https://open.kakao.com/o/s6LPfYJg"
              target="_blank"
              rel="noopener noreferrer"
            >
              KakaoTalk
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
          className="bg-gray-700"
          aria-labelledby="open-saved-folder"
          onClick={openSavedFolderAsync}
        >
          저장 폴더 열기
        </Button>
        <Button
          className="disabled:bg-gray-400 transition-all duration-300"
          aria-labelledby="save"
          onClick={() => {
            invoke('generate', {options});
          }}
        >
          생성 및 저장
        </Button>
      </div>
    </header>
  );
};

export default Header;
