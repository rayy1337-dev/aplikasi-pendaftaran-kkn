import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, CheckCircle, FileText, MapPin, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import api from '../../services/api';

export default function MahasiswaDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [meRes, regRes] = await Promise.all([
        api.get('/auth/me').catch(() => null),
        api.get('/registrations/my').catch(() => null),
      ]);

      if (meRes?.data?.data) {
        const u = meRes.data.data.user;
        const p = meRes.data.data.profile;
        setUser({
          ...u,
          name: p?.nama_lengkap || u?.nim || 'Mahasiswa',
          nim: p?.nim || u?.nim,
          prodi: p?.program_studi,
          sks: p?.total_sks,
        });
      } else {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
      }

      if (regRes?.data?.data && regRes.data.data.length > 0) {
        setRegistration(regRes.data.data[0]);
      } else {
        setRegistration(null);
      }
    } catch (err) {
      console.error('Error fetching mahasiswa dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return { label: 'Berkas Diverifikasi', bg: '#dcfce7', color: '#15803d', icon: <CheckCircle size={20} /> };
      case 'approved':
        return { label: 'Diterima & Ditetapkan', bg: '#dbeafe', color: '#1e40af', icon: <CheckCircle size={20} /> };
      case 'revision':
        return { label: 'Perlu Revisi Berkas', bg: '#fef3c7', color: '#d97706', icon: <AlertCircle size={20} /> };
      case 'rejected':
        return { label: 'Pendaftaran Ditolak', bg: '#fee2e2', color: '#b91c1c', icon: <AlertCircle size={20} /> };
      case 'pending':
      default:
        return { label: 'Menunggu Verifikasi LPPM', bg: '#fef3c7', color: '#d97706', icon: <Clock size={20} /> };
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-primary">Portal Mahasiswa</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>
            Selamat Datang, {user?.name || user?.nama_lengkap || 'Mahasiswa'}
          </h1>
          <p style={{ color: '#64748b' }}>
            NIM: {user?.nim || '-'} | Program Studi: {user?.prodi || 'Informatika'} | Status: Aktif
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={fetchDashboardData} className="btn btn-secondary" title="Perbarui Data">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Status Card */}
      {registration ? (
        <div className="card" style={{
          padding: '2rem',
          marginBottom: '2rem',
          borderLeft: `6px solid ${getStatusBadge(registration.status).color}`,
          background: '#fff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                background: getStatusBadge(registration.status).bg,
                color: getStatusBadge(registration.status).color,
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '0.75rem'
              }}>
                {getStatusBadge(registration.status).icon}
                <span>Status: {getStatusBadge(registration.status).label}</span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                Lokasi Penempatan: {registration.nama_desa_wilayah}
              </h2>
              <p style={{ color: '#64748b', marginTop: '0.25rem' }}>
                Kecamatan {registration.kecamatan}, {registration.kabupaten} • Periode {registration.periode_kkn}
              </p>

              {registration.catatan_admin && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.9rem'
                }}>
                  <strong style={{ color: '#334155' }}>Catatan Verifikator LPPM:</strong>
                  <p style={{ color: '#64748b', marginTop: '0.25rem' }}>{registration.catatan_admin}</p>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Tanggal Daftar: {new Date(registration.tanggal_daftar).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
            </div>
          </div>
        </div>
      ) : (
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
                Silakan lengkapi formulir multi-langkah dan pilih lokasi desa sebelum kuota pendaftaran terpenuhi.
              </p>
            </div>
            <Link to="/mahasiswa/daftar" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Mulai Isi Pendaftaran
            </Link>
          </div>
        </div>
      )}

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
            {registration ? `${registration.nama_desa_wilayah}, Kec. ${registration.kecamatan}` : 'Belum ada desa yang dipilih.'}
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
            {registration?.berkas?.length ? `${registration.berkas.length} berkas telah diunggah.` : 'Belum ada berkas terunggah.'}
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
            {registration?.status === 'verified' || registration?.status === 'approved'
              ? 'Berkas telah disetujui panitia LPPM.'
              : 'Menunggu proses verifikasi berkas oleh admin LPPM.'}
          </p>
        </div>
      </div>
    </div>
  );
}
