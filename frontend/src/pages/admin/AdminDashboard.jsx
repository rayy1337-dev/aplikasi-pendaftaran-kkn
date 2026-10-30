import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, CheckCircle, Clock, AlertTriangle, LogOut, Search, RefreshCw, FileText, Check, X, Edit3, Loader2 } from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/registrations');
      if (res.data?.data) {
        setApplicants(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleVerify = async (id, status, defaultNote) => {
    let note = defaultNote;
    if (status === 'revision') {
      const input = window.prompt('Masukkan catatan revisi berkas untuk mahasiswa:', 'Berkas belum jelas, mohon unggah ulang.');
      if (input === null) return;
      note = input;
    } else if (status === 'rejected') {
      const input = window.prompt('Masukkan alasan penolakan berkas:', 'Tidak memenuhi syarat SKS minimal.');
      if (input === null) return;
      note = input;
    }

    setActionLoadingId(id);
    try {
      await api.put(`/admin/registrations/${id}/verify`, {
        status,
        catatan_admin: note,
      });
      await fetchApplicants();
    } catch (err) {
      console.error('Verification error:', err);
      alert(err.response?.data?.message || 'Gagal mengubah status pendaftaran.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered applicants
  const filtered = applicants.filter((item) => {
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const s = search.toLowerCase();
    const matchSearch = !search ||
      (item.mahasiswa?.nim && item.mahasiswa.nim.toLowerCase().includes(s)) ||
      (item.mahasiswa?.nama_lengkap && item.mahasiswa.nama_lengkap.toLowerCase().includes(s)) ||
      (item.lokasi?.nama_desa_wilayah && item.lokasi.nama_desa_wilayah.toLowerCase().includes(s));
    return matchStatus && matchSearch;
  });

  const countPending = applicants.filter((a) => a.status === 'pending').length;
  const countVerified = applicants.filter((a) => a.status === 'verified' || a.status === 'approved').length;
  const countRevision = applicants.filter((a) => a.status === 'revision').length;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-primary">Portal Admin LPPM</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>
            Dashboard Verifikasi Pendaftar KKN
          </h1>
          <p style={{ color: '#64748b' }}>Kelola berkas pendaftaran mahasiswa dan validasi kelayakan secara real-time</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={fetchApplicants} className="btn btn-secondary" title="Muat Ulang Data">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Admin Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="#2563eb" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Total Pendaftar</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>{applicants.length} Mahasiswa</h2>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} color="#f59e0b" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Perlu Verifikasi</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>{countPending} Berkas</h2>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={20} color="#10b981" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Telah Lolos / Disetujui</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>{countVerified} Mahasiswa</h2>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} color="#d97706" />
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Perlu Revisi</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>{countRevision} Berkas</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Data Antrian Pendaftar Terkini</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none',
                background: '#fff'
              }}
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu (Pending)</option>
              <option value="verified">Diverifikasi</option>
              <option value="revision">Perlu Revisi</option>
              <option value="rejected">Ditolak</option>
            </select>

            <div style={{ position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari NIM / Nama / Desa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
            <p>Memuat data antrean pendaftar...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <p>Belum ada data pendaftar yang sesuai.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem' }}>NIM</th>
                  <th style={{ padding: '0.75rem' }}>Nama Mahasiswa</th>
                  <th style={{ padding: '0.75rem' }}>Prodi / SKS</th>
                  <th style={{ padding: '0.75rem' }}>Lokasi Pilihan</th>
                  <th style={{ padding: '0.75rem' }}>Berkas</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Aksi Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>{item.mahasiswa?.nim || '-'}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <strong>{item.mahasiswa?.nama_lengkap || '-'}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.mahasiswa?.email}</div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', color: '#64748b' }}>
                      {item.mahasiswa?.program_studi}
                      <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>{item.mahasiswa?.total_sks} SKS</div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <strong>{item.lokasi?.nama_desa_wilayah}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Kec. {item.lokasi?.kecamatan}</div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      {item.berkas && item.berkas.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {item.berkas.map((b) => (
                            <span key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#2563eb' }}>
                              <FileText size={12} />
                              <span>{b.jenis_berkas.toUpperCase()}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span className={`badge ${
                        item.status === 'verified' || item.status === 'approved' ? 'badge-success' :
                        item.status === 'revision' ? 'badge-warning' :
                        item.status === 'rejected' ? 'badge-danger' : 'badge-primary'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                      {item.catatan_admin && (
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', maxWidth: '200px' }}>
                          <em>{item.catatan_admin}</em>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>
                      {actionLoadingId === item.id ? (
                        <Loader2 size={18} className="animate-spin" style={{ margin: '0 auto' }} />
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleVerify(item.id, 'verified', 'Berkas telah diperiksa dan dinyatakan lengkap.')}
                            title="Setujui / Terima Berkas"
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#dcfce7',
                              color: '#15803d',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}
                          >
                            <Check size={14} />
                            <span>Terima</span>
                          </button>

                          <button
                            onClick={() => handleVerify(item.id, 'revision')}
                            title="Minta Revisi Berkas"
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#fef3c7',
                              color: '#d97706',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}
                          >
                            <Edit3 size={14} />
                            <span>Revisi</span>
                          </button>

                          <button
                            onClick={() => handleVerify(item.id, 'rejected')}
                            title="Tolak Pendaftaran"
                            style={{
                              padding: '6px 8px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#fee2e2',
                              color: '#b91c1c',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '0.8rem'
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
