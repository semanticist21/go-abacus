import {CheckCircle, XCircle} from 'lucide-react';
import ReactDOM from 'react-dom/client';
import {Toaster} from 'sonner';
import React from 'react';
import {TooltipProvider} from './components/ui/tooltip';
import App from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TooltipProvider>
      <Toaster
        icons={{
          success: <CheckCircle className="h-5 w-5 text-green-500" />,
          error: <XCircle className="h-5 w-5 text-red-500" />,
        }}
        toastOptions={{
          style: {
            fontSize: '0.875rem',
          },
        }}
        position="bottom-center"
        visibleToasts={1}
        duration={3000}
        closeButton
        gap={8}
      />
      <App />
    </TooltipProvider>
  </React.StrictMode>
);
