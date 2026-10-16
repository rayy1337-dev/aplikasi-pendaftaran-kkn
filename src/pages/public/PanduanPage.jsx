import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

export default function PanduanPage() {
  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary">Pedoman Resmi</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Panduan Pendaftaran Mahasiswa</h1>
        <p style={{ color: '#64748b' }}>Periksa kriteria persyaratan akademik dan kelengkapan dokumen sebelum mendaftar.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Persyaratan Akademik */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
              <BookOpen size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Persyaratan Akademik</h2>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569' }}>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Telah menempuh dan lulus minimal <strong>100 SKS</strong> per semester ini.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Memiliki Indeks Prestasi Kumulatif (IPK) minimal <strong>2.50</strong>.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Tidak sedang mengambil mata kuliah praktikum bentrok pada semester berjalan.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Berstatus mahasiswa aktif dan tidak sedang cuti kuliah.</span>
            </li>
          </ul>
        </div>

        {/* Dokumen Persyaratan */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ padding: '10px', background: '#e0f2fe', borderRadius: '10px', color: '#0284c7' }}>
              <FileText size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Dokumen Wajib Diunggah</h2>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569' }}>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Scan Kartu Tanda Mahasiswa (KTM) asli (Format PDF/JPG, maks 2MB).</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Transkrip Nilai Akademik terakhir bertanda tangan/barcode prodi.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Surat Keterangan Berbadan Sehat dari Puskesmas / Klinik Dokter.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Surat Pernyataan Izin Orang Tua / Wali bermaterai.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
