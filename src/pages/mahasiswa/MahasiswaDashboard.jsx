import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, CheckCircle, FileText, MapPin, AlertCircle, Clock } from 'lucide-react';

export default function MahasiswaDashboard() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Mahasiswa Demo', nim: '220101001' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <span className="badge badge-primary">Portal Mahasiswa</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>
            Selamat Datang, {user.name}
          </h1>
          <p style={{ color: '#64748b' }}>NIM: {user.nim || '220101001'} | Status Akademik: Aktif</p>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary">
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      </div>

      {/* Status Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '6px solid #f59e0b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 700 }}>
              <Clock size={20} />
              <span>Status Pendaftaran KKN</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem' }}>
              Belum Mengisi Formulir Pendaftaran
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.25rem' }}>
              Silakan lengkapi formulir multi-langkah dan unggah dokumen persyaratan Anda sebelum batas waktu berakhir.
            </p>
          </div>
          <Link to="/mahasiswa/daftar" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            Mulai Isi Pendaftaran
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Pilihan Lokasi KKN</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Belum ada desa yang dipilih. Anda dapat memilih desa mitra pada tahap formulir pendaftaran.
          </p>
        </div>

        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '10px', color: '#d97706' }}>
              <FileText size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Kelengkapan Berkas</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            0 dari 4 berkas diunggah. Siapkan file KRS, KHS, Surat Keterangan Sehat, dan Izin Orang Tua.
          </p>
        </div>

        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ padding: '10px', background: '#ecfdf5', borderRadius: '10px', color: '#059669' }}>
              <CheckCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Penetapan Kelompok</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Pengumuman penetapan kelompok dan DPL akan dirilis setelah proses verifikasi admin selesai.
          </p>
        </div>
      </div>
    </div>
  );
}
