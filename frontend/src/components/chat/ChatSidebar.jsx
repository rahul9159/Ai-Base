import React, { useEffect, useState } from 'react';
import {
  PencilLine,
  Search,
  FolderKanban,
  Plus,
  Trash2,
  X,
  User,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getChatSessions, deleteChatSession, deleteAllChatSessions, getProjects, createProject } from '../../lib/api';

const ChatSidebar = ({
  onSessionSelect,
  onNewChat,
  currentSessionId,
  selectedProjectId,
  onProjectSelect,
  theme = 'dark',
}) => {
  const [sessions, setSessions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectIcon, setProjectIcon] = useState('📁');
  const [projectError, setProjectError] = useState('');
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const projectIcons = ['📁', '⚡', '💬', '🧠', '🚀', '🛠️'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [currentSessionId, selectedProjectId]);

  const fetchSessions = async () => {
    try {
      const data = await getChatSessions(selectedProjectId);
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      const nextProjects = data.projects || [];
      setProjects(nextProjects);

      if (nextProjects.length > 0 && !selectedProjectId && onProjectSelect) {
        onProjectSelect(nextProjects[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleDelete = async (e, sessionId) => {
    e.stopPropagation();
    if (!window.confirm('Delete this chat?')) return;

    try {
      await deleteChatSession(sessionId);
      fetchSessions();
      if (currentSessionId === sessionId) onNewChat();
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete all chats?')) return;

    try {
      await deleteAllChatSessions();
      fetchSessions();
      onNewChat();
    } catch (error) {
      console.error('Failed to clear sessions:', error);
    }
  };

  const resetProjectModal = () => {
    setProjectName('');
    setProjectIcon('📁');
    setProjectError('');
    setIsSavingProject(false);
  };

  const openProjectModal = () => {
    resetProjectModal();
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    resetProjectModal();
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const trimmedName = projectName.trim();
    if (!trimmedName) {
      setProjectError('Project name is required.');
      return;
    }

    setProjectError('');
    setIsSavingProject(true);
    try {
      const created = await createProject(trimmedName, projectIcon);
      setProjects((prev) => [created, ...prev]);
      if (onProjectSelect) {
        onProjectSelect(created.id);
      }
      closeProjectModal();
    } catch (error) {
      setProjectError(error.message || 'Failed to create project.');
      setIsSavingProject(false);
    }
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`hidden md:flex h-full w-[260px] border-r flex-col ${
      theme === 'dark'
        ? 'bg-[#171717] border-neutral-800 text-neutral-100'
        : 'bg-[#f0f2f4] border-neutral-300 text-neutral-900'
    }`}>
      <div className="px-3 pt-3">
        <div className="flex items-center gap-2 px-2 text-sm font-semibold text-neutral-200 mb-3">
          <div className={`h-7 w-7 rounded-md border flex items-center justify-center ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'
          }`}>✶</div>
          ChatGPT
        </div>

        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'
          }`}
        >
          <PencilLine className="w-4 h-4" />
          New chat
        </button>

        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className={`mt-2 w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          <Search className="w-4 h-4" />
          Search chats
        </button>

        {showSearch && (
          <div className="mt-2 px-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your chats..."
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                theme === 'dark'
                  ? 'border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500'
                  : 'border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500'
              }`}
            />
          </div>
        )}
      </div>

      <div className="px-3 mt-4">
        <p className={`text-xs uppercase tracking-wider px-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>Projects</p>
        <button
          onClick={openProjectModal}
          className={`w-full mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          New project
        </button>
        {projects.length > 0 && (
          <div className="mt-2 space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectSelect && onProjectSelect(project.id)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  selectedProjectId === project.id
                    ? theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-neutral-300 text-black'
                    : theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <span className="text-base leading-none">{project.icon || '📁'}</span>
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 px-3 mt-4 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between px-2 mb-2">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Your chats</p>
          {filteredSessions.length > 0 && (
            <button onClick={handleClearAll} className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400 hover:text-red-400' : 'text-neutral-600 hover:text-red-500'}`}>
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <div className="px-2 py-2 text-sm text-neutral-500">Loading...</div>
        ) : filteredSessions.length === 0 ? (
          <button
            onClick={onNewChat}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm ${
              theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {searchQuery ? 'No matching chats' : 'New chat'}
          </button>
        ) : (
          <div className="space-y-1 pb-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSessionSelect(session.id)}
                className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2 cursor-pointer ${
                  currentSessionId === session.id
                    ? theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-neutral-300 text-black'
                    : theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FolderKanban className={`w-3.5 h-3.5 shrink-0 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
                  <span className="text-sm truncate">{session.title}</span>
                </div>
                <button
                  onClick={(e) => handleDelete(e, session.id)}
                  className={`opacity-0 group-hover:opacity-100 ${theme === 'dark' ? 'text-neutral-500 hover:text-red-400' : 'text-neutral-500 hover:text-red-500'}`}
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`p-3 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'}`}>
        <Link
          to="/profile"
          className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
            theme === 'dark'
              ? 'border-neutral-700 text-neutral-200 hover:bg-neutral-800'
              : 'border-neutral-300 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            User profile
          </span>
          <Settings className="w-4 h-4 text-neutral-400" />
        </Link>
      </div>

      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={`w-full max-w-md rounded-2xl border p-5 shadow-2xl ${
            theme === 'dark' ? 'border-neutral-700 bg-[#1f1f1f]' : 'border-neutral-300 bg-white'
          }`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Create New Project</h2>
              <button
                onClick={closeProjectModal}
                className={`rounded-md p-1 ${theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'}`}
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label htmlFor="project-name" className={`mb-1 block text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Project name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className={`w-full rounded-lg border px-3 py-2 outline-none ${
                    theme === 'dark'
                      ? 'border-neutral-700 bg-neutral-900 text-neutral-100 focus:border-neutral-500'
                      : 'border-neutral-300 bg-white text-neutral-900 focus:border-neutral-500'
                  }`}
                  maxLength={120}
                  autoFocus
                />
              </div>

              <div>
                <p className={`mb-2 text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Select icon</p>
                <div className="flex flex-wrap gap-2">
                  {projectIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setProjectIcon(icon)}
                      className={`h-10 w-10 rounded-lg border text-lg ${
                        projectIcon === icon
                          ? 'border-blue-500 bg-blue-500/20'
                          : theme === 'dark'
                            ? 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
                            : 'border-neutral-300 bg-white hover:border-neutral-500'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {projectError && <p className="text-sm text-red-400">{projectError}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeProjectModal}
                  className={`rounded-lg border px-4 py-2 text-sm ${
                    theme === 'dark'
                      ? 'border-neutral-700 text-neutral-200 hover:bg-neutral-800'
                      : 'border-neutral-300 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSavingProject ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;
