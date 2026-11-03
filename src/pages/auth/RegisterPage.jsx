import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    email: '',
    fakultas: '',
    prodi: '',
    no_hp: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const fakultasOptions = [
    'Fakultas Ilmu Komputer',
    'Fakultas Teknik',
    'Fakultas Ekonomi dan Bisnis',
    'Fakultas Keguruan dan Ilmu Pendidikan',
    'Fakultas Hukum',
    'Fakultas Pertanian',
    'Fakultas Ilmu Sosial dan Ilmu Politik',
    'Fakultas Kedokteran dan Ilmu Kesehatan'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillSample = () => {
    setFormData({
      name: 'Feris Pratama',
      nim: '220101001',
      email: 'feris.pratama@student.kampus.ac.id',
      fakultas: 'Fakultas Ilmu Komputer',
      prodi: 'Teknik Informatika',
      no_hp: '081234567890',
      password: 'password123',
      confirmPassword: 'password123',
    });
    setAgreeTerms(true);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!formData.name.trim()) {
      setErrorMessage('Harap isi Nama Lengkap Anda.');
      return;
    }
    if (!formData.nim.trim() || !/^\d+$/.test(formData.nim.trim()) || formData.nim.trim().length < 8) {
      setErrorMessage('NIM harus berupa angka dan minimal 8 digit.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Harap gunakan format email yang valid.');
      return;
    }
    if (!formData.fakultas) {
      setErrorMessage('Harap pilih Fakultas Anda.');
      return;
    }
    if (!formData.prodi.trim()) {
      setErrorMessage('Harap isi Program Studi.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Anda wajib menyetujui syarat & ketentuan pendaftaran KKN.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: formData.name,
        nim: formData.nim,
        email: formData.email,
        fakultas: formData.fakultas,
        prodi: formData.prodi,
        no_hp: formData.no_hp,
        password: formData.password,
      });

      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || 'Pendaftaran akun gagal. Silakan coba kembali.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1rem',
      background: 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)'
    }}>
      <div className="card" style={{ maxWidth: '580px', width: '100%', padding: '2.5rem 2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <div className="brand-icon-box" style={{ margin: '0 auto 1rem', width: '52px', height: '52px' }}>
              <GraduationCap size={30} />
            </div>
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Pendaftaran Akun Mahasiswa</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Buat akun baru untuk mengikuti registrasi program KKN
          </p>
        </div>

        {/* Quick sample fill button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={handleFillSample}
            style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#2563eb',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={14} />
            <span>Isi Contoh Data Cepat</span>
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            border: '1px solid #fca5a5'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success notification */}
        {successMessage && (
          <div style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid #86efac'
          }}>
            <CheckCircle2 size={20} />
            <div>
              <strong>Registrasi Berhasil!</strong>
              <div style={{ fontSize: '0.8rem' }}>Mengalihkan Anda ke halaman login...</div>
            </div>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Nama Lengkap */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Nama Lengkap (Sesuai KTM) <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="name"
                disabled={submitting}
                placeholder="Contoh: Feris Pratama"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* NIM & No HP */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                NIM Mahasiswa <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                name="nim"
                disabled={submitting}
                placeholder="220101001"
                value={formData.nim}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Nomor WhatsApp Aktif <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  name="no_hp"
                  disabled={submitting}
                  placeholder="081234567890"
                  value={formData.no_hp}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Email Kampus */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Email Kampus / Email Aktif <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                name="email"
                disabled={submitting}
                placeholder="nama@student.kampus.ac.id"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Fakultas & Program Studi */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Fakultas <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                name="fakultas"
                disabled={submitting}
                value={formData.fakultas}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  background: '#ffffff'
                }}
              >
                <option value="">Pilih Fakultas</option>
                {fakultasOptions.map((fak, i) => (
                  <option key={i} value={fak}>{fak}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Program Studi <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                name="prodi"
                disabled={submitting}
                placeholder="Contoh: Teknik Informatika"
                value={formData.prodi}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Kata Sandi & Konfirmasi */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Kata Sandi <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  disabled={submitting}
                  placeholder="Min. 6 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.65rem 2.5rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Konfirmasi Kata Sandi <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  disabled={submitting}
                  placeholder="Ulangi kata sandi"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Persetujuan Terms */}
          <div style={{ marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ marginTop: '3px' }}
              />
              <span>
                Saya menyatakan data yang diisi adalah benar dan menyetujui seluruh ketentuan & syarat akademik KKN Universitas.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', opacity: submitting ? 0.8 : 1 }}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="spin-animation" />
                <span>Mendaftarkan Akun...</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Daftar Akun Mahasiswa</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          Sudah memiliki akun?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: 700 }}>
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
