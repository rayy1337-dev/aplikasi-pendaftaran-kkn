import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  FileCheck, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{
        padding: '5rem 0 4rem',
        background: 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge badge-primary" style={{ marginBottom: '1.25rem', padding: '0.4rem 1rem' }}>
            <Sparkles size={14} /> Pendaftaran Periode Semester Genap 2026/2027 Telah Dibuka
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            color: '#0f172a',
            maxWidth: '850px',
            margin: '0 auto 1.5rem'
          }}>
            Bangun Pengalaman Nyata Mengabdi dan Berkarya Bersama <span style={{ color: '#2563eb' }}>KKN-Connect</span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            maxWidth: '650px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Sistem informasi terintegrasi untuk registrasi online, pemilihan lokasi desa pengabdian, unggah berkas validasi, dan pengumuman penempatan KKN.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              <span>Daftar KKN Sekarang</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/panduan" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              <span>Lihat Panduan & Syarat</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
            maxWidth: '960px',
            marginInline: 'auto'
          }}>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>3.200+</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Mahasiswa Terdaftar</p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4' }}>48</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Desa Mitra Binaan</p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>100%</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Verifikasi Digital</p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>12</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Dosen Pembimbing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary">Tahapan Mudah</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '0.75rem' }}>Alur 4 Langkah Pendaftaran KKN</h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Lakukan proses registrasi secara cepat langsung dari perangkat Anda.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <FileCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Isi Biodata Diri</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Lengkapi data akademik seperti NIM, Program Studi, jumlah SKS lulus, dan kontak darurat.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Pilih Lokasi KKN</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Pilih lokasi desa pengabdian sesuai kuota ketersediaan dan minat kelompok program kerja.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Unggah Berkas</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Upload dokumen persyaratan seperti KRS/KHS, Surat Sehat, dan Formulir persetujuan orang tua.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#d1fae5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>4. Verifikasi & Pengumuman</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Pantau verifikasi oleh admin dan peroleh rilis resmi penetapan kelompok serta DPL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.25)'
          }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Siap Mengabdi untuk Masyarakat dan Negeri?
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
              Pastikan Anda telah memenuhi syarat minimal 100 SKS sebelum melakukan finalisasi pendaftaran.
            </p>
            <Link to="/register" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontWeight: 700 }}>
              Mulai Pendaftaran Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
