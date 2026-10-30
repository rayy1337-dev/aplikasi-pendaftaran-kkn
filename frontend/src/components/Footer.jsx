import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-logo" style={{ color: '#ffffff' }}>
              <div className="brand-icon-box">
                <GraduationCap size={24} />
              </div>
              <span>KKN-Connect</span>
            </div>
            <p>
              Platform digital terpadu pendaftaran, seleksi penempatan, dan pelaporan Kuliah Kerja Nyata (KKN) mahasiswa berbasis akuntabilitas dan pemerataan desa.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/jadwal">Jadwal Penting</Link></li>
              <li><Link to="/panduan">Panduan Pendaftaran</Link></li>
              <li><Link to="/faq">Pusat Bantuan</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Akses Akun</h4>
            <ul>
              <li><Link to="/login">Login Mahasiswa</Link></li>
              <li><Link to="/register">Daftar Akun Baru</Link></li>
              <li><Link to="/login?role=admin">Portal Admin / LPPM</Link></li>
              <li><Link to="/mahasiswa/dashboard">Dashboard Mahasiswa</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hubungi Panitia</h4>
            <ul>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <MapPin size={16} /> <span>Gedung LPPM Lantai 2</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} /> <span>+62 (021) 8899-7722</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={16} /> <span>lppm-kkn@kampus.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Tim Pengelola KKN. Seluruh Hak Cipta Dilindungi.</p>
          <p>Didesain oleh Virdi & Dibuat oleh Feris (Frontend)</p>
        </div>
      </div>
    </footer>
  );
}
