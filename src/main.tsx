import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from 'react-hot-toast';

import App from './app';
import {TooltipProvider} from './components/ui/tooltip';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TooltipProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '0.875rem',
          },
        }}
        gutter={8}
      />
      <App />
    </TooltipProvider>
  </React.StrictMode>
);
