import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, MapPin, UploadCloud, FileText, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../services/api';

export default function PendaftaranWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // User Profile
  const [profile, setProfile] = useState(null);

  // Locations from API
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState('');

  // File Upload
  const [file, setFile] = useState(null);
  const [jenisBerkas, setJenisBerkas] = useState('ktm');

  // Load User & Locations on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, locRes] = await Promise.all([
          api.get('/auth/me').catch(() => null),
          api.get('/locations').catch(() => null),
        ]);

        if (meRes?.data?.data) {
          setProfile(meRes.data.data.profile || meRes.data.data.user);
        } else {
          const storedUser = localStorage.getItem('user');
          if (storedUser) setProfile(JSON.parse(storedUser));
        }

        if (locRes?.data?.data) {
          setLocations(locRes.data.data);
          if (locRes.data.data.length > 0) {
            setSelectedLocationId(String(locRes.data.data[0].id));
          }
        }
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    };
    fetchData();
  }, []);

  const handleNextStep = () => {
    setError('');
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!selectedLocationId) {
        setError('Silakan pilih salah satu lokasi desa KKN.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedLocationId) {
      setError('Lokasi KKN belum dipilih.');
      return;
    }

    setLoading(true);
    try {
      // 1. Submit Registration
      const regRes = await api.post('/registrations', {
        location_id: Number(selectedLocationId),
      });

      const registrationId = regRes.data?.data?.id;

      // 2. Upload file if provided
      if (file && registrationId) {
        const formData = new FormData();
        formData.append('registration_id', registrationId);
        formData.append('jenis_berkas', jenisBerkas);
        formData.append('file', file);

        await api.post('/registrations/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/mahasiswa/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Registration submit error:', err);
      const msg = err.response?.data?.message || err.message || 'Gagal mengirim pendaftaran KKN.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate('/mahasiswa/dashboard'))}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Formulir Pendaftaran KKN 2026</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Selesaikan 3 langkah mudah untuk mendaftarkan diri</p>
        </div>
      </div>

      {/* Stepper Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: step >= 1 ? '#065f46' : '#94a3b8',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: step >= 1 ? '#065f46' : '#e2e8f0',
            color: step >= 1 ? '#fff' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem'
          }}>1</div>
          <span>Data Mahasiswa</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: step >= 2 ? '#065f46' : '#94a3b8',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: step >= 2 ? '#065f46' : '#e2e8f0',
            color: step >= 2 ? '#fff' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem'
          }}>2</div>
          <span>Pilih Lokasi</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: step >= 3 ? '#065f46' : '#94a3b8',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: step >= 3 ? '#065f46' : '#e2e8f0',
            color: step >= 3 ? '#fff' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem'
          }}>3</div>
          <span>Upload & Kirim</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#b91c1c',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div style={{
          background: '#dcfce7',
          color: '#15803d',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={20} />
          <span>Pendaftaran KKN berhasil dikirim! Mengalihkan ke dashboard...</span>
        </div>
      )}

      {/* STEP 1: Academic Data */}
      {step === 1 && (
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            Konfirmasi Data Akademik Mahasiswa
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Pastikan data profil akademik Anda sesuai sebelum melanjutkan pemilihan wilayah KKN.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Nama Lengkap</span>
              <strong style={{ fontSize: '1rem' }}>{profile?.nama_lengkap || 'Mahasiswa'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>NIM</span>
              <strong style={{ fontSize: '1rem' }}>{profile?.nim || '-'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Program Studi</span>
              <strong style={{ fontSize: '1rem' }}>{profile?.program_studi || 'Teknik'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Total SKS Kumulatif</span>
              <strong style={{ fontSize: '1rem', color: '#059669' }}>{profile?.total_sks || 100} SKS (Memenuhi Syarat)</strong>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNextStep} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Lanjut Pilih Lokasi</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Location Selection */}
      {step === 2 && (
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Pilih Lokasi & Desa Penempatan KKN
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Pilih salah satu desa mitra yang masih memiliki sisa kuota tersedia.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {locations.map((loc) => {
              const isFull = loc.kuota_terisi >= loc.kuota_maksimal;
              const isSelected = String(loc.id) === selectedLocationId;

              return (
                <div
                  key={loc.id}
                  onClick={() => !isFull && setSelectedLocationId(String(loc.id))}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    border: '2px solid',
                    borderColor: isSelected ? '#065f46' : '#e2e8f0',
                    background: isSelected ? '#ecfdf5' : '#ffffff',
                    cursor: isFull ? 'not-allowed' : 'pointer',
                    opacity: isFull ? 0.6 : 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: isSelected ? '#065f46' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#64748b'
                    }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                        {loc.nama_desa_wilayah}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Kecamatan {loc.kecamatan}, {loc.kabupaten} • Periode {loc.periode_kkn}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: isFull ? '#fee2e2' : '#dcfce7',
                      color: isFull ? '#b91c1c' : '#15803d'
                    }}>
                      {isFull ? 'Kuota Penuh' : `Tersedia: ${loc.kuota_tersedia ?? (loc.kuota_maksimal - loc.kuota_terisi)} / ${loc.kuota_maksimal}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              Kembali
            </button>
            <button onClick={handleNextStep} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Lanjut Upload Berkas</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Upload & Submit */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Unggah Berkas Persyaratan & Konfirmasi
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Unggah berkas kelengkapan (KTM/KHS/Surat Keterangan) dengan format PDF atau Gambar (maksimal 5 MB).
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Jenis Dokumen yang Diunggah
            </label>
            <select
              value={jenisBerkas}
              onChange={(e) => setJenisBerkas(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                background: '#fff'
              }}
            >
              <option value="ktm">Kartu Tanda Mahasiswa (KTM)</option>
              <option value="khs">Transkrip Nilai / KHS Kumulatif</option>
              <option value="surat_sehat">Surat Keterangan Sehat</option>
              <option value="surat_izin">Surat Izin Orang Tua / Wali</option>
            </select>
          </div>

          <div style={{
            border: '2px dashed #cbd5e1',
            borderRadius: '10px',
            padding: '2rem',
            textAlign: 'center',
            background: '#f8fafc',
            marginBottom: '1.5rem'
          }}>
            <UploadCloud size={36} color="#065f46" style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              Pilih file dokumen persyaratan Anda
            </p>
            <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Mendukung PDF, JPG, JPEG, PNG (Maks. 5 MB)
            </p>
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg,image/jpg"
              onChange={(e) => setFile(e.target.files[0] || null)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={() => setStep(2)} className="btn btn-secondary" disabled={loading}>
              Kembali
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
              <span>{loading ? 'Mengirim Pendaftaran...' : 'Kirim Pendaftaran Final'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

