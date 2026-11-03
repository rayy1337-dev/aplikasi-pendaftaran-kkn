import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, ArrowRight, Bell, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JadwalPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const timeline = [
    {
      id: 1,
      category: 'pendaftaran',
      date: '1 - 15 November 2026',
      title: 'Pendaftaran Akun & Pengisian Berkas',
      status: 'Sedang Berlangsung',
      statusType: 'active',
      desc: 'Mahasiswa membuat akun, melengkapi biodata diri, memilih lokasi desa KKN, dan mengunggah berkas persyaratan (KTM, Transkrip SKS, Surat Sehat, Surat Izin Orang Tua).',
      deadlineInfo: 'Batas akhir submit: 15 November 2026 pukul 23:59 WIB'
    },
    {
      id: 2,
      category: 'verifikasi',
      date: '16 - 22 November 2026',
      title: 'Proses Verifikasi Berkas oleh Panitia LPPM',
      status: 'Mendatang',
      statusType: 'upcoming',
      desc: 'Tim admin LPPM melakukan pengecekan keabsahan dokumen persyaratan, validasi minimal 100 SKS, dan kuota masing-masing desa binaan.',
      deadlineInfo: 'Catatan revisi berkas akan disampaikan via notifikasi portal'
    },
    {
      id: 3,
      category: 'verifikasi',
      date: '23 - 24 November 2026',
      title: 'Masa Perbaikan / Re-Upload Berkas Revisi',
      status: 'Mendatang',
      statusType: 'upcoming',
      desc: 'Kesempatan bagi mahasiswa dengan status "Revisi Berkas" untuk mengunggah ulang dokumen yang ditolak sesuai catatan panitia.',
      deadlineInfo: 'Batas akhir perbaikan: 24 November 2026 pukul 17:00 WIB'
    },
    {
      id: 4,
      category: 'pengumuman',
      date: '26 November 2026',
      title: 'Pengumuman Penempatan & Pembagian Kelompok',
      status: 'Mendatang',
      statusType: 'upcoming',
      desc: 'Rilis resmi penetapan anggota kelompok per desa, susunan struktur kelompok, dan penugasan Dosen Pembimbing Lapangan (DPL).',
      deadlineInfo: 'Dapat diakses langsung melalui dashboard masing-masing mahasiswa'
    },
    {
      id: 5,
      category: 'pelaksanaan',
      date: '5 - 7 Desember 2026',
      title: 'Pembekalan Mahasiswa & TOT Kelompok',
      status: 'Mendatang',
      statusType: 'upcoming',
      desc: 'Kuliah umum pembekalan KKN, workshop program kerja desa tematik, serta koordinasi teknis bersama DPL.',
      deadlineInfo: 'Wajib dihadiri seluruh peserta di Aula Utama Kampus'
    },
    {
      id: 6,
      category: 'pelaksanaan',
      date: '15 Desember 2026 - 31 Januari 2027',
      title: 'Penerjunan & Pelaksanaan KKN di Lapangan',
      status: 'Mendatang',
      statusType: 'upcoming',
      desc: 'Mahasiswa tinggal di lokasi desa pengabdian dan melaksanakan program kerja pengabdian masyarakat selama 45 hari penuh.',
      deadlineInfo: 'Pemberangkatan serentak dari halaman rektorat'
    }
  ];

  const filteredTimeline = timeline.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '900px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary">Timeline Resmi</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
          Jadwal & Alur Pelaksanaan KKN 2026/2027
        </h1>
        <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
          Catat tanggal penting agar Anda tidak terlewat dalam setiap tahapan seleksi, verifikasi berkas, dan pelepasan.
        </p>
      </div>

      {/* Important Alert Notice */}
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <Bell size={22} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: '#1e3a8a', fontSize: '0.95rem' }}>Tahap Registrasi Sedang Dibuka!</strong>
          <p style={{ color: '#3b82f6', fontSize: '0.875rem', marginTop: '0.25rem', lineHeight: 1.5 }}>
            Pendaftaran dibuka hingga <strong>15 November 2026</strong>. Pastikan kuota pada desa pilihan Anda belum penuh dan transkrip nilai telah disahkan.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Semua Tahapan' },
            { id: 'pendaftaran', label: 'Pendaftaran' },
            { id: 'verifikasi', label: 'Verifikasi' },
            { id: 'pengumuman', label: 'Pengumuman' },
            { id: 'pelaksanaan', label: 'Pelaksanaan' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: activeFilter === tab.id ? '#2563eb' : '#e2e8f0',
                background: activeFilter === tab.id ? '#2563eb' : '#ffffff',
                color: activeFilter === tab.id ? '#ffffff' : '#64748b',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
        >
          <Download size={16} />
          <span>Cetak Jadwal</span>
        </button>
      </div>

      {/* Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredTimeline.map((item) => {
          const isActive = item.statusType === 'active';

          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '1.75rem',
                borderLeft: isActive ? '5px solid #2563eb' : '1px solid #e2e8f0',
                boxShadow: isActive ? '0 10px 15px -3px rgba(37, 99, 235, 0.1)' : undefined,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: isActive ? '#2563eb' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  <Calendar size={16} /> {item.date}
                </span>

                <span className={`badge ${isActive ? 'badge-primary' : 'badge-warning'}`}>
                  {isActive && <Clock size={12} />}
                  <span>{item.status}</span>
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {item.desc}
              </p>

              <div style={{
                fontSize: '0.8rem',
                color: '#64748b',
                background: '#f8fafc',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <AlertCircle size={14} color="#64748b" />
                <span>{item.deadlineInfo}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div style={{
        marginTop: '3.5rem',
        textAlign: 'center',
        padding: '2.5rem',
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sudah Siap Memulai?</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Lakukan registrasi akun dan amankan pilihan lokasi KKN Anda sebelum batas waktu pendaftaran berakhir.
        </p>
        <Link to="/register" className="btn btn-primary">
          <span>Daftar Akun Sekarang</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
