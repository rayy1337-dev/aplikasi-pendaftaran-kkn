import React from 'react';
import { User, Mail, Phone, BookOpen, Award, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';

export const FAKULTAS_LIST = [
  'Fakultas Ilmu Komputer',
  'Fakultas Sains dan Teknologi',
  'Fakultas Teknik',
  'Fakultas Ekonomi dan Bisnis',
  'Fakultas Ilmu Sosial dan Ilmu Politik',
  'Fakultas Ilmu Kesehatan',
  'Fakultas Pertanian',
  'Fakultas Keguruan dan Ilmu Pendidikan',
  'Fakultas Hukum',
];

export default function StepBiodata({ formData, onChange, errors }) {
  const sksVal = Number(formData.sks) || 0;
  const isSksEligible = sksVal >= 100;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          Langkah 1: Biodata Akademik Mahasiswa
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Pastikan data diri dan riwayat akademik Anda valid sesuai data resmi di Pangkalan Data Pendidikan Tinggi (PDDikti) & SIAKAD kampus.
        </p>
      </div>

      {/* SKS Eligibility Banner */}
      <div style={{
        padding: '0.85rem 1.25rem',
        borderRadius: '10px',
        background: isSksEligible ? '#ecfdf5' : '#fffbeb',
        border: `1px solid ${isSksEligible ? '#a7f3d0' : '#fde68a'}`,
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {isSksEligible ? (
          <CheckCircle2 size={20} color="#059669" />
        ) : (
          <AlertCircle size={20} color="#d97706" />
        )}
        <div style={{ fontSize: '0.875rem', color: isSksEligible ? '#065f46' : '#92400e' }}>
          <strong>Persyaratan Beban Studi:</strong> Minimal telah menempuh dan lulus <strong>100 SKS</strong> untuk mengikuti program KKN Semester ini.
          {sksVal > 0 && !isSksEligible && (
            <span style={{ display: 'block', marginTop: '2px', color: '#b45309' }}>
              SKS Anda ({sksVal}) belum mencapai ambang batas minimal 100 SKS.
            </span>
          )}
        </div>
      </div>

      {/* Form Fields Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* NIM */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Nomor Induk Mahasiswa (NIM) <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              name="nim"
              value={formData.nim || ''}
              onChange={onChange}
              placeholder="Contoh: 220101001"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: `1px solid ${errors.nim ? '#ef4444' : '#cbd5e1'}`,
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
          {errors.nim && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.nim}</p>}
        </div>

        {/* Nama Lengkap */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Nama Lengkap (Sesuai KTM) <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={onChange}
            placeholder="Masukkan nama lengkap Anda"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.name ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {errors.name && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.name}</p>}
        </div>

        {/* Email Kampus */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Email Mahasiswa / Akun Kampus <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={onChange}
            placeholder="nama@student.kampus.ac.id"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.email ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {errors.email && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.email}</p>}
        </div>

        {/* Nomor HP/WhatsApp */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Nomor WhatsApp Aktif <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="tel"
            name="noHp"
            value={formData.noHp || ''}
            onChange={onChange}
            placeholder="081234567890"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.noHp ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {errors.noHp && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.noHp}</p>}
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Jenis Kelamin <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin || 'Laki-laki'}
            onChange={onChange}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#fff',
            }}
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* Fakultas */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Fakultas <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            name="fakultas"
            value={formData.fakultas || ''}
            onChange={onChange}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.fakultas ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
              background: '#fff',
            }}
          >
            <option value="">-- Pilih Fakultas --</option>
            {FAKULTAS_LIST.map((fak) => (
              <option key={fak} value={fak}>{fak}</option>
            ))}
          </select>
          {errors.fakultas && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.fakultas}</p>}
        </div>

        {/* Program Studi */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Program Studi <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            name="prodi"
            value={formData.prodi || ''}
            onChange={onChange}
            placeholder="Contoh: Teknik Informatika"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.prodi ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {errors.prodi && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.prodi}</p>}
        </div>

        {/* SKS Lulus */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Total SKS Lulus (Min. 100 SKS) <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="number"
            name="sks"
            value={formData.sks || ''}
            onChange={onChange}
            placeholder="110"
            min="0"
            max="160"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.sks ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {errors.sks && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.sks}</p>}
        </div>

        {/* IPK */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Indeks Prestasi Kumulatif (IPK) <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="number"
            step="0.01"
            name="ipk"
            value={formData.ipk || ''}
            onChange={onChange}
            placeholder="3.75"
            min="0.00"
            max="4.00"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${errors.ipk ? '#ef4444' : '#cbd5e1'}`,
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {errors.ipk && <p style={{ color: '#ef4444', fontSize: '0.775rem', marginTop: '4px' }}>{errors.ipk}</p>}
        </div>
      </div>
    </div>
  );
}

