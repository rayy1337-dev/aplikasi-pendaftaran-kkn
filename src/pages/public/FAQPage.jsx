import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const FAQS_DATA = [
  {
    id: 1,
    category: 'persyaratan',
    q: 'Berapa batas minimal SKS untuk bisa mendaftar KKN?',
    a: 'Mahasiswa wajib telah menyelesaikan dan lulus minimal 100 SKS kumulatif per semester berjalan dengan IPK minimal 2.50. Jika SKS Anda kurang dari 100 SKS, berkas pendaftaran akan otomatis berstatus ditolak oleh sistem verifikasi LPPM.',
  },
  {
    id: 2,
    category: 'kuota',
    q: 'Apakah saya bisa mengubah pilihan lokasi desa KKN setelah submit?',
    a: 'Pilihan lokasi tidak dapat diubah setelah finalisasi data pendaftaran, kecuali admin LPPM memberikan catatan "Revisi Lokasi" saat verifikasi berkas jika terjadi over-capacity atau ketidakseimbangan jurusan.',
  },
  {
    id: 3,
    category: 'kuota',
    q: 'Bagaimana jika kuota desa yang saya tuju sudah penuh?',
    a: 'Sistem KKN-Connect mengadopsi prinsip atomic real-time quota. Ketika kuota suatu desa telah terisi penuh, tombol pemilihan untuk desa tersebut akan terkunci otomatis. Mahasiswa dipersilakan memilih alternatif desa binaan lain yang kursinya masih tersedia.',
  },
  {
    id: 4,
    category: 'berkas',
    q: 'Format apa saja yang diperbolehkan untuk upload berkas persyaratan?',
    a: 'Format berkas yang diterima adalah PDF, JPG, atau PNG dengan batas ukuran maksimal 2 MB per berkas (kecuali transkrip nilai akademik maksimal 3 MB). Pastikan seluruh pindaian dokumen terbaca jelas dan tidak buram.',
  },
  {
    id: 5,
    category: 'verifikasi',
    q: 'Berapa lama proses verifikasi berkas oleh admin LPPM?',
    a: 'Proses verifikasi berkas membutuhkan waktu antara 2 hingga 5 hari kerja sejak berkas disubmit. Anda dapat memantau status secara berkala melalui Dashboard Mahasiswa.',
  },
  {
    id: 6,
    category: 'verifikasi',
    q: 'Apa yang harus saya lakukan jika status pendaftaran "Revisi Berkas"?',
    a: 'Jangan panik! Status revisi berkas berarti Anda diberikan kesempatan untuk memperbaiki atau mengunggah ulang dokumen tertentu yang ditolak (misal: transkrip buram atau surat sehat kedaluwarsa). Buka modal revisi di Dashboard Anda, baca catatan admin, lalu upload ulang berkas sebelum masa revisi berakhir.',
  },
  {
    id: 7,
    category: 'umum',
    q: 'Apakah mahasiswa yang sedang magang MBKM dapat mendaftar KKN reguler?',
    a: 'Sesuai regulasi akademik universitas, KKN reguler memerlukan kehadiran fisik penuh 45 hari di posko desa binaan. Mahasiswa yang sedang aktif magang industri dianjurkan mengikuti program KKN Tematik MBKM atau berkonsultasi dengan koordinator prodi masing-masing.',
  },
  {
    id: 8,
    category: 'lapangan',
    q: 'Kapan nama Dosen Pembimbing Lapangan (DPL) diumumkan?',
    a: 'Nama DPL dan susunan lengkap struktur kelompok per desa akan dirilis serentak pada tanggal 26 November 2026 melalui pengumuman resmi di portal KKN-Connect.',
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchSearch =
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '880px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-primary">Pusat Bantuan & Edukasi</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
          Pertanyaan Sering Diajukan (FAQ)
        </h1>
        <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
          Temukan jawaban cepat seputar syarat akademik, kuota desa, berkas persyaratan, dan mekanisme verifikasi.
        </p>
      </div>

      {/* Search Input Box */}
      <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
        <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Ketik kata kunci pertanyaan (contoh: kuota, berkas, SKS, revisi, DPL)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem 1rem 0.85rem 3rem',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            fontSize: '0.95rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { id: 'all', label: 'Semua Kategori' },
          { id: 'persyaratan', label: 'Syarat & SKS' },
          { id: 'kuota', label: 'Lokasi & Kuota' },
          { id: 'berkas', label: 'Berkas Upload' },
          { id: 'verifikasi', label: 'Verifikasi LPPM' },
          { id: 'lapangan', label: 'DPL & Posko' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: selectedCategory === cat.id ? '#2563eb' : '#e2e8f0',
              background: selectedCategory === cat.id ? '#eff6ff' : '#ffffff',
              color: selectedCategory === cat.id ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  border: isOpen ? '1px solid #93c5fd' : '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 4px 12px rgba(37,99,235,0.08)' : undefined
                }}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: isOpen ? '#2563eb' : '#0f172a' }}>
                    {faq.q}
                  </h3>
                  <div style={{ flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={20} color="#2563eb" /> : <ChevronDown size={20} color="#64748b" />}
                  </div>
                </div>

                {isOpen && (
                  <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <HelpCircle size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Tidak ada pertanyaan yang sesuai</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Coba gunakan kata kunci lain atau hubungi helpdesk LPPM di bawah ini.
            </p>
          </div>
        )}
      </div>

      {/* Helpdesk Contact Support Card */}
      <div className="card" style={{
        padding: '2rem',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
          <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>Masih Ada Pertanyaan Lain?</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Tim Helpdesk Panitia KKN siap membantu kendala Anda</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={18} color="#10b981" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>WhatsApp Hotline LPPM</div>
              <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>+62 812-3456-7890</strong>
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={18} color="#2563eb" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Email Resmi Bantuan</div>
              <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>lppm@kampus.ac.id</strong>
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={18} color="#ef4444" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Kantor Sekretariat</div>
              <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Gedung Rektorat Lt. 2</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
