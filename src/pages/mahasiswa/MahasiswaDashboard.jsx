import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle, FileText, MapPin, AlertCircle, Clock, Home, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function MahasiswaDashboard() {
  const { user, logout, backendNotice } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentName = user?.name || 'Mahasiswa Demo';
  const studentNim = user?.nim || '220101001';

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Notice Banner */}
      {backendNotice && (
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          fontSize: '0.85rem',
          color: '#1d4ed8',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} />
          <span>{backendNotice}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-primary">Portal Mahasiswa KKN</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', color: '#0f172a' }}>
            Selamat Datang, {studentName}
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            NIM: <strong>{studentNim}</strong> | Program Studi: {user?.prodi || 'Teknik Informatika'} | Status: Mahasiswa Aktif
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/" className="btn btn-secondary">
            <Home size={16} />
            <span>Halaman Utama</span>
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ color: '#dc2626' }}>
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '6px solid #f59e0b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 700 }}>
              <Clock size={20} />
              <span>Status Pendaftaran KKN 2026/2027</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
              Belum Mengisi Formulir Pendaftaran
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.25rem', maxWidth: '650px' }}>
              Silakan lengkapi biodata akademik, pilih salah satu desa binaan, dan unggah berkas persyaratan sebelum batas waktu pendaftaran berakhir.
            </p>
          </div>
          <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <span>Informasi & Panduan</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
              <MapPin size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Pilihan Lokasi Desa</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Belum ada desa yang dipilih. Pilihan lokasi akan diaktifkan pada modul wizard pendaftaran KKN.
          </p>
        </div>

        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '10px', color: '#d97706' }}>
              <FileText size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Kelengkapan Berkas</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
            0 dari 4 berkas terunggah. Siapkan file KTM, Transkrip SKS, Surat Keterangan Sehat, dan Izin Orang Tua.
          </p>
        </div>

        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ padding: '10px', background: '#ecfdf5', borderRadius: '10px', color: '#059669' }}>
              <CheckCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Penetapan Kelompok & DPL</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Rilis penetapan kelompok dan DPL resmi dijadwalkan pada 26 November 2026 pasca verifikasi berkas LPPM.
          </p>
        </div>
      </div>
    </div>
  );
}
