import {Pickaxe} from 'lucide-react';
import {MouseEvent} from 'react';
import {Button} from './button';

interface HeaderProps {
  onCreateAndSave: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onReset: (e: MouseEvent<HTMLButtonElement>) => void;
  isEqualToInitial: boolean;
}

const Header = ({isEqualToInitial, onCreateAndSave, onReset}: HeaderProps) => {
  return (
    <header
      className="flex h-16 items-center justify-between gap-2 border-b border-gray-300 bg-gray-50 px-3"
      id="header"
    >
      <address className="pl-3">
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li className="group flex items-center gap-1" aria-label="creator">
            <span className="flex items-center gap-1 font-semibold not-italic" id="creator-label">
              <Pickaxe className="size-3" />
              제작
            </span>
            <a
              className="rounded-md border-none bg-transparent px-0 group-hover:underline"
              href="mailto:semanticist0@gmail.com"
              aria-describedby="creator-label"
              rel="noopener noreferrer"
              target="_blank"
              type="email"
            >
              semanticist0@gmail.com
            </a>
          </li>
        </ul>
      </address>

      <div className="flex items-center gap-2">
        <Button
          className="bg-gray-600 transition-all duration-300 hover:bg-gray-700 disabled:bg-gray-400"
          disabled={!isEqualToInitial}
          onClick={onReset}
          type="reset"
        >
          초기화
        </Button>
        <Button
          className="transition-all duration-300 disabled:bg-gray-400"
          onClick={onCreateAndSave}
          type="submit"
        >
          생성 및 저장
        </Button>
      </div>
    </header>
  );
};

export default Header;
