import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';
import * as api from '../../services/api';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const { logout, user, changePassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getAllPosts();
      setPosts(data);
    } catch (error) {
      showNotification('Erreur lors du chargement des articles', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'd MMM yyyy', { locale: fr });
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        await api.deletePost(postToDelete.id);
        await loadPosts();
        setShowDeleteModal(false);
        setPostToDelete(null);
        showNotification('Article supprimé avec succès', 'success');
      } catch (error) {
        showNotification('Erreur lors de la suppression', 'error');
      }
    }
  };

  const handleReset = async () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser tous les articles ? Cette action est irréversible.')) {
      try {
        await api.resetToDefaults();
        await loadPosts();
        showNotification('Articles réinitialisés', 'success');
      } catch (error) {
        showNotification('Erreur lors de la réinitialisation', 'error');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');

    // Validation
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    setPasswordLoading(true);

    try {
      const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);

      if (result.success) {
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        showNotification('Mot de passe modifié avec succès', 'success');
      } else {
        setPasswordError(result.error || 'Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      setPasswordError('Erreur lors du changement de mot de passe');
    } finally {
      setPasswordLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7c9082] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#636e72]">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2d3436]">
              Administration du Blog
            </h1>
            <p className="text-[#636e72] mt-1">
              Connecté en tant que <span className="font-medium">{user?.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/nouveau"
              className="inline-flex items-center justify-center gap-2 bg-[#7c9082] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5a6b5e] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouvel article
            </Link>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#636e72] px-4 py-3 rounded-lg font-medium hover:bg-[#f0ebe3] transition-colors border border-[#e8e4de]"
              title="Changer le mot de passe"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span className="hidden md:inline">Mot de passe</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#636e72] px-4 py-3 rounded-lg font-medium hover:bg-[#f0ebe3] transition-colors border border-[#e8e4de]"
              title="Déconnexion"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden md:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-[#636e72]">Total articles</p>
            <p className="text-2xl font-semibold text-[#2d3436]">{posts.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-[#636e72]">Mis en avant</p>
            <p className="text-2xl font-semibold text-[#7c9082]">
              {posts.filter(p => p.featured).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-[#636e72]">Catégories</p>
            <p className="text-2xl font-semibold text-[#2d3436]">
              {new Set(posts.map(p => p.category)).size}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-[#636e72]">Dernier article</p>
            <p className="text-sm font-medium text-[#2d3436] truncate">
              {posts[0]?.title || 'Aucun'}
            </p>
          </div>
        </div>

        {/* Articles list */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-[#e8e4de] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#2d3436]">
              Tous les articles
            </h2>
            <button
              onClick={handleReset}
              className="text-sm text-[#636e72] hover:text-[#7c9082] transition-colors"
            >
              Réinitialiser
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto text-[#e8e4de] mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <p className="text-[#636e72] mb-4">Aucun article pour le moment</p>
              <Link
                to="/admin/nouveau"
                className="inline-flex items-center gap-2 text-[#7c9082] font-medium hover:underline"
              >
                Créer votre premier article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#e8e4de]">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 md:p-6 hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Image preview */}
                    <div className="flex-shrink-0 w-full md:w-24 h-32 md:h-16 rounded-lg overflow-hidden bg-gradient-to-br from-[#a8bfae] to-[#7c9082]">
                      {post.coverImage && !post.coverImage.includes('default') ? (
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="font-medium text-[#2d3436] truncate">
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span className="flex-shrink-0 bg-[#7c9082] text-white text-xs px-2 py-0.5 rounded">
                            En avant
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-[#636e72]">
                        <span className="bg-[#f0ebe3] px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span>-</span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>-</span>
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-[#636e72] hover:text-[#7c9082] hover:bg-[#f0ebe3] rounded-lg transition-colors"
                        title="Voir l'article"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        to={`/admin/modifier/${post.id}`}
                        className="p-2 text-[#636e72] hover:text-[#7c9082] hover:bg-[#f0ebe3] rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        className="p-2 text-[#636e72] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link
            to="/blog"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f0ebe3] rounded-lg flex items-center justify-center group-hover:bg-[#7c9082] transition-colors">
                <svg
                  className="w-6 h-6 text-[#7c9082] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#2d3436]">Voir le blog</h3>
                <p className="text-sm text-[#636e72]">Aperçu public du blog</p>
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f0ebe3] rounded-lg flex items-center justify-center group-hover:bg-[#7c9082] transition-colors">
                <svg
                  className="w-6 h-6 text-[#7c9082] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#2d3436]">Retour au site</h3>
                <p className="text-sm text-[#636e72]">Page d'accueil</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2d3436]">
                  Supprimer l'article ?
                </h3>
                <p className="text-sm text-[#636e72]">
                  Cette action est irréversible
                </p>
              </div>
            </div>
            <p className="text-[#636e72] mb-6">
              Voulez-vous vraiment supprimer "<strong>{postToDelete?.title}</strong>" ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-[#e8e4de] rounded-lg text-[#636e72] hover:bg-[#f0ebe3] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#f0ebe3] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2d3436]">
                  Changer le mot de passe
                </h3>
                <p className="text-sm text-[#636e72]">
                  Sécurisez votre compte
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange}>
              {passwordError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {passwordError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2d3436] mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c9082] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2d3436] mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c9082] focus:border-transparent"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-[#636e72] mt-1">Minimum 8 caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2d3436] mb-1">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e8e4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c9082] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError('');
                  }}
                  className="flex-1 px-4 py-2 border border-[#e8e4de] rounded-lg text-[#636e72] hover:bg-[#f0ebe3] transition-colors"
                  disabled={passwordLoading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#7c9082] text-white rounded-lg hover:bg-[#5a6b5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Modification...' : 'Modifier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
