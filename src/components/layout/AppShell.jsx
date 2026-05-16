import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Settings, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const AppShell = () => {
  return (
    <div className="flex h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border)] bg-[var(--bg-surface)]">
        {/* Header */}
        <div className="h-16 flex items-center justify-center border-b border-[var(--border)]">
          <span className="font-bold text-xl text-[var(--brand-500)]">I Love You</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-[var(--brand-500)]/10 text-[var(--brand-500)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'}`}
          >
            <Home size={18} />
            <span>Anasayfa</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-[var(--brand-500)]/10 text-[var(--brand-500)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'}`}
          >
            <Settings size={18} />
            <span>Ayarlar</span>
          </NavLink>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--brand-500)]/10 flex items-center justify-center">
              <User size={18} className="text-[var(--brand-500)]" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Kullanıcı</p>
              <p className="text-sm text-[var(--text-muted)]">kullanici@example.com</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-xl">
          <h1 className="font-semibold text-lg">Anasayfa</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="h-16 flex items-center justify-between px-6 border-t border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-xl">
          <p className="text-sm text-[var(--text-muted)]">© 2023 I Love You PWA</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppShell;