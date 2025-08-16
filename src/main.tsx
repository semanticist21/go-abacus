import {CheckCircle, XCircle} from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from 'sonner';

import App from './app';
import {TooltipProvider} from './components/ui/tooltip';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TooltipProvider>
      <Toaster
        position="bottom-center"
        visibleToasts={1}
        duration={3000}
        gap={8}
        closeButton
        icons={{
          success: <CheckCircle className="h-5 w-5 text-green-500" />,
          error: <XCircle className="h-5 w-5 text-red-500" />,
        }}
        toastOptions={{
          style: {
            fontSize: '0.875rem',
          },
        }}
      />
      <App />
    </TooltipProvider>
  </React.StrictMode>
);
