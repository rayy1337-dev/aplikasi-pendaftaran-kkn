import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, Eye, ShieldCheck, FileCheck } from 'lucide-react';

const REQUIRED_DOCUMENTS = [
  {
    key: 'ktm',
    title: 'Kartu Tanda Mahasiswa (KTM)',
    desc: 'Scan atau foto fisik KTM aktif yang memuat NIM dan foto yang jelas.',
    accepted: 'PDF, JPG, PNG (Maks. 2MB)',
    required: true,
  },
  {
    key: 'transkrip',
    title: 'Transkrip Nilai Sementara',
    desc: 'Transkrip akademik resmi yang menunjukkan kelulusan minimal 100 SKS berstempel/ttd basah atau digital BAAK.',
    accepted: 'PDF, JPG, PNG (Maks. 2MB)',
    required: true,
  },
  {
    key: 'suratSehat',
    title: 'Surat Keterangan Sehat',
    desc: 'Surat resmi dari Dokter/Klinik/Puskesmas/Rumah Sakit yang menyatakan kondisi fisik sehat untuk kegiatan lapangan.',
    accepted: 'PDF, JPG, PNG (Maks. 2MB)',
    required: true,
  },
  {
    key: 'suratIzin',
    title: 'Surat Izin Orang Tua / Wali',
    desc: 'Surat persetujuan orang tua/wali bermaterai Rp 10.000 untuk mengikuti KKN di lokasi penempatan.',
    accepted: 'PDF, JPG, PNG (Maks. 2MB)',
    required: true,
  },
];

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export default function StepBerkas({ files, onFileChange, onRemoveFile, errors }) {
  const [fileErrors, setFileErrors] = useState({});

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
    return Math.round(bytes / 1024) + ' KB';
  };

  const handleFileSelect = (docKey, e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate type
    const isValidType =
      ALLOWED_TYPES.includes(selectedFile.type) ||
      /\.(pdf|jpg|jpeg|png)$/i.test(selectedFile.name);

    if (!isValidType) {
      setFileErrors((prev) => ({
        ...prev,
        [docKey]: 'Format file tidak didukung! Harap unggah file berformat PDF, JPG, atau PNG.',
      }));
      return;
    }

    // Validate size
    if (selectedFile.size > MAX_SIZE_BYTES) {
      setFileErrors((prev) => ({
        ...prev,
        [docKey]: `Ukuran file melebihi batas 2MB (${formatFileSize(selectedFile.size)}). Silakan kompres berkas Anda terlebih dahulu.`,
      }));
      return;
    }

    // Clear error
    setFileErrors((prev) => {
      const next = { ...prev };
      delete next[docKey];
      return next;
    });

    // Create file object
    const fileObj = {
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
      sizeBytes: selectedFile.size,
      type: selectedFile.type,
      uploadedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      url: URL.createObjectURL(selectedFile),
      raw: selectedFile,
    };

    onFileChange(docKey, fileObj);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          Langkah 3: Unggah Berkas Persyaratan Administrasi
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Silakan unggah dokumen persyaratan dalam format <strong>PDF, JPG, atau PNG</strong> dengan ukuran maksimal <strong>2 MB per berkas</strong>.
        </p>
      </div>

      {/* Info Tip */}
      <div style={{
        padding: '0.85rem 1.25rem',
        borderRadius: '10px',
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.875rem',
        color: '#1d4ed8'
      }}>
        <ShieldCheck size={20} />
        <div>
          <strong>Tips Verifikasi Cepat:</strong> Pastikan scan dokumen tidak terpotong, tulisan terbaca jelas tanpa blur, dan stempel/tanda tangan terlihat kontras untuk mempercepat persetujuan admin.
        </div>
      </div>

      {/* Document Upload Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {REQUIRED_DOCUMENTS.map((doc) => {
          const currentFile = files[doc.key];
          const hasError = errors[doc.key] || fileErrors[doc.key];

          return (
            <div
              key={doc.key}
              style={{
                border: hasError ? '1px solid #fca5a5' : currentFile ? '1px solid #86efac' : '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                background: currentFile ? '#f0fdf4' : '#ffffff',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                      {doc.title}
                    </h3>
                    {doc.required && (
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>Wajib</span>
                    )}
                    {currentFile && (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                        <CheckCircle2 size={12} /> Terunggah
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.825rem', marginTop: '4px', maxWidth: '650px' }}>
                    {doc.desc}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ketentuan: {doc.accepted}</span>
                </div>
              </div>

              {/* Upload Input or File Display */}
              {currentFile ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: '#ffffff',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  marginTop: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ padding: '8px', background: '#ecfdf5', borderRadius: '6px', color: '#059669' }}>
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                        {currentFile.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Ukuran: {currentFile.size} • Diunggah pukul {currentFile.uploadedAt || 'Hari ini'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {currentFile.url && (
                      <a
                        href={currentFile.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        <Eye size={14} />
                        <span>Lihat File</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveFile(doc.key)}
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: '#dc2626' }}
                    >
                      <Trash2 size={14} />
                      <span>Ganti / Hapus</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    transition: 'all 0.15s ease'
                  }}>
                    <UploadCloud size={32} color="#3b82f6" style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563eb' }}>
                      Klik untuk memilih berkas dari perangkat Anda
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                      Format PDF, JPG, PNG (Maksimum 2MB)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={(e) => handleFileSelect(doc.key, e)}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}

              {/* Error Message */}
              {hasError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '0.8rem', marginTop: '6px' }}>
                  <AlertCircle size={14} />
                  <span>{hasError}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

