import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, FileText, ExternalLink, User, MapPin, ShieldAlert, Award } from 'lucide-react';

export default function VerifikasiModal({ applicant, onClose, onUpdateStatus }) {
  const [activeTab, setActiveTab] = useState('ktm');
  const [actionType, setActionType] = useState(null); // 'terima' | 'revisi' | 'tolak'
  const [catatan, setCatatan] = useState('');
  const [kelompokName, setKelompokName] = useState(applicant?.kelompok || 'Kelompok KKN-08');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!applicant) return null;

  const berkasItems = [
    { key: 'ktm', label: 'Kartu Tanda Mahasiswa (KTM)', file: applicant.berkas?.ktm },
    { key: 'transkrip', label: 'Transkrip Nilai Sementara', file: applicant.berkas?.transkrip },
    { key: 'suratSehat', label: 'Surat Keterangan Sehat', file: applicant.berkas?.suratSehat },
    { key: 'suratIzin', label: 'Surat Izin Orang Tua', file: applicant.berkas?.suratIzin },
  ];

  const currentDoc = berkasItems.find((b) => b.key === activeTab)?.file;

  const handleSubmitAction = async (status) => {
    if (status === 'Revisi Berkas' && !catatan.trim()) {
      setError('Harap isi kolom catatan revisi agar mahasiswa mengetahui bagian dokumen yang perlu diperbaiki.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onUpdateStatus(applicant.id, {
        status,
        catatanAdmin: catatan || (status === 'Diterima' ? 'Pendaftaran disetujui penuh oleh tim LPPM.' : status === 'Diverifikasi' ? 'Dokumen persyaratan telah lolos verifikasi.' : 'Pendaftaran ditolak karena tidak memenuhi kualifikasi.'),
        kelompok: status === 'Diterima' ? kelompokName : applicant.kelompok,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui status pendaftar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      zIndex: 9999,
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8fafc'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-primary">Verifikasi Dokumen LPPM</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{applicant.registrationNumber}</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              {applicant.name} ({applicant.nim})
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          {/* Student Overview Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '10px',
            background: '#f1f5f9',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Program Studi / Fak:</span>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>{applicant.prodi}</div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>{applicant.fakultas}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Beban SKS & IPK:</span>
              <div style={{ fontWeight: 700, color: '#059669' }}>{applicant.sks} SKS • IPK {applicant.ipk}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Pilihan Lokasi:</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{applicant.desa}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{applicant.kecamatan}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Status Saat Ini:</span>
              <div style={{ marginTop: '2px' }}>
                <span className={`badge ${
                  applicant.status === 'Diterima' ? 'badge-success' :
                  applicant.status === 'Diverifikasi' ? 'badge-primary' : 'badge-warning'
                }`}>
                  {applicant.status}
                </span>
              </div>
            </div>
          </div>

          {/* Document Preview Tabs */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
              Pilih Berkas Lampiran untuk Ditinjau:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {berkasItems.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setActiveTab(b.key)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: activeTab === b.key ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: activeTab === b.key ? '#eff6ff' : '#ffffff',
                    color: activeTab === b.key ? '#1d4ed8' : '#64748b',
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Document Preview Viewer Box */}
          <div style={{
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.25rem',
            background: '#fafafa',
            marginBottom: '1.5rem',
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {currentDoc ? (
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} color="#2563eb" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{currentDoc.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({currentDoc.size || '350 KB'})</span>
                  </div>
                  {currentDoc.url && (
                    <a
                      href={currentDoc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      <ExternalLink size={14} /> Buka Tab Baru
                    </a>
                  )}
                </div>

                {/* Simulated Visual Preview */}
                <div style={{
                  height: '240px',
                  background: '#ffffff',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {currentDoc.url?.includes('http') ? (
                    <img
                      src={currentDoc.url}
                      alt={currentDoc.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 8px' }} />
                      <p>Dokumen PDF Resmi: <strong>{currentDoc.name}</strong></p>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Stempel dan tanda tangan terverifikasi.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ color: '#94a3b8' }}>
                <FileText size={40} style={{ margin: '0 auto 8px' }} />
                <p>Mahasiswa belum melampirkan berkas ini.</p>
              </div>
            )}
          </div>

          {/* Action Choice Buttons */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
              Keputusan Verifikasi LPPM:
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActionType('terima')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: actionType === 'terima' ? '2px solid #059669' : '1px solid #cbd5e1',
                  background: actionType === 'terima' ? '#ecfdf5' : '#ffffff',
                  color: actionType === 'terima' ? '#065f46' : '#334155',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={16} color="#059669" />
                <span>Terima & Loloskan (Diterima)</span>
              </button>

              <button
                type="button"
                onClick={() => setActionType('revisi')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: actionType === 'revisi' ? '2px solid #d97706' : '1px solid #cbd5e1',
                  background: actionType === 'revisi' ? '#fffbeb' : '#ffffff',
                  color: actionType === 'revisi' ? '#92400e' : '#334155',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <AlertTriangle size={16} color="#d97706" />
                <span>Minta Revisi Berkas</span>
              </button>

              <button
                type="button"
                onClick={() => setActionType('tolak')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: actionType === 'tolak' ? '2px solid #dc2626' : '1px solid #cbd5e1',
                  background: actionType === 'tolak' ? '#fef2f2' : '#ffffff',
                  color: actionType === 'tolak' ? '#991b1b' : '#334155',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <XCircle size={16} color="#dc2626" />
                <span>Tolak Pendaftaran</span>
              </button>
            </div>
          </div>

          {/* Conditional Input depending on Action */}
          {actionType === 'terima' && (
            <div style={{ padding: '1rem', background: '#ecfdf5', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #a7f3d0' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#065f46', marginBottom: '0.35rem' }}>
                Penetapan Regu Kelompok KKN:
              </label>
              <input
                type="text"
                value={kelompokName}
                onChange={(e) => setKelompokName(e.target.value)}
                placeholder="Contoh: Kelompok KKN-12"
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #6ee7b7',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {actionType === 'revisi' && (
            <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #fde68a' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#92400e', marginBottom: '0.35rem' }}>
                Catatan Revisi untuk Mahasiswa <span style={{ color: '#ef4444' }}>*</span>:
              </label>
              <textarea
                rows={3}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: File transkrip nilai belum memuat stempel Dekanat / BAAK. Harap unggah ulang transkrip resmi."
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '6px',
                  border: '1px solid #fcd34d',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#b45309' }}>
                Catatan ini akan langsung tampil di dashboard mahasiswa dan mahasiswa dapat mengunggah dokumen baru.
              </span>
            </div>
          )}

          {error && (
            <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          background: '#f8fafc'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Tutup
          </button>

          {actionType === 'terima' && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmitAction('Diterima')}
              className="btn btn-primary"
              style={{ background: '#059669', borderColor: '#047857' }}
            >
              {isSubmitting ? 'Menyimpan...' : 'Konfirmasi Lolos & Diterima'}
            </button>
          )}

          {actionType === 'revisi' && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmitAction('Revisi Berkas')}
              className="btn btn-primary"
              style={{ background: '#d97706', borderColor: '#b45309' }}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Revisi'}
            </button>
          )}

          {actionType === 'tolak' && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmitAction('Ditolak')}
              className="btn btn-primary"
              style={{ background: '#dc2626', borderColor: '#b91c1c' }}
            >
              {isSubmitting ? 'Menyimpan...' : 'Konfirmasi Tolak Pendaftaran'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

