import React, { useState } from 'react';
import { CheckCircle, MapPin, User, FileText, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react';

export default function StepKonfirmasi({ formData, location, files, onAgreementChange, isAgreed, isSubmitting, error }) {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          Langkah 4: Konfirmasi & Review Data Pendaftaran
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Harap periksa kembali seluruh rincian biodata, pilihan lokasi pengabdian, dan berkas yang telah Anda unggah sebelum melakukan pengiriman formulir final.
        </p>
      </div>

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#b91c1c',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Review Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Section 1: Biodata */}
        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', color: '#2563eb' }}>
            <User size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Ringkasan Data Akademik</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>NIM</span>
              <strong style={{ color: '#0f172a' }}>{formData.nim || '-'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Nama Lengkap</span>
              <strong style={{ color: '#0f172a' }}>{formData.name || '-'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Email Mahasiswa</span>
              <strong style={{ color: '#0f172a' }}>{formData.email || '-'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>No. WhatsApp</span>
              <strong style={{ color: '#0f172a' }}>{formData.noHp || '-'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Fakultas</span>
              <strong style={{ color: '#0f172a' }}>{formData.fakultas || '-'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Program Studi</span>
              <strong style={{ color: '#0f172a' }}>{formData.prodi || '-'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>Total SKS Lulus</span>
              <strong style={{ color: '#059669' }}>{formData.sks} SKS (Memenuhi Syarat)</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>IPK Terakhir</span>
              <strong style={{ color: '#0f172a' }}>{formData.ipk}</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Pilihan Lokasi */}
        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', color: '#2563eb' }}>
            <MapPin size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Lokasi Pengabdian Terpilih</h3>
          </div>

          {location ? (
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '4px' }}>{location.kategori}</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{location.desa}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{location.kecamatan}, {location.kabupaten}, {location.provinsi || 'Jawa Barat'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>DPL:</span>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{location.dpl || 'Tim DPL LPPM'}</div>
                </div>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#334155' }}>
                <strong>Tema KKN:</strong> {location.tema}
              </div>
            </div>
          ) : (
            <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>Belum ada lokasi yang dipilih.</p>
          )}
        </div>

        {/* Section 3: Berkas yang Diunggah */}
        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', color: '#2563eb' }}>
            <FileText size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Lampiran Berkas Persyaratan</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Kartu Tanda Mahasiswa (KTM)', file: files.ktm },
              { label: 'Transkrip Nilai Sementara', file: files.transkrip },
              { label: 'Surat Keterangan Sehat', file: files.suratSehat },
              { label: 'Surat Izin Orang Tua', file: files.suratIzin },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.85rem',
                  borderRadius: '8px',
                  background: item.file ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${item.file ? '#bbf7d0' : '#fecaca'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ color: item.file ? '#16a34a' : '#dc2626' }}>
                  {item.file ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.file ? `${item.file.name} (${item.file.size})` : 'Belum diunggah'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div style={{
        padding: '1.25rem',
        borderRadius: '12px',
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        marginBottom: '2rem'
      }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => onAgreementChange(e.target.checked)}
            style={{ width: '18px', height: '18px', marginTop: '3px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
            <strong>Pernyataan Integritas & Kebenaran Data:</strong> Saya menyatakan bahwa seluruh biodata dan dokumen lampiran yang saya serahkan adalah sah, benar, dan merupakan milik saya sendiri. Apabila di kemudian hari ditemukan pemalsuan dokumen atau ketidaksesuaian data, saya bersedia menerima sanksi pembatalan kepesertaan KKN sesuai peraturan yang berlaku di universitas.
          </span>
        </label>
      </div>
    </div>
  );
}

