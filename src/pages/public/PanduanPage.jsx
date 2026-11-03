import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  FileText,
  Download,
  Users,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PanduanPage() {
  const [activeTab, setActiveTab] = useState('syarat');

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '1000px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary">Pedoman Resmi LPPM</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#0f172a' }}>
          Panduan & Syarat Pendaftaran KKN
        </h1>
        <p style={{ color: '#64748b', maxWidth: '640px', margin: '0 auto' }}>
          Pelajari seluruh kriteria akademik, berkas yang wajib diunggah, dan tata cara pemilihan desa KKN sebelum melakukan submit data.
        </p>
      </div>

      {/* Segmented Navigation Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'syarat', label: '1. Kriteria Akademik' },
          { id: 'dokumen', label: '2. Berkas Persyaratan' },
          { id: 'lokasi', label: '3. Aturan Lokasi & Kuota' },
          { id: 'unduhan', label: '4. Format & Template Dokumen' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              border: '1px solid',
              borderColor: activeTab === tab.id ? '#2563eb' : '#e2e8f0',
              background: activeTab === tab.id ? '#2563eb' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : '#64748b',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0 4px 10px rgba(37,99,235,0.2)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Kriteria Akademik */}
      {activeTab === 'syarat' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '12px', color: '#2563eb' }}>
                <BookOpen size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Syarat Kelayakan Akademik</h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Kriteria wajib bagi mahasiswa untuk mengikuti KKN Semester ini</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>Minimal Telah Lulus 100 SKS</strong>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Mahasiswa minimal berada di Semester 6 atau telah menyelesaikan beban studi minimal 100 SKS kumulatif.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>IPK Minimal 2.50</strong>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Memiliki Indeks Prestasi Kumulatif terakhir minimal 2.50 yang dibuktikan melalui transkrip nilai sah.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>Status Mahasiswa Aktif</strong>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Telah melakukan KRS mata kuliah KKN pada semester berjalan dan tidak sedang dalam status cuti kuliah.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>Bebas Bentrok Mata Kuliah</strong>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Tidak mengambil mata kuliah praktikum tatap muka atau seminar wajib yang berbenturan dengan waktu pelaksanaan KKN.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Berkas Persyaratan */}
      {activeTab === 'dokumen' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '12px', background: '#e0f2fe', borderRadius: '12px', color: '#0284c7' }}>
                <FileText size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Daftar Dokumen Wajib</h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Dokumen yang harus diunggah pada tahap 3 pendaftaran</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  title: '1. Scan Kartu Tanda Mahasiswa (KTM)',
                  format: 'PDF, JPG, PNG (Maksimal 2 MB)',
                  desc: 'Scan jelas bagian depan KTM fisik atau tangkapan layar KTM Digital resmi dari SIAM / portal akademik.',
                },
                {
                  title: '2. Transkrip Nilai Akademik Terakhir',
                  format: 'Format PDF (Maksimal 3 MB)',
                  desc: 'Transkrip nilai yang memuat total SKS lulus dan IPK, telah bertandatangan Kaprodi atau memiliki QR Code/Barcode validasi.',
                },
                {
                  title: '3. Surat Keterangan Sehat Fisik & Jiwa',
                  format: 'Format PDF / JPG (Maksimal 2 MB)',
                  desc: 'Diterbitkan oleh Dokter Puskesmas, Rumah Sakit, atau Klinik Pratama Kampus dalam rentang maksimal 30 hari terakhir.',
                },
                {
                  title: '4. Surat Pernyataan Izin Orang Tua / Wali',
                  format: 'Format PDF bertanda tangan & materai (Maksimal 2 MB)',
                  desc: 'Surat izin bermaterai Rp 10.000 yang menyatakan persetujuan pihak keluarga untuk penempatan tinggal di lokasi desa KKN.',
                },
              ].map((doc, idx) => (
                <div key={idx} style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{doc.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>{doc.desc}</p>
                  </div>
                  <span style={{
                    padding: '0.3rem 0.65rem',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#475569'
                  }}>
                    {doc.format}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Aturan Lokasi & Kuota */}
      {activeTab === 'lokasi' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '12px', color: '#d97706' }}>
                <Users size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Mekanisme Pemilihan Lokasi & Kuota</h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Aturan penempatan untuk menjaga keseimbangan disiplin ilmu</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#475569', fontSize: '0.925rem', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>Sistem First-Come First-Served:</strong> Lokasi desa yang telah mencapai batas kuota maksimal akan otomatis terkunci. Mahasiswa harus memilih desa alternatif yang masih memiliki kursi kosong.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>Prinsip Multidisiplin:</strong> Setiap kelompok KKN per desa dirancang beranggotakan gabungan dari berbagai fakultas (Teknik, Ekonomi, Komputer, Pertanian, Kesehatan) guna memaksimalkan dampak program kerja.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>Komposisi Gender Seimbang:</strong> Setiap kelompok desa wajib terdiri dari perpaduan mahasiswa laki-laki dan perempuan demi kelancaran akomodasi dan koordinasi posko di desa mitra.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <strong>Hak Prerogatif LPPM:</strong> Panitia berhak melakukan redistribusi lokasi secara adil jika terdapat ketidakseimbangan kuota ekstrem pada suatu desa binaan.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Unduhan Format Surat */}
      {activeTab === 'unduhan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '12px', background: '#d1fae5', borderRadius: '12px', color: '#059669' }}>
                <Download size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Template & Formulir Resmi</h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Unduh template berkas untuk kelengkapan administrasi Anda</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>Template Surat Izin Orang Tua / Wali</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Format standar persetujuan penempatan KKN di desa mitra bermaterai 10.000.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Mengunduh Template_Surat_Izin_Orang_Tua_KKN.docx')}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  <Download size={16} />
                  <span>Unduh DOCX (18 KB)</span>
                </button>
              </div>

              <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>Buku Pedoman Teknis KKN 2026</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Buku panduan lengkap pelaksanaan program kerja, logbook harian, dan tata tertib posko.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Mengunduh Buku_Pedoman_Teknis_KKN_2026.pdf')}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  <Download size={16} />
                  <span>Unduh PDF (1.2 MB)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Card */}
      <div style={{
        marginTop: '3.5rem',
        padding: '2rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Sudah Memenuhi Semua Kriteria?</h3>
          <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Jangan tunda pendaftaran Anda. Kuota tiap desa terbatas!
          </p>
        </div>
        <Link to="/register" className="btn btn-secondary" style={{ color: '#1e40af', fontWeight: 700 }}>
          <span>Daftar Akun Mahasiswa</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
