import {SquareDivide, SquarePlus} from 'lucide-react';
import {useState} from 'react';

import ShinyText from '../components/ui/shiny-text';
import MainPage from '../pages/main';
import MultiplyPage from '../pages/multiply';

const Layout = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="align-stretch flex h-full">
      <aside className="w-36 shrink-0 border-r border-gray-200 bg-gray-100 p-4">
        <h1 className="mb-6 cursor-default text-center font-sans text-lg font-semibold select-none">
          <ShinyText
            text={
              <span>
                <i>Go!</i> Abacus
              </span>
            }
          />
        </h1>
        <nav className="space-y-2">
          <button
            aria-current={activeTab === 0 ? 'page' : false}
            className="flex w-full items-center gap-1 rounded-md px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 aria-[current=page]:bg-blue-100 aria-[current=page]:font-medium aria-[current=page]:text-blue-700"
            type="button"
            onClick={() => setActiveTab(0)}
          >
            <SquarePlus className="size-3 text-blue-500" />
            덧셈뺄셈
          </button>
          <button
            aria-current={activeTab === 1 ? 'page' : false}
            className="flex w-full items-center gap-1 rounded-md px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 aria-[current=page]:bg-blue-100 aria-[current=page]:font-medium aria-[current=page]:text-blue-700"
            type="button"
            onClick={() => setActiveTab(1)}
          >
            <SquareDivide className="size-3 text-blue-500" />
            곱셈나눗셈
          </button>
        </nav>
      </aside>
      <main className="flex-1">
        {activeTab === 0 && <MainPage />}
        {activeTab === 1 && <MultiplyPage />}
      </main>
    </div>
  );
};

export default Layout;
