import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  CheckCircle, 
  FileText, 
  MapPin, 
  AlertCircle, 
  Clock, 
  Home, 
  ArrowRight, 
  Printer, 
  RefreshCw, 
  AlertTriangle,
  Award,
  Users,
  Eye,
  Trash2,
  Bell,
  Calendar,
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { pendaftaranService } from '../../services/pendaftaranService';
import { announcementService } from '../../services/announcementService';
import BuktiPendaftaranModal from '../../components/pendaftaran/BuktiPendaftaranModal';
import RevisiBerkasModal from '../../components/mahasiswa/RevisiBerkasModal';

export default function MahasiswaDashboard() {
  const { user, logout, backendNotice } = useAuth();
  const navigate = useNavigate();

  const [registration, setRegistration] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [peers, setPeers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBuktiModal, setShowBuktiModal] = useState(false);
  const [showRevisiModal, setShowRevisiModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const studentName = user?.name || 'Feris Pratama';
  const studentNim = user?.nim || '220101001';

  const loadData = async () => {
    setIsLoading(true);
    const [regRes, annRes, allApplicantsRes] = await Promise.all([
      pendaftaranService.getByStudent(studentNim),
      announcementService.getAll(),
      pendaftaranService.getAll(),
    ]);

    if (regRes.data) {
      setRegistration(regRes.data);
      // If student is accepted, find peer members in the same village
      if (regRes.data.desa && allApplicantsRes.data) {
        const villagePeers = allApplicantsRes.data.filter(
          (a) => a.desa === regRes.data.desa && a.nim !== studentNim && (a.status === 'Diterima' || a.status === 'Diverifikasi')
        );
        setPeers(villagePeers);
      }
    } else {
      setRegistration(null);
    }

    if (annRes.data) {
      setAnnouncements(annRes.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [studentNim]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRevisiSuccess = async (id, updatedBerkas, catatan) => {
    const res = await pendaftaranService.revisiUpload(id, updatedBerkas, catatan);
    if (res.data) {
      setRegistration(res.data);
      setStatusMessage('Berkas revisi berhasil diunggah. Status kembali ke Menunggu Verifikasi.');
    }
  };

  const handleResetRegistration = async () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan/mereset pendaftaran KKN ini untuk pengujian ulang?')) {
      if (registration?.id) {
        await pendaftaranService.delete(registration.id);
        setRegistration(null);
        setStatusMessage('Pendaftaran berhasil direset.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Diterima':
        return { border: '#10b981', bg: '#ecfdf5', text: '#065f46', badge: 'badge-success' };
      case 'Diverifikasi':
        return { border: '#2563eb', bg: '#eff6ff', text: '#1e40af', badge: 'badge-primary' };
      case 'Revisi Berkas':
        return { border: '#ef4444', bg: '#fef2f2', text: '#991b1b', badge: 'badge-warning' };
      default:
        return { border: '#f59e0b', bg: '#fffbeb', text: '#92400e', badge: 'badge-warning' };
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
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

      {statusMessage && (
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
          <span>{statusMessage}</span>
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

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={loadData} className="btn btn-secondary" title="Segarkan Data">
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

      {isLoading ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem', width: '28px', height: '28px' }} />
          <p>Memuat status pendaftaran Anda...</p>
        </div>
      ) : !registration ? (
        /* If NOT Registered */
        <div>
          <div className="card" style={{ padding: '2.5rem 2rem', marginBottom: '2rem', borderLeft: '6px solid #f59e0b', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: '680px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 700 }}>
                  <Clock size={20} />
                  <span>Status: Belum Mengisi Formulir Pendaftaran</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
                  Pendaftaran KKN Semester Genap 2026/2027 Sedang Dibuka
                </h2>
                <p style={{ color: '#64748b', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  Anda belum menyerahkan formulir pendaftaran KKN. Silakan ikuti <strong>Wizard 4 Langkah</strong> untuk melengkapi biodata akademik, memilih desa pengabdian, dan mengunggah berkas persyaratan.
                </p>
              </div>

              <Link to="/mahasiswa/daftar" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                <span>Mulai Pendaftaran Sekarang</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Guide Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
                  <MapPin size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Pilihan Lokasi Desa</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Tersedia 6+ desa mitra di berbagai kabupaten dengan kuota real-time dan fokus tema pengabdian yang beragam.
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
                Siapkan scan KTM, Transkrip Akademik (min 100 SKS), Surat Keterangan Sehat, dan Surat Izin Orang Tua (maks 2MB).
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
                Rilis penetapan kelompok dan DPL resmi dijadwalkan pada 26 November 2026 setelah seluruh berkas diverifikasi LPPM.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* If REGISTERED */
        <div>
          {/* Main Status Banner */}
          {(() => {
            const colors = getStatusColor(registration.status);
            return (
              <div
                className="card"
                style={{
                  padding: '2rem',
                  marginBottom: '2rem',
                  borderLeft: `6px solid ${colors.border}`,
                  background: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div style={{ maxWidth: '680px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.text, fontWeight: 700 }}>
                      {registration.status === 'Diterima' ? (
                        <CheckCircle size={20} />
                      ) : registration.status === 'Revisi Berkas' ? (
                        <AlertTriangle size={20} />
                      ) : (
                        <Clock size={20} />
                      )}
                      <span>Status Pendaftaran KKN: {registration.status}</span>
                    </div>

                    <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
                      {registration.status === 'Diterima' && 'Selamat! Anda Diterima di Lokasi Pengabdian'}
                      {registration.status === 'Diverifikasi' && 'Berkas Terverifikasi Memenuhi Syarat'}
                      {registration.status === 'Revisi Berkas' && 'Perhatian: Berkas Perlu Perbaikan'}
                      {registration.status === 'Menunggu Verifikasi' && 'Berkas Anda Dalam Antrean Verifikasi'}
                    </h2>

                    <p style={{ color: '#475569', marginTop: '0.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      {registration.catatanAdmin}
                    </p>

                    <div style={{ marginTop: '0.85rem', fontSize: '0.825rem', color: '#64748b' }}>
                      Nomor Registrasi: <strong style={{ color: '#2563eb', fontFamily: 'monospace' }}>{registration.registrationNumber}</strong> • Waktu Submit: {registration.registeredAt}
                    </div>
                  </div>

                  {/* Actions for Status */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                    <button
                      onClick={() => setShowBuktiModal(true)}
                      className="btn btn-secondary"
                      style={{ justifyContent: 'center' }}
                    >
                      <Printer size={16} />
                      <span>Cetak Bukti Registrasi</span>
                    </button>

                    {registration.status === 'Revisi Berkas' && (
                      <button
                        onClick={() => setShowRevisiModal(true)}
                        className="btn btn-primary"
                        style={{ background: '#dc2626', borderColor: '#b91c1c', justifyContent: 'center' }}
                      >
                        <RefreshCw size={16} />
                        <span>Unggah Berkas Revisi</span>
                      </button>
                    )}

                    <button
                      onClick={handleResetRegistration}
                      className="btn btn-secondary"
                      style={{ color: '#64748b', fontSize: '0.75rem', justifyContent: 'center' }}
                    >
                      <Trash2 size={13} />
                      <span>Reset Pendaftaran (Uji Coba)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* DITERIMA: SPECIAL PLACEMENT & GROUP ANNOUNCEMENT CARD */}
          {registration.status === 'Diterima' && (
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid #a7f3d0', background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', marginBottom: '1rem' }}>
                <Sparkles size={22} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46' }}>
                  Pengumuman Penempatan & Kelompok KKN Resmi
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Penetapan Kelompok:</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46' }}>
                    {registration.kelompok || 'Kelompok KKN-02'}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                    Wilayah: {registration.desa}, {registration.kecamatan}
                  </p>
                </div>

                <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Dosen Pembimbing Lapangan (DPL):</span>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                    {registration.dpl || 'Dr. H. Mulyadi, M.Si.'}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#059669', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={13} /> Kontak LPPM: (021) 789-0123 ext. 44
                  </p>
                </div>

                <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Jadwal Keberangkatan & Posko:</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                    Pelepasan: 01 Desember 2026
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                    Lokasi: Lapangan Rektorat Utama Kampus
                  </p>
                </div>
              </div>

              {/* Peer Group Members */}
              {peers.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #d1fae5' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#065f46', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} /> Anggota Mahasiswa Lain di Lokasi yang Sama ({peers.length} Mahasiswa):
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {peers.map((p) => (
                      <span
                        key={p.nim}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #a7f3d0',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          color: '#1e293b',
                          fontWeight: 500,
                        }}
                      >
                        <strong>{p.name}</strong> ({p.prodi})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {/* Lokasi Card */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: '#2563eb' }}>
                <MapPin size={22} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Lokasi Pengabdian</h3>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{registration.desa}</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '2px' }}>
                  {registration.kecamatan}, {registration.kabupaten}
                </p>

                <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                  <div style={{ color: '#475569', marginBottom: '4px' }}>
                    <strong>Dosen Pembimbing Lapangan (DPL):</strong>
                  </div>
                  <div style={{ color: '#1e293b', fontWeight: 600 }}>{registration.dpl || 'Dr. H. Mulyadi, M.Si.'}</div>
                </div>

                {registration.kelompok && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#ecfdf5', borderRadius: '6px', color: '#065f46', fontSize: '0.85rem', fontWeight: 700 }}>
                    Penempatan: {registration.kelompok}
                  </div>
                )}
              </div>
            </div>

            {/* Berkas Card */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: '#2563eb' }}>
                <FileText size={22} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Status Berkas Terunggah</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Kartu Tanda Mahasiswa (KTM)', file: registration.berkas?.ktm },
                  { label: 'Transkrip Nilai Sementara', file: registration.berkas?.transkrip },
                  { label: 'Surat Keterangan Sehat', file: registration.berkas?.suratSehat },
                  { label: 'Surat Izin Orang Tua', file: registration.berkas?.suratIzin },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {item.file ? `${item.file.name} (${item.file.size || 'Terlampir'})` : 'Belum diunggah'}
                      </div>
                    </div>
                    {item.file ? (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        <CheckCircle size={12} /> Valid
                      </span>
                    ) : (
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                        Kosong
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements Section */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: '#2563eb' }}>
          <Bell size={20} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
            Pengumuman & Informasi Terbaru LPPM
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {announcements.slice(0, 3).map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className={`badge ${
                  item.category === 'Penting' ? 'badge-warning' : 'badge-primary'
                }`} style={{ fontSize: '0.7rem' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {item.date}
                </span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Modal */}
      {showBuktiModal && registration && (
        <BuktiPendaftaranModal
          registration={registration}
          onClose={() => setShowBuktiModal(false)}
        />
      )}

      {/* Revision Modal */}
      {showRevisiModal && registration && (
        <RevisiBerkasModal
          registration={registration}
          onClose={() => setShowRevisiModal(false)}
          onRevisiSuccess={handleRevisiSuccess}
        />
      )}
    </div>
  );
}
