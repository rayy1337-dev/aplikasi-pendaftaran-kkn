import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Harap isi semua kolom email/NIM dan password');
      return;
    }

    // Prototype mock auth for week 1 demonstration
    const mockUser = {
      email,
      name: role === 'admin' ? 'Administrator LPPM' : 'Mahasiswa Demo',
      role,
      nim: role === 'mahasiswa' ? '220101001' : undefined,
    };

    localStorage.setItem('token', 'mock-jwt-token-123456');
    localStorage.setItem('user', JSON.stringify(mockUser));

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/mahasiswa/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-icon-box" style={{ margin: '0 auto 1rem', width: '48px', height: '48px' }}>
            <GraduationCap size={28} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Masuk ke Akun</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Gunakan NIM/Email yang telah terdaftar
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Masuk Sebagai
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setRole('mahasiswa')}
                style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: role === 'mahasiswa' ? '#2563eb' : '#e2e8f0',
                  background: role === 'mahasiswa' ? '#eff6ff' : '#ffffff',
                  color: role === 'mahasiswa' ? '#2563eb' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Mahasiswa
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: role === 'admin' ? '#2563eb' : '#e2e8f0',
                  background: role === 'admin' ? '#eff6ff' : '#ffffff',
                  color: role === 'admin' ? '#2563eb' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Admin / Panitia
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {role === 'mahasiswa' ? 'NIM atau Email Kampus' : 'Email Admin'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder={role === 'mahasiswa' ? '220101001 atau nama@kampus.ac.id' : 'admin@kampus.ac.id'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Kata Sandi
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            <LogIn size={18} />
            <span>Masuk ke Akun</span>
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          Belum memiliki akun mahasiswa?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
