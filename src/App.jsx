import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { HomePage } from './pages';
import { BlogList, BlogPost } from './components/blog';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
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
      </Routes>

      {/* Footer avec mentions légales */}
      <Footer />
    </Router>
  );
}

export default App;
