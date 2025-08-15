import {SquareDivide, SquarePlus} from 'lucide-react';
import {useState} from 'react';

import MainPage from '../../pages/main';
import ShinyText from '../ui/shiny-text';

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="flex h-screen">
      <aside className="w-36 shrink-0 border-r border-gray-200 bg-gray-100 p-4">
        <h1 className="mb-6 cursor-default text-center font-sans text-lg font-semibold select-none">
          <ShinyText text="Go! Abacus" />
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
        {activeTab === 1 && (
          <div className="min-w-2xl" id="container">
            <div className="flex h-16 items-center justify-between gap-2 border-b border-gray-300 bg-gray-50 px-3">
              <div className="flex-1 text-center text-gray-500">
                <h2 className="text-lg font-semibold">곱셈나눗셈</h2>
              </div>
            </div>
            <div className="mt-20 p-4 text-center text-gray-500">
              <p>여기에 새로운 기능을 구현하세요.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
