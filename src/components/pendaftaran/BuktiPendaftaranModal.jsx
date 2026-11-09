import React from 'react';
import { CheckCircle2, Printer, ArrowRight, ShieldCheck, Download, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BuktiPendaftaranModal({ registration, onClose }) {
  const navigate = useNavigate();

  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleGoDashboard = () => {
    if (onClose) onClose();
    navigate('/mahasiswa/dashboard');
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
        maxWidth: '680px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#ecfdf5',
            color: '#059669',
            marginBottom: '0.75rem'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            Pendaftaran KKN Berhasil Diserahkan!
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
            Simpan atau cetak kartu bukti pendaftaran ini sebagai tanda terima resmi kepesertaan KKN.
          </p>
        </div>

        {/* Printable Official Receipt Card */}
        <div id="printable-kkn-receipt" style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '12px',
          padding: '1.5rem',
          background: '#f8fafc',
          marginBottom: '1.75rem'
        }}>
          {/* Receipt Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', color: '#2563eb' }}>
                UNIVERSITAS • LEMBAGA PENELITIAN & PENGABDIAN MASYARAKAT (LPPM)
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                KARTU BUKTI REGISTRASI KKN 2026/2027
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                {registration.status || 'Menunggu Verifikasi'}
              </div>
            </div>
          </div>

          {/* Registration Number & Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Nomor Registrasi:</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', fontFamily: 'monospace' }}>
                {registration.registrationNumber}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Waktu Pendaftaran:</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                {registration.registeredAt}
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>NIM:</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{registration.nim}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Nama Mahasiswa:</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{registration.name}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Program Studi / Fakultas:</span>
              <div style={{ fontWeight: 600, color: '#334155' }}>{registration.prodi} ({registration.fakultas})</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>SKS / IPK:</span>
              <div style={{ fontWeight: 600, color: '#334155' }}>{registration.sks} SKS • IPK {registration.ipk}</div>
            </div>
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Lokasi Pengabdian:</span>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                {registration.desa}, {registration.kecamatan}, {registration.kabupaten}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '2px' }}>
                DPL: <strong>{registration.dpl || 'Dosen Pembimbing Lapangan LPPM'}</strong>
              </div>
            </div>
          </div>

          {/* Validation Code */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', marginTop: '1.25rem', paddingTop: '0.85rem', fontSize: '0.75rem', color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#059669" />
              <span>Dokumen diverifikasi secara digital oleh Portal KKN-Connect LPPM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace', color: '#0f172a', fontWeight: 600 }}>
              <QrCode size={16} /> QR-VERIFIED
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.25rem' }}
          >
            <Printer size={16} />
            <span>Cetak / Simpan PDF</span>
          </button>

          <button
            type="button"
            onClick={handleGoDashboard}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.5rem' }}
          >
            <span>Buka Dashboard Mahasiswa</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

