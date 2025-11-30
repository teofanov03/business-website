import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import ScrollToTop from '../components/ScrollToTop';
import { AuthProvider } from '../utils/AuthContext';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
      <ScrollToTop />

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      </AuthProvider>
    </div>
  );
}
