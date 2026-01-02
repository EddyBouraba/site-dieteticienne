import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Composant de protection des routes admin
 * Redirige vers la page de login si l'utilisateur n'est pas authentifié
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Affichage d'un loader pendant la vérification du token
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7c9082] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#636e72]">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Redirection vers login si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
