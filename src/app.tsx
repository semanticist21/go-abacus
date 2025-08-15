import {useState} from 'react';
import './app.css';
import MainPage from './pages/main';

const App = () => {
  const [activeTab, setActiveTab] = useState('first');

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 border-r border-gray-200 p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-6">Go Abacus</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('first')}
            className="w-full px-3 text-left py-2 rounded-md transition-colors aria-[current=page]:text-blue-700 aria-[current=page]:font-medium aria-[current=page]:bg-blue-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            aria-current={activeTab === 'first' ? 'page' : false}
          >
            주산 문제 생성
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className="w-full text-left px-3 py-2 rounded-md transition-colors aria-[current=page]:text-blue-700 aria-[current=page]:font-medium aria-[current=page]:bg-blue-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            두 번째 탭
          </button>
        </nav>
      </aside>
      <main className="flex-1">
        {activeTab === 'first' && <MainPage />}
        {activeTab === 'second' && (
          <div className="min-w-2xl" id="container">
            <div className="px-3 bg-gray-50 flex items-center justify-between border-b border-gray-300 gap-2 h-16">
              <div className="text-center flex-1 text-gray-500">
                <h2 className="text-lg font-semibold">두 번째 탭</h2>
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

export default App;
