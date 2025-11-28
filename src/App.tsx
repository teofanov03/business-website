// App.tsx
import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { AuthProvider } from "./utils/AuthContext";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      {/* TOASTER MORA BITI OVDE */}
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          className: "z-[999999]" // probija Figma slojeve
        }}
      />

      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
