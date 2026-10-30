import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="app-navbar">
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          <div className="brand-icon-box">
            <GraduationCap size={24} />
          </div>
          <span>KKN-Connect</span>
        </Link>

        <nav>
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

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline">
            <LogIn size={16} />
            <span>Masuk</span>
          </Link>
          <Link to="/register" className="btn btn-primary">
            <UserPlus size={16} />
            <span>Daftar Akun</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
