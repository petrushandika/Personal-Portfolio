import {
  Bold,
  Briefcase,
  Check,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  Heading1,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  LogIn,
  LogOut,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { marked } from 'marked';
import type React from 'react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import StackIcon from 'tech-stack-icons';
import { apiClient } from '../../../infrastructure/api/api';
import 'react-quill-new/dist/quill.snow.css';

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
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState<string>('');
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // Sync state with editingItem when it changes
  useEffect(() => {
    if (editingItem) {
      setThumbnailUrl(activeTab === 'articles' ? editingItem.featuredImage : editingItem.thumbnail);
      setContent(editingItem.content || '');
      setSelectedTechs(editingItem.techStack || []);
    } else {
      setThumbnailUrl('');
      setContent('');
      setSelectedTechs([]);
    }
  }, [editingItem, activeTab]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const api_url = (import.meta as any).env?.PUBLIC_API_URL || 'http://localhost:3000/api';
      const resp = await fetch(`${api_url}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res = await resp.json();
      if (res.success) {
        // Assume API returns { url: "/uploads/filename.jpg" }
        // Prepend host URL for complete absolute display safely if needed
        setThumbnailUrl(res.data.url);
      } else {
        alert(res.error?.message || 'Upload failed');
      }
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

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

    // Override image based on tab
    if (thumbnailUrl) {
      if (activeTab === 'articles') {
        dataObj.featuredImage = thumbnailUrl;
      } else {
        dataObj.thumbnail = thumbnailUrl;
      }
    }

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
      <div className="flex items-center justify-center min-h-screen bg-bg-base p-4">
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
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 pr-10 text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
    <div className="flex flex-col md:flex-row h-screen bg-bg-base text-gray-200 overflow-hidden">
      {/* Mobile Header Overlay Toggler */}
      <header className="md:hidden p-4 border-b border-white/10 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Admin CMS
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
        className={`w-64 glass-panel border-r border-white/10 flex flex-col fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-auto bg-bg-base transform md:transform-none transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10 hidden md:block">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Admin CMS
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
            <div className="w-full glass-panel p-6 md:p-8 border border-brand-500/30 shadow-2xl">
              <div className="pb-6 border-b border-white/10 flex justify-between items-center bg-black/50 z-10">
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
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
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
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
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
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
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
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <div className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                        Technologies / Tech Stack
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        {/* Selected list */}
                        {selectedTechs.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4 border-b border-white/5 pb-4">
                            {selectedTechs.map((t) => (
                              <span
                                key={t}
                                className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-xs font-semibold text-gray-200 transition-colors"
                              >
                                <StackIcon name={t as any} className="w-3.5 h-3.5" />
                                <span className="capitalize">{t.replace('js', '.js')}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedTechs((prev) => prev.filter((x) => x !== t))
                                  }
                                  className="text-gray-400 hover:text-white"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Grid of Choices */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                          {[
                            { id: 'reactjs', name: 'React' },
                            { id: 'nextjs', name: 'Next.js' },
                            { id: 'vuejs', name: 'Vue.js' },
                            { id: 'angular', name: 'Angular' },
                            { id: 'typescript', name: 'TypeScript' },
                            { id: 'javascript', name: 'JavaScript' },
                            { id: 'tailwindcss', name: 'Tailwind' },
                            { id: 'nodejs', name: 'Node.js' },
                            { id: 'nestjs', name: 'Nest.js' },
                            { id: 'expressjs', name: 'Express' },
                            { id: 'golang', name: 'Go' },
                            { id: 'php', name: 'PHP' },
                            { id: 'laravel', name: 'Laravel' },
                            { id: 'postgresql', name: 'PostgreSQL' },
                            { id: 'mysql', name: 'MySQL' },
                            { id: 'mongodb', name: 'MongoDB' },
                            { id: 'firebase', name: 'Firebase' },
                            { id: 'supabase', name: 'Supabase' },
                            { id: 'docker', name: 'Docker' },
                            { id: 'python', name: 'Python' },
                            { id: 'django', name: 'Django' },
                            { id: 'flutter', name: 'Flutter' },
                            { id: 'git', name: 'Git' },
                            { id: 'figma', name: 'Figma' },
                          ].map((tech) => {
                            const isSelected = selectedTechs.indexOf(tech.id) !== -1;
                            return (
                              <button
                                type="button"
                                key={tech.id}
                                onClick={() => {
                                  setSelectedTechs((prev) =>
                                    isSelected
                                      ? prev.filter((x) => x !== tech.id)
                                      : [...prev, tech.id]
                                  );
                                }}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-brand-500/10 border-brand-500/50 text-white'
                                    : 'bg-black/20 border-white/5 hover:border-white/20 text-gray-400 hover:text-white'
                                }`}
                              >
                                <StackIcon
                                  name={tech.id as any}
                                  className={`w-4 h-4 ${isSelected ? 'grayscale-0' : 'grayscale filter'}`}
                                />
                                <span className="text-xs truncate">{tech.name}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom Input */}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                          <input
                            type="text"
                            placeholder="Type another tech & press Enter..."
                            className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value
                                  .trim()
                                  .toLowerCase();
                                if (val && selectedTechs.indexOf(val) === -1) {
                                  setSelectedTechs((prev) => [...prev, val]);
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <input type="hidden" name="techStack" value={selectedTechs.join(',')} />
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
                          className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
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
                          className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        defaultChecked={editingItem?.featured}
                        className="w-4 h-4 bg-black border-white/10 rounded text-brand-500 focus:ring-brand-500"
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                        Mark as Featured Project
                      </label>
                    </div>
                  </>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                    <label
                      htmlFor="content"
                      className="block text-xs uppercase tracking-wider text-gray-400"
                    >
                      Content
                    </label>
                  </div>
                  <div className="bg-black border border-white/10 rounded-lg overflow-hidden focus-within:border-brand-500">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      placeholder="Start writing as if using Word..."
                      className="text-white h-72 max-h-[400px]"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['link', 'image', 'code-block'],
                          ['clean'],
                        ],
                      }}
                    />
                  </div>
                  <input type="hidden" name="content" value={content} />
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="thumbnail_file"
                    className="block text-xs uppercase tracking-wider text-gray-400"
                  >
                    Cover Image / Thumbnail
                  </label>

                  <label
                    htmlFor="thumbnail_file"
                    className={`w-full h-56 rounded-2xl border-2 border-dashed ${
                      uploading
                        ? 'border-brand-500/40 bg-brand-500/5'
                        : 'border-white/10 hover:border-white/20 bg-black/40'
                    } flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-300`}
                  >
                    {thumbnailUrl ? (
                      <>
                        <img
                          src={
                            thumbnailUrl.indexOf('http') === 0
                              ? thumbnailUrl
                              : `${((import.meta as any).env?.PUBLIC_API_URL || 'http://localhost:3000/api').replace('/api', '')}${thumbnailUrl}`
                          }
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-sm">
                          <ImageIcon className="w-8 h-8 text-white mb-2" />
                          <span className="text-sm font-medium text-white">
                            Click or drag to change
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-200">Upload an image</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Click anywhere inside this area to select a file
                          </p>
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      id="thumbnail_file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <p className="text-xs text-gray-500">
                    Images are automatically converted to WebP for SEO and performance.
                  </p>
                  {uploading && (
                    <div className="flex items-center gap-2 text-xs text-brand-400">
                      <span className="animate-spin w-3 h-3 border-2 border-brand-500 border-t-transparent rounded-full" />
                      Uploading...
                    </div>
                  )}
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
                  <button type="submit" className="btn-primary py-2 px-6">
                    Upload
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
