import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
