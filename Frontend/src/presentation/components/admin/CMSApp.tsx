import {
  Briefcase,
  Check,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  LogIn,
  LogOut,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../infrastructure/api/api';

export function CMSApp() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'articles' | 'projects'>('articles');
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('cms_token');
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.post<any>('/auth/login', { email, password });
      const accessToken = res.accessToken;
      setToken(accessToken);
      localStorage.setItem('cms_token', accessToken);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('cms_token');
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<any>(`/${activeTab}`);
      // Based on API response structure, items might be under `.data` or `.items`
      // The controller returns: { success: true, data: [...] } or { success: true, items: [...], total: ... }
      setItems(res.items || res.data || []);
    } catch (err: any) {
      setError('Failed to load ' + activeTab);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await apiClient.delete(`/${activeTab}/${id}`, token || '');
      fetchItems();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObj: any = {};
    formData.forEach((value, key) => {
      if (key === 'techStack') {
        dataObj[key] = (value as string).split(',').map((s) => s.trim());
      } else if (key === 'featured') {
        dataObj[key] = value === 'on';
      } else {
        dataObj[key] = value;
      }
    });

    try {
      if (editingItem) {
        await apiClient.put(`/${activeTab}/${editingItem.id}`, dataObj, token || '');
      } else {
        await apiClient.post(`/${activeTab}`, dataObj, token || '');
      }
      setCurrentView('list');
      setEditingItem(null);
      fetchItems();
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030014] p-4">
        <div className="glass-panel p-8 w-full max-w-md border border-brand-500/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">CMS Login</h1>
            <p className="text-gray-400 text-sm">Sign in to manage your portfolio</p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 pr-10 text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex justify-center py-2 mt-4 text-sm font-semibold"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#030014] text-gray-200 overflow-hidden">
      {/* Mobile Header Overlay Toggler */}
      <header className="md:hidden p-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A1F]/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-brand-400">/</span> Admin CMS
        </h1>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 border border-white/10 rounded-lg bg-white/5 text-gray-400"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5 rotate-45 transform" />
          )}
        </button>
      </header>

      {/* Sidebar Overlay background */}
      {isSidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsSidebarOpen(false);
            }
          }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 glass-panel border-r border-white/10 flex flex-col fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-auto bg-[#030014] transform md:transform-none transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10 hidden md:block">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-brand-400">/</span> Admin CMS
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('articles');
              setCurrentView('list');
              setIsSidebarOpen(false);
              fetchItems();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'articles'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <FileText className="w-5 h-5" /> Articles
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('projects');
              setCurrentView('list');
              setIsSidebarOpen(false);
              fetchItems();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'projects'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <Briefcase className="w-5 h-5" /> Projects
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col w-full">
        {currentView === 'list' ? (
          <>
            <header className="p-8 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight capitalize flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-400" />
                {activeTab}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setCurrentView('form');
                }}
                className="btn-primary py-2 px-4 flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Add New
              </button>
            </header>

            <div className="p-8 flex-1">
              {loading && items.length === 0 ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 rounded-full border-t-2 border-brand-500 animate-spin" />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No {activeTab} found. Click "Add New" to create one.
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 hover:border-brand-500/30 transition-colors"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-400 truncate max-w-lg">
                          {item.excerpt || item.description}
                        </p>
                        <div className="flex gap-3 mt-2">
                          {(item.status || item.featured) && (
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded border ${
                                item.status === 'published' || item.featured
                                  ? 'border-green-500/30 text-green-400 bg-green-500/10'
                                  : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                              }`}
                            >
                              {item.status || 'Featured'}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 self-end md:self-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItem(item);
                            setCurrentView('form');
                          }}
                          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-brand-300 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-lg text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-8 flex-1">
            <div className="max-w-3xl glass-panel p-6 md:p-8 border border-brand-500/30 shadow-2xl">
              <div className="pb-6 border-b border-white/10 flex justify-between items-center bg-[#0A0A1F]/50 z-10">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  {editingItem ? 'Edit' : 'Create'}{' '}
                  {activeTab === 'articles' ? 'Article' : 'Project'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('list');
                    setEditingItem(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 mt-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    id="title"
                    defaultValue={editingItem?.title}
                    required
                    className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {activeTab === 'articles' ? (
                  <>
                    <div>
                      <label
                        htmlFor="excerpt"
                        className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                      >
                        Excerpt
                      </label>
                      <textarea
                        name="excerpt"
                        id="excerpt"
                        defaultValue={editingItem?.excerpt}
                        required
                        rows={2}
                        className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        defaultValue={editingItem?.status || 'draft'}
                        className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        defaultValue={editingItem?.description}
                        required
                        rows={2}
                        className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="techStack"
                        className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                      >
                        Technologies (comma separated)
                      </label>
                      <input
                        name="techStack"
                        id="techStack"
                        defaultValue={editingItem?.techStack?.join(', ')}
                        required
                        className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                        placeholder="React, Node.js, Tailwind..."
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label
                          htmlFor="liveUrl"
                          className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                        >
                          Live URL
                        </label>
                        <input
                          name="liveUrl"
                          id="liveUrl"
                          defaultValue={editingItem?.liveUrl}
                          className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="githubUrl"
                          className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                        >
                          GitHub URL
                        </label>
                        <input
                          name="githubUrl"
                          id="githubUrl"
                          defaultValue={editingItem?.githubUrl}
                          className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        defaultChecked={editingItem?.featured}
                        className="w-4 h-4 bg-[#0A0A1F] border-white/10 rounded text-brand-500 focus:ring-brand-500"
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                        Mark as Featured Project
                      </label>
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="content"
                    className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                  >
                    Content (Markdown)
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    defaultValue={editingItem?.content}
                    required
                    rows={8}
                    className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none font-mono text-sm"
                    placeholder="Write your content here..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block text-xs uppercase tracking-wider text-gray-400 mb-1"
                  >
                    Featured Image URL (Optional)
                  </label>
                  <input
                    name="thumbnail"
                    id="thumbnail"
                    defaultValue={editingItem?.thumbnail}
                    className="w-full bg-[#0A0A1F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('list');
                      setEditingItem(null);
                    }}
                    className="px-5 py-2 rounded-lg font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-2 px-6 flex items-center gap-2">
                    <Check className="w-4 h-4" /> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
