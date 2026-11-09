import React, { useState } from 'react';
import { AlertCircle, UploadCloud, CheckCircle2, X, FileText, Send } from 'lucide-react';

const DOC_TYPES = [
  { key: 'ktm', label: 'Kartu Tanda Mahasiswa (KTM)' },
  { key: 'transkrip', label: 'Transkrip Nilai Sementara' },
  { key: 'suratSehat', label: 'Surat Keterangan Sehat' },
  { key: 'suratIzin', label: 'Surat Izin Orang Tua' },
];

export default function RevisiBerkasModal({ registration, onClose, onRevisiSuccess }) {
  const [selectedDocKey, setSelectedDocKey] = useState('suratSehat');
  const [newFile, setNewFile] = useState(null);
  const [catatanMahasiswa, setCatatanMahasiswa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!registration) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran file maksimal 2 MB.');
      return;
    }

    setError('');
    setNewFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      uploadedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      url: URL.createObjectURL(file),
      raw: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFile) {
      setError('Harap pilih dokumen pengganti terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedBerkas = {
        [selectedDocKey]: newFile,
      };

      await onRevisiSuccess(registration.id, updatedBerkas, catatanMahasiswa);
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal mengunggah berkas revisi.');
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
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
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
        maxWidth: '600px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{ padding: '8px', background: '#fee2e2', borderRadius: '8px', color: '#dc2626' }}>
            <AlertCircle size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              Unggah Ulang Berkas Revisi
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.825rem' }}>
              Nomor Registrasi: <strong>{registration.registrationNumber}</strong>
            </p>
          </div>
        </div>

        {/* Admin Revision Note */}
        <div style={{
          padding: '1rem',
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '10px',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
            Catatan Perbaikan dari Tim LPPM:
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9f1239', lineHeight: 1.5 }}>
            "{registration.catatanAdmin || 'Mohon periksa dan unggah kembali dokumen persyaratan yang sesuai.'}"
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Select which document to replace */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Pilih Dokumen yang Ingin Diganti:
            </label>
            <select
              value={selectedDocKey}
              onChange={(e) => setSelectedDocKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                background: '#ffffff',
                outline: 'none',
              }}
            >
              {DOC_TYPES.map((dt) => (
                <option key={dt.key} value={dt.key}>
                  {dt.label} (Saat ini: {registration.berkas?.[dt.key]?.name || 'Belum ada'})
                </option>
              ))}
            </select>
          </div>

          {/* Upload Input */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Unggah File Baru (PDF/JPG/PNG maks. 2MB):
            </label>
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              border: '2px dashed #93c5fd',
              borderRadius: '10px',
              cursor: 'pointer',
              background: '#f8faff',
              transition: 'all 0.15s ease'
            }}>
              <UploadCloud size={30} color="#2563eb" style={{ marginBottom: '6px' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563eb' }}>
                {newFile ? newFile.name : 'Pilih file revisi baru'}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                {newFile ? `Ukuran: ${newFile.size}` : 'Format PDF, JPG, PNG (Maks 2MB)'}
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {/* Student Comment */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Pesan / Catatan Tambahan Mahasiswa (Opsional):
            </label>
            <textarea
              rows={2}
              value={catatanMahasiswa}
              onChange={(e) => setCatatanMahasiswa(e.target.value)}
              placeholder="Contoh: Surat keterangan sehat telah diperbarui dari Puskesmas dengan stempel basah."
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !newFile}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Kirim Perbaikan Berkas</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

