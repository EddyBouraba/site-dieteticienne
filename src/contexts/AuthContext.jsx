import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [csrfToken, setCsrfToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupérer le token CSRF
  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/csrf-token`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.csrfToken);
        return data.csrfToken;
      }
    } catch (error) {
      console.error('Erreur récupération CSRF token:', error);
    }
    return null;
  }, []);

  // Récupérer le CSRF token au chargement
  useEffect(() => {
    fetchCsrfToken();
  }, [fetchCsrfToken]);

  // Vérifier le token au chargement
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token invalide, on le supprime
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Erreur de vérification du token:', error);
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  /**
   * Connexion
   */
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion');
      }

      localStorage.setItem('auth_token', data.token);
      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Déconnexion
   */
  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  /**
   * Changement de mot de passe
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Récupérer un token CSRF frais
      const freshCsrfToken = await fetchCsrfToken();

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-CSRF-Token': freshCsrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du changement de mot de passe');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Requête authentifiée avec CSRF
   */
  const authFetch = async (url, options = {}) => {
    // Récupérer un nouveau token CSRF si nécessaire pour les mutations
    let currentCsrfToken = csrfToken;
    if (['POST', 'PUT', 'DELETE'].includes(options.method?.toUpperCase())) {
      currentCsrfToken = await fetchCsrfToken();
    }

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (currentCsrfToken && ['POST', 'PUT', 'DELETE'].includes(options.method?.toUpperCase())) {
      headers['X-CSRF-Token'] = currentCsrfToken;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });

    // Si token expiré, déconnecter
    if (response.status === 401) {
      logout();
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    return response;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    changePassword,
    authFetch,
    API_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export default AuthContext;
