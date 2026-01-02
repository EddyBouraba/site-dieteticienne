import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirection après connexion (page demandée ou admin par défaut)
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#7c9082] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#2d3436]">
            Administration
          </h1>
          <p className="text-[#636e72] mt-2">
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Nom d'utilisateur */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#2d3436] mb-2"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c9082] focus:border-transparent transition-all"
                placeholder="admin"
                required
                autoComplete="username"
                disabled={loading}
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#2d3436] mb-2"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c9082] focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7c9082] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#5a6b5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        {/* Retour au site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-[#636e72] hover:text-[#7c9082] transition-colors text-sm"
          >
            Retour au site
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
