import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export default function JadwalPage() {
  const timeline = [
    {
      date: '1 - 15 November 2026',
      title: 'Pendaftaran Akun & Pengisian Berkas',
      status: 'Sedang Berlangsung',
      desc: 'Mahasiswa mengisi biodata, memilih lokasi desa KKN, dan mengunggah berkas persyaratan.',
      active: true,
    },
    {
      date: '16 - 22 November 2026',
      title: 'Proses Verifikasi Berkas oleh Panitia LPPM',
      status: 'Mendatang',
      desc: 'Tim admin memeriksa keabsahan transkrip, surat sehat, dan kuota masing-masing lokasi.',
      active: false,
    },
    {
      date: '25 November 2026',
      title: 'Pengumuman Penempatan & Kelompok KKN',
      status: 'Mendatang',
      desc: 'Rilis resmi pembagian kelompok desa dan penetapan Dosen Pembimbing Lapangan (DPL).',
      active: false,
    },
    {
      date: '5 - 7 Desember 2026',
      title: 'Pembekalan & Pelepasan Peserta',
      status: 'Mendatang',
      desc: 'Kuliah umum pembekalan KKN dan seremonial pelepasan mahasiswa ke lokasi tugas.',
      active: false,
    },
  ];

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary">Timeline Pelaksanaan</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Jadwal & Agenda KKN 2026/2027</h1>
        <p style={{ color: '#64748b' }}>Catat tanggal penting agar tidak terlambat dalam setiap tahapan seleksi.</p>
      </div>

      <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {timeline.map((item, idx) => (
          <div key={idx} className="card" style={{
            padding: '1.75rem',
            borderLeft: item.active ? '5px solid #2563eb' : '1px solid #e2e8f0',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 600, fontSize: '0.875rem' }}>
                <Calendar size={16} /> {item.date}
              </span>
              <span className={`badge ${item.active ? 'badge-primary' : 'badge-warning'}`}>
                {item.status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0' }}>{item.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
