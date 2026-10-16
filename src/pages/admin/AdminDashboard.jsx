import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, CheckCircle, Clock, AlertTriangle, LogOut, Search, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const sampleApplicants = [
    { nim: '220101001', name: 'Ahmad Fauzi', prodi: 'Teknik Informatika', desa: 'Desa Sukamaju', status: 'Menunggu Verifikasi' },
    { nim: '220101045', name: 'Siti Nurhaliza', prodi: 'Ilmu Komunikasi', desa: 'Desa Bojong Kulon', status: 'Diverifikasi' },
    { nim: '220101089', name: 'Budi Santoso', prodi: 'Manajemen', desa: 'Desa Karanganyar', status: 'Revisi Berkas' },
    { nim: '220101102', name: 'Dewi Lestari', prodi: 'Kesehatan Masyarakat', desa: 'Desa Sukamaju', status: 'Diterima' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <span className="badge badge-primary">Portal Admin LPPM</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>
            Dashboard Verifikasi Pendaftar
          </h1>
          <p style={{ color: '#64748b' }}>Kelola berkas pendaftaran mahasiswa dan kuota desa KKN</p>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary">
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      </div>

      {/* Admin Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="#2563eb" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Total Pendaftar</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>148 Mahasiswa</h2>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} color="#f59e0b" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Perlu Verifikasi</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>32 Berkas</h2>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={20} color="#10b981" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Telah Lolos</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>104 Mahasiswa</h2>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={20} color="#06b6d4" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Lokasi Tersedia</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>12 Wilayah</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Data Antrian Pendaftar Terkini</h3>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari NIM / Nama..."
                style={{
                  padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '0.75rem' }}>NIM</th>
                <th style={{ padding: '0.75rem' }}>Nama Mahasiswa</th>
                <th style={{ padding: '0.75rem' }}>Program Studi</th>
                <th style={{ padding: '0.75rem' }}>Lokasi Pilihan</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleApplicants.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>{item.nim}</td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>{item.name}</td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#64748b' }}>{item.prodi}</td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>{item.desa}</td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className={`badge ${
                      item.status === 'Diterima' ? 'badge-success' :
                      item.status === 'Diverifikasi' ? 'badge-primary' : 'badge-warning'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
