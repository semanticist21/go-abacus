import {SquareDivide, SquarePlus} from 'lucide-react';
import {useState} from 'react';
import MainPage from '../../pages/main';

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="flex h-screen">
      <aside className="w-36 bg-gray-100 border-r border-gray-200 p-4 shrink-0">
        <h1 className="text-lg font-semibold text-gray-800 mb-6 font-serif italic">Go Abacus</h1>
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className="flex items-center gap-1 w-full px-3 text-left py-2 rounded-md transition-colors aria-[current=page]:text-blue-700 aria-[current=page]:font-medium aria-[current=page]:bg-blue-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm"
            aria-current={activeTab === 0 ? 'page' : false}
          >
            <SquarePlus className="size-3 text-blue-500" />
            덧셈뺄셈
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className="flex items-center gap-1 w-full px-3 text-left py-2 rounded-md transition-colors aria-[current=page]:text-blue-700 aria-[current=page]:font-medium aria-[current=page]:bg-blue-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm"
            aria-current={activeTab === 1 ? 'page' : false}
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
            <div className="px-3 bg-gray-50 flex items-center justify-between border-b border-gray-300 gap-2 h-16">
              <div className="text-center flex-1 text-gray-500">
                <h2 className="text-lg font-semibold">곱셈나눗셈</h2>
              </div>
            </div>
            <div className="p-4 text-center text-gray-500 mt-20">
              <p>여기에 새로운 기능을 구현하세요.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
