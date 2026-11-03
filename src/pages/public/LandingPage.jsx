import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  FileCheck, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' : '/mahasiswa/dashboard';

  // Sample locations for preview on Landing Page
  const featuredLocations = [
    {
      desa: 'Desa Sukamaju',
      kecamatan: 'Kecamatan Ciawi',
      kabupaten: 'Kabupaten Bogor',
      kuotaMax: 25,
      kuotaTerisi: 18,
      kategori: 'Pemberdayaan Ekonomi UMKM',
      badgeColor: '#10b981'
    },
    {
      desa: 'Desa Margaluyu',
      kecamatan: 'Kecamatan Tanjungsari',
      kabupaten: 'Kabupaten Sumedang',
      kuotaMax: 20,
      kuotaTerisi: 19,
      kategori: 'Digitalisasi Desa & Literasi',
      badgeColor: '#06b6d4'
    },
    {
      desa: 'Desa Sindangasih',
      kecamatan: 'Kecamatan Karangpawitan',
      kabupaten: 'Kabupaten Garut',
      kuotaMax: 30,
      kuotaTerisi: 12,
      kategori: 'Kesehatan & Sanitasi Lingkungan',
      badgeColor: '#f59e0b'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{
        padding: '5rem 0 4.5rem',
        background: 'radial-gradient(circle at top, #eff6ff 0%, #f8fafc 80%)',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge badge-primary" style={{ marginBottom: '1.25rem', padding: '0.45rem 1.15rem', fontSize: '0.825rem' }}>
            <Sparkles size={15} /> Pendaftaran KKN Semester Genap 2026/2027 Telah Dibuka
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            color: '#0f172a',
            maxWidth: '880px',
            margin: '0 auto 1.5rem'
          }}>
            Bangun Pengalaman Nyata Mengabdi dan Berkarya Bersama <span style={{ color: '#2563eb' }}>KKN-Connect</span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#64748b',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Platform digital terintegrasi untuk pendaftaran online, pemilihan lokasi desa pengabdian secara real-time, validasi berkas otomatis, dan pengumuman penempatan KKN.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <Link to={dashboardPath} className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                <LayoutDashboard size={18} />
                <span>Buka Dashboard ({user?.role === 'admin' ? 'Admin' : 'Mahasiswa'})</span>
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                  <span>Daftar KKN Sekarang</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/panduan" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                  <span>Lihat Panduan & Syarat</span>
                </Link>
              </>
            )}
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
            maxWidth: '1000px',
            marginInline: 'auto'
          }}>
            <div className="card" style={{ padding: '1.75rem 1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#2563eb' }}>3.200+</div>
              <div style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.25rem' }}>Mahasiswa Terdaftar</div>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Dari 8 Fakultas Universitas</p>
            </div>
            <div className="card" style={{ padding: '1.75rem 1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#06b6d4' }}>48</div>
              <div style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.25rem' }}>Desa Mitra Binaan</div>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Tersebar di 5 Kabupaten</p>
            </div>
            <div className="card" style={{ padding: '1.75rem 1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#10b981' }}>100%</div>
              <div style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.25rem' }}>Verifikasi Digital</div>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Tanpa antrean fisik LPPM</p>
            </div>
            <div className="card" style={{ padding: '1.75rem 1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f59e0b' }}>120</div>
              <div style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.25rem' }}>Dosen Pembimbing</div>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Pendampingan lapangan intensif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary">Tahapan Mudah</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '0.75rem', color: '#0f172a' }}>
              Alur 4 Langkah Pendaftaran KKN
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem', maxWidth: '600px', marginInline: 'auto' }}>
              Seluruh proses pendaftaran dilakukan secara mandiri melalui antarmuka web yang terpandu.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontWeight: 800,
                fontSize: '1.75rem',
                color: '#e2e8f0'
              }}>01</div>
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Isi Biodata Akademik</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Lengkapi data diri, NIM, program studi, total SKS yang telah lulus, serta kontak darurat keluarga.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontWeight: 800,
                fontSize: '1.75rem',
                color: '#e2e8f0'
              }}>02</div>
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pilih Lokasi & Desa</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Pilih desa pengabdian yang diminati. Sistem otomatis menampilkan sisa kuota dan mengunci jika kuota penuh.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontWeight: 800,
                fontSize: '1.75rem',
                color: '#e2e8f0'
              }}>03</div>
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Unggah Berkas Valid</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Unggah dokumen persyaratan (KTM, Transkrip SKS, Surat Bebas Sakit, Izin Ortu) dalam format PDF/JPG.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontWeight: 800,
                fontSize: '1.75rem',
                color: '#e2e8f0'
              }}>04</div>
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verifikasi & Rilis DPL</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Panitia LPPM memeriksa berkas Anda. Pantau status lolos dan rilis kelompok langsung dari Dashboard Mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations Preview Section */}
      <section style={{ padding: '4.5rem 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-primary">Katalog Wilayah KKN</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
                Katalog Desa Pengabdian Terpilih
              </h2>
              <p style={{ color: '#64748b', marginTop: '0.25rem' }}>
                Lihat gambaran kuota desa mitra KKN yang siap menyambut mahasiswa.
              </p>
            </div>
            <Link to="/panduan" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 700, fontSize: '0.9rem' }}>
              <span>Lihat Kriteria Pemilihan</span>
              <ChevronRight size={18} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredLocations.map((loc, idx) => {
              const sisa = loc.kuotaMax - loc.kuotaTerisi;
              const persentase = Math.round((loc.kuotaTerisi / loc.kuotaMax) * 100);

              return (
                <div key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        color: '#334155',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {loc.kategori}
                      </span>
                      <span className={`badge ${sisa <= 3 ? 'badge-warning' : 'badge-success'}`}>
                        Sisa {sisa} Kursi
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                      {loc.desa}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      <MapPin size={16} color="#ef4444" />
                      <span>{loc.kecamatan}, {loc.kabupaten}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.35rem' }}>
                      <span>Kapasitas Terisi</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{loc.kuotaTerisi} / {loc.kuotaMax} ({persentase}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${persentase}%`,
                        height: '100%',
                        background: persentase > 80 ? '#f59e0b' : '#2563eb',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action card banner */}
      <section style={{ padding: '3.5rem 0 5rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
            borderRadius: '24px',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3)'
          }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Siap Mengabdi untuk Masyarakat dan Negeri?
            </h2>
            <p style={{ maxWidth: '620px', margin: '0 auto 2.25rem', opacity: 0.9, fontSize: '1.05rem', lineHeight: 1.6 }}>
              Daftarkan diri Anda sebelum kuota lokasi impian Anda terpenuhi. Pastikan seluruh berkas telah dipersiapkan dengan baik.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontWeight: 700, fontSize: '1rem', color: '#1e40af' }}>
                Mulai Pendaftaran Akun
              </Link>
              <Link to="/jadwal" className="btn btn-outline" style={{ padding: '0.85rem 1.75rem', fontWeight: 600, color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
                <Clock size={16} />
                <span>Lihat Jadwal Lengkap</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
