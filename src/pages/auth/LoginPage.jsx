import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  LogIn, 
  Mail, 
  Lock, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  ShieldCheck, 
  UserCheck, 
  Info
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { DEMO_ACCOUNTS } from '../../services/authService';

export default function LoginPage() {
  const [role, setRole] = useState('mahasiswa');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const defaultDest = user.role === 'admin' ? '/admin/dashboard' : '/mahasiswa/dashboard';
      const destination = location.state?.from?.pathname || defaultDest;
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage(role === 'mahasiswa' ? 'Harap masukkan NIM atau Email Mahasiswa' : 'Harap masukkan Email Admin');
      return;
    }

    if (!password) {
      setErrorMessage('Harap masukkan kata sandi Anda');
      return;
    }

    setSubmitting(true);
    try {
      const result = await login({ identifier, password, role });
      
      const defaultDest = result.user.role === 'admin' ? '/admin/dashboard' : '/mahasiswa/dashboard';
      const destination = location.state?.from?.pathname || defaultDest;
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login gagal. Periksa kembali email/NIM dan kata sandi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickFill = (targetRole) => {
    setRole(targetRole);
    setErrorMessage('');
    if (targetRole === 'admin') {
      setIdentifier(DEMO_ACCOUNTS.admin.email);
      setPassword('admin123');
    } else {
      setIdentifier(DEMO_ACCOUNTS.mahasiswa.nim);
      setPassword('password123');
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
      <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem 2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <div className="brand-icon-box" style={{ margin: '0 auto 1rem', width: '52px', height: '52px' }}>
              <GraduationCap size={30} />
            </div>
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Masuk Portal KKN</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Sistem Informasi Registrasi & Penempatan KKN
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            onClick={() => {
              setRole('mahasiswa');
              setErrorMessage('');
            }}
            style={{
              padding: '0.6rem 0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: role === 'mahasiswa' ? '#ffffff' : 'transparent',
              color: role === 'mahasiswa' ? '#2563eb' : '#64748b',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: role === 'mahasiswa' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={16} />
            <span>Mahasiswa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setErrorMessage('');
            }}
            style={{
              padding: '0.6rem 0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: role === 'admin' ? '#ffffff' : 'transparent',
              color: role === 'admin' ? '#2563eb' : '#64748b',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: role === 'admin' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={16} />
            <span>Admin LPPM</span>
          </button>
        </div>

        {/* Error Notification */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              {role === 'mahasiswa' ? 'NIM atau Email Kampus' : 'Email Admin LPPM'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                disabled={submitting}
                placeholder={role === 'mahasiswa' ? '220101001 atau nama@student.ac.id' : 'admin.kkn@kampus.ac.id'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.75rem 0.7rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s',
                  background: submitting ? '#f8fafc' : '#ffffff'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                Kata Sandi
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Untuk reset kata sandi mahasiswa, silakan hubungi BAAK atau Unit LPPM Kampus.');
                }}
                style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}
              >
                Lupa Sandi?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={submitting}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 2.5rem 0.7rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s',
                  background: submitting ? '#f8fafc' : '#ffffff'
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ borderRadius: '4px' }}
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', opacity: submitting ? 0.8 : 1 }}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="spin-animation" />
                <span>Memproses Masuk...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Masuk Sekarang</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Demo Helper Box */}
        <div style={{
          marginTop: '1.75rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '10px',
          border: '1px dashed #cbd5e1'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
            <Info size={14} color="#2563eb" />
            <span>AKSES CEPAT DEMO PENGUJIAN</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleQuickFill('mahasiswa')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #bfdbfe',
                background: '#eff6ff',
                color: '#1d4ed8',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Isi Demo Mahasiswa
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                fontSize: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #fde68a',
                background: '#fffbeb',
                color: '#b45309',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Isi Demo Admin LPPM
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          Belum memiliki akun mahasiswa?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 700 }}>
            Daftar Akun Baru
          </Link>
        </p>
      </div>
    </div>
  );
}
