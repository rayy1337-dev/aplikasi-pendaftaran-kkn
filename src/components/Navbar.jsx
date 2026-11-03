import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus, LogOut, LayoutDashboard, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' : '/mahasiswa/dashboard';

  return (
    <header className="app-navbar">
      <div className="container nav-container">
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-box">
            <GraduationCap size={24} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>KKN-Connect</span>
            <span style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>
              PORTAL PENDAFTARAN KKN
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Beranda
              </NavLink>
            </li>
            <li>
              <NavLink to="/jadwal" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Jadwal & Alur
              </NavLink>
            </li>
            <li>
              <NavLink to="/panduan" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Panduan
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                FAQ
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions desktop-actions">
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                fontSize: '0.85rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: user.role === 'admin' ? '#f59e0b' : '#2563eb',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: user.role === 'admin' ? '#b45309' : '#1d4ed8', fontWeight: 600 }}>
                    {user.role === 'admin' ? 'Admin LPPM' : 'Mahasiswa'}
                  </span>
                </div>
              </div>

              <Link to={dashboardPath} className="btn btn-primary" style={{ padding: '0.5rem 0.9rem' }}>
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.75rem', color: '#dc2626' }}
                title="Keluar dari akun"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline">
                <LogIn size={16} />
                <span>Masuk</span>
              </Link>
              <Link to="/register" className="btn btn-primary">
                <UserPlus size={16} />
                <span>Daftar Akun</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#0f172a',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-links">
            <li>
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
              >
                Beranda
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jadwal"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
              >
                Jadwal & Alur
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/panduan"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
              >
                Panduan Persyaratan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
              >
                FAQ & Bantuan
              </NavLink>
            </li>
          </ul>

          <div className="mobile-menu-auth">
            {isAuthenticated && user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <User size={18} color="#2563eb" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {user.role === 'admin' ? 'Administrator' : `NIM: ${user.nim || '-'}`}
                    </div>
                  </div>
                </div>

                <Link
                  to={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <LayoutDashboard size={18} />
                  <span>Buka Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{ width: '100%', color: '#dc2626' }}
                >
                  <LogOut size={18} />
                  <span>Keluar Akun</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  <LogIn size={18} />
                  <span>Masuk</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <UserPlus size={18} />
                  <span>Daftar Akun Baru</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
