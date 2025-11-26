// App.tsx
import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;