import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  CheckCircle, 
  Clock, 
  LogOut, 
  Search, 
  Home, 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle, 
  Layers, 
  Bell, 
  TrendingUp,
  RefreshCw,
  Eye,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { pendaftaranService } from '../../services/pendaftaranService';
import { lokasiService } from '../../services/lokasiService';
import VerifikasiModal from '../../components/admin/VerifikasiModal';
import LokasiManager from '../../components/admin/LokasiManager';
import PengumumanManager from '../../components/admin/PengumumanManager';

export default function AdminDashboard() {
  const { user, logout, backendNotice } = useAuth();
  const navigate = useNavigate();

  // Navigation tabs: 'ringkasan' | 'pendaftar' | 'lokasi' | 'pengumuman'
  const [activeTab, setActiveTab] = useState('pendaftar');

  // Applicants data state
  const [applicants, setApplicants] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Verification Modal
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [notification, setNotification] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    const [pendaftarRes, lokasiRes] = await Promise.all([
      pendaftaranService.getAll(),
      lokasiService.getAll(),
    ]);

    if (pendaftarRes.data) {
      setApplicants(pendaftarRes.data);
    }
    if (lokasiRes.data) {
      setLocations(lokasiRes.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateStatus = async (id, payload) => {
    const res = await pendaftaranService.verify(id, payload);
    if (res.data) {
      setApplicants((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...res.data } : app))
      );
      setNotification(`Status pendaftar ${res.data.name} berhasil diperbarui menjadi ${res.data.status}.`);
      setTimeout(() => setNotification(''), 4000);
    }
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter((item) => {
    const query = searchTerm.toLowerCase();
    const matchSearch =
      item.name.toLowerCase().includes(query) ||
      item.nim.includes(query) ||
      item.prodi.toLowerCase().includes(query) ||
      item.desa.toLowerCase().includes(query);

    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate stats
  const totalApplicants = applicants.length;
  const pendingCount = applicants.filter((a) => a.status === 'Menunggu Verifikasi').length;
  const verifiedCount = applicants.filter((a) => a.status === 'Diverifikasi').length;
  const acceptedCount = applicants.filter((a) => a.status === 'Diterima').length;
  const revisionCount = applicants.filter((a) => a.status === 'Revisi Berkas').length;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: '1240px' }}>
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
          <ShieldCheck size={16} />
          <span>{backendNotice}</span>
        </div>
      )}

      {notification && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          fontSize: '0.85rem',
          color: '#065f46',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-warning" style={{ background: '#fef3c7', color: '#92400e', marginBottom: '4px' }}>
            Portal Administrator LPPM
          </span>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            Dashboard Verifikasi & Manajemen KKN
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Login sebagai: <strong>{user?.name || 'Administrator LPPM'}</strong> ({user?.email})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={loadData} className="btn btn-secondary" title="Muat Ulang Data">
            <RefreshCw size={15} />
            <span>Segarkan</span>
          </button>
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

      {/* Navigation Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '2px solid #e2e8f0',
        marginBottom: '2rem',
        overflowX: 'auto',
      }}>
        {[
          { key: 'ringkasan', label: 'Ringkasan & Statistik', icon: TrendingUp },
          { key: 'pendaftar', label: `Data Pendaftar (${totalApplicants})`, icon: Users },
          { key: 'lokasi', label: `Kelola Lokasi & Kuota (${locations.length})`, icon: MapPin },
          { key: 'pengumuman', label: 'Pusat Pengumuman', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
                color: isActive ? '#2563eb' : '#64748b',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginBottom: '-2px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: RINGKASAN */}
      {activeTab === 'ringkasan' && (
        <div>
          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #2563eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={20} color="#2563eb" />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Total Pendaftar</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
                {totalApplicants} Mahasiswa
              </h2>
            </div>

            <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="#f59e0b" />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Menunggu Verifikasi</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#d97706' }}>
                {pendingCount} Berkas
              </h2>
            </div>

            <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #06b6d4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCheck size={20} color="#06b6d4" />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Diverifikasi</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#0284c7' }}>
                {verifiedCount} Berkas
              </h2>
            </div>

            <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} color="#ef4444" />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Perlu Revisi</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#dc2626' }}>
                {revisionCount} Berkas
              </h2>
            </div>

            <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Lolos & Diterima</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#059669' }}>
                {acceptedCount} Mahasiswa
              </h2>
            </div>
          </div>

          {/* Shortcut Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                Antrean Berkas Perlu Ditinjau
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Terdapat <strong>{pendingCount} pendaftar</strong> yang saat ini menunggu verifikasi kelayakan dokumen persyaratan.
              </p>
              <button
                onClick={() => {
                  setStatusFilter('Menunggu Verifikasi');
                  setActiveTab('pendaftar');
                }}
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Buka Antrean Verifikasi
              </button>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                Kapasitas Lokasi Pengabdian
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Kelola <strong>{locations.length} desa mitra binaan</strong> dan pantau keterisian kuota secara transparan.
              </p>
              <button
                onClick={() => setActiveTab('lokasi')}
                className="btn btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Kelola Desa & Kuota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA PENDAFTAR */}
      {activeTab === 'pendaftar' && (
        <div className="card" style={{ padding: '1.75rem' }}>
          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Tabel Verifikasi Berkas Pendaftar KKN
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Klik tombol "Verifikasi" pada salah satu pendaftar untuk melihat berkas scan dan menetapkan status kelulusan.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Cari NIM, Nama, atau Desa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    outline: 'none',
                    minWidth: '220px'
                  }}
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: '#ffffff',
                }}
              >
                <option value="all">Semua Status ({totalApplicants})</option>
                <option value="Menunggu Verifikasi">Menunggu Verifikasi ({pendingCount})</option>
                <option value="Diverifikasi">Diverifikasi ({verifiedCount})</option>
                <option value="Revisi Berkas">Revisi Berkas ({revisionCount})</option>
                <option value="Diterima">Diterima ({acceptedCount})</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem' }}>NIM / No. Registrasi</th>
                  <th style={{ padding: '0.75rem' }}>Nama Mahasiswa</th>
                  <th style={{ padding: '0.75rem' }}>Program Studi</th>
                  <th style={{ padding: '0.75rem' }}>SKS / IPK</th>
                  <th style={{ padding: '0.75rem' }}>Pilihan Lokasi</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Aksi Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.nim}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                          {item.registrationNumber}
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.email}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div>{item.prodi}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.fakultas}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span style={{ fontWeight: 600, color: '#059669' }}>{item.sks} SKS</span>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>IPK: {item.ipk}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.desa}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.kecamatan}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span className={`badge ${
                          item.status === 'Diterima' ? 'badge-success' :
                          item.status === 'Diverifikasi' ? 'badge-primary' :
                          item.status === 'Revisi Berkas' ? 'badge-warning' : 'badge-warning'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedApplicant(item)}
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          <Eye size={14} />
                          <span>Verifikasi Berkas</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                      Tidak ada data pendaftar yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA LOKASI */}
      {activeTab === 'lokasi' && (
        <div className="card" style={{ padding: '1.75rem' }}>
          <LokasiManager locations={locations} onReloadLocations={loadData} />
        </div>
      )}

      {/* TAB 4: PENGUMUMAN */}
      {activeTab === 'pengumuman' && (
        <div className="card" style={{ padding: '1.75rem' }}>
          <PengumumanManager />
        </div>
      )}

      {/* Verification Modal Popup */}
      {selectedApplicant && (
        <VerifikasiModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
