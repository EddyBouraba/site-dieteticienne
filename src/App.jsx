import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { HomePage } from './pages';
import { BlogList, BlogPost } from './components/blog';
import { AdminDashboard, ArticleForm, LoginPage, ProtectedRoute } from './components/admin';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Navigation fixe */}
        <Header />

        {/* Routes */}
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Page de login (publique) */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Administration (protégée) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/nouveau"
            element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/modifier/:id"
            element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer avec mentions légales */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
