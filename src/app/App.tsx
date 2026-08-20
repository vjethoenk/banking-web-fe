import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Providers } from './providers';
import { Toaster } from 'sonner';

function App() {
  return (
    <Providers>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "rounded-xl shadow-lg",
            success: "bg-emerald-50! text-emerald-700! border-emerald-200!",
            error: "bg-red-50! text-red-700! border-red-200!",
          },
        }}
      />
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
