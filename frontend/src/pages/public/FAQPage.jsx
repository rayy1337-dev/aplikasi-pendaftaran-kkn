import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Apakah saya bisa mengubah pilihan lokasi setelah submit?',
      a: 'Pilihan lokasi tidak dapat diubah setelah finalisasi, kecuali admin memberikan catatan revisi pada saat verifikasi berkas.',
    },
    {
      q: 'Bagaimana jika kuota desa yang saya tuju sudah penuh?',
      a: 'Sistem akan otomatis mengunci pemilihan untuk lokasi dengan kuota 0. Silakan pilih alternatif desa lain yang masih memiliki sisa kuota.',
    },
    {
      q: 'Berapa lama proses verifikasi berkas oleh admin?',
      a: 'Verifikasi berkas biasanya memakan waktu 2 hingga 5 hari kerja sejak berkas disubmit.',
    },
    {
      q: 'Apakah mahasiswa yang sedang magang/MBKM bisa mendaftar KKN?',
      a: 'Sesuai aturan universitas, program KKN reguler memerlukan kehadiran penuh di lapangan selama periode pelaksanaan. Hubungi DPL atau prodi masing-masing untuk kebijakan konversi.',
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary">Pusat Informasi</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Pertanyaan Sering Diajukan (FAQ)</h1>
        <p style={{ color: '#64748b' }}>Temukan jawaban untuk kendala umum seputar pendaftaran KKN.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="card"
              style={{ padding: '1.5rem', cursor: 'pointer' }}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: isOpen ? '#2563eb' : '#0f172a' }}>
                  {faq.q}
                </h3>
                {isOpen ? <ChevronUp size={20} color="#2563eb" /> : <ChevronDown size={20} color="#64748b" />}
              </div>
              {isOpen && (
                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
