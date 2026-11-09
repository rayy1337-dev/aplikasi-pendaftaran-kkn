import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, AlertCircle, Save, Home, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { lokasiService } from '../../services/lokasiService';
import { pendaftaranService } from '../../services/pendaftaranService';

import StepBiodata from '../../components/pendaftaran/StepBiodata';
import StepLokasi from '../../components/pendaftaran/StepLokasi';
import StepBerkas from '../../components/pendaftaran/StepBerkas';
import StepKonfirmasi from '../../components/pendaftaran/StepKonfirmasi';
import BuktiPendaftaranModal from '../../components/pendaftaran/BuktiPendaftaranModal';

export default function PendaftaranWizardPage() {
  const { user, backendNotice } = useAuth();
  const navigate = useNavigate();

  // Wizard Step (1, 2, 3, 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Locations state
  const [locations, setLocations] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // Form Data State
  const [biodata, setBiodata] = useState({
    nim: user?.nim || '',
    name: user?.name || '',
    email: user?.email || '',
    noHp: user?.no_hp || '',
    jenisKelamin: 'Laki-laki',
    fakultas: user?.fakultas || '',
    prodi: user?.prodi || '',
    sks: user?.sks || 110,
    ipk: user?.ipk || 3.75,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isAgreed, setIsAgreed] = useState(false);

  // Error & Submit State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [showBuktiModal, setShowBuktiModal] = useState(false);

  // Load locations on mount
  useEffect(() => {
    async function fetchLocations() {
      setIsLoadingLocations(true);
      const res = await lokasiService.getAll();
      if (res.data) {
        setLocations(res.data);
      }
      setIsLoadingLocations(false);
    }
    fetchLocations();
  }, []);

  // Update biodata fields
  const handleBiodataChange = (e) => {
    const { name, value } = e.target;
    setBiodata((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Location select
  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    if (errors.location) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.location;
        return next;
      });
    }
  };

  // File uploads
  const handleFileChange = (key, fileObj) => {
    setUploadedFiles((prev) => ({ ...prev, [key]: fileObj }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleRemoveFile = (key) => {
    setUploadedFiles((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Step Validation logic
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!biodata.nim?.trim()) newErrors.nim = 'NIM wajib diisi.';
      if (!biodata.name?.trim()) newErrors.name = 'Nama lengkap wajib diisi.';
      if (!biodata.email?.trim()) newErrors.email = 'Email mahasiswa wajib diisi.';
      if (!biodata.noHp?.trim()) newErrors.noHp = 'Nomor WhatsApp wajib diisi.';
      if (!biodata.fakultas) newErrors.fakultas = 'Silakan pilih fakultas.';
      if (!biodata.prodi?.trim()) newErrors.prodi = 'Program studi wajib diisi.';
      
      const numSks = Number(biodata.sks);
      if (!biodata.sks || isNaN(numSks)) {
        newErrors.sks = 'Jumlah SKS wajib diisi angka.';
      } else if (numSks < 100) {
        newErrors.sks = 'SKS minimal untuk mendaftar KKN adalah 100 SKS.';
      }

      const numIpk = Number(biodata.ipk);
      if (!biodata.ipk || isNaN(numIpk) || numIpk < 0 || numIpk > 4) {
        newErrors.ipk = 'IPK harus diisi antara 0.00 hingga 4.00.';
      }
    } else if (step === 2) {
      if (!selectedLocation) {
        newErrors.location = 'Harap pilih salah satu desa pengabdian KKN terlebih dahulu.';
      }
    } else if (step === 3) {
      if (!uploadedFiles.ktm) newErrors.ktm = 'Kartu Tanda Mahasiswa (KTM) wajib diunggah.';
      if (!uploadedFiles.transkrip) newErrors.transkrip = 'Transkrip Nilai Sementara wajib diunggah.';
      if (!uploadedFiles.suratSehat) newErrors.suratSehat = 'Surat Keterangan Sehat wajib diunggah.';
      if (!uploadedFiles.suratIzin) newErrors.suratIzin = 'Surat Izin Orang Tua / Wali wajib diunggah.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!isAgreed) {
      setSubmitError('Anda harus mencentang pernyataan kebenaran data & integritas sebelum mengirim formulir.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        biodata,
        lokasi: selectedLocation,
        berkas: uploadedFiles,
      };

      const res = await pendaftaranService.submit(payload);
      if (res.success && res.data) {
        setSubmittedData(res.data);
        setShowBuktiModal(true);
      } else {
        setSubmitError(res.message || 'Gagal mengirim pendaftaran.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Terjadi kesalahan sistem saat mengirim berkas.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Biodata Diri', sub: 'Data Akademik' },
    { num: 2, title: 'Pilih Lokasi', sub: 'Desa Pengabdian' },
    { num: 3, title: 'Unggah Berkas', sub: 'Dokumen Syarat' },
    { num: 4, title: 'Konfirmasi', sub: 'Final Submit' },
  ];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: '1000px' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link to="/mahasiswa/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.25rem' }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Formulir Pendaftaran KKN Semester Genap 2026/2027
          </h1>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#475569', background: '#f1f5f9', padding: '0.4rem 0.85rem', borderRadius: '8px' }}>
          Mahasiswa: <strong>{biodata.name || user?.name}</strong> ({biodata.nim || user?.nim})
        </div>
      </div>

      {backendNotice && (
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          fontSize: '0.85rem',
          color: '#1d4ed8',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={16} />
          <span>{backendNotice}</span>
        </div>
      )}

      {/* Stepper Navigation */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
          position: 'relative'
        }}>
          {stepsMeta.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: s.num < currentStep ? 'pointer' : 'default',
                  opacity: s.num > currentStep ? 0.6 : 1,
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isCompleted ? '#10b981' : isCurrent ? '#2563eb' : '#e2e8f0',
                  color: isCompleted || isCurrent ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(37, 99, 235, 0.2)' : 'none',
                }}>
                  {isCompleted ? <Check size={18} /> : s.num}
                </div>

                <div style={{ display: 'none', mdDisplay: 'block' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isCurrent ? '#2563eb' : '#0f172a' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar Under Stepper */}
        <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '9999px', marginTop: '1.25rem', overflow: 'hidden' }}>
          <div style={{
            width: `${(currentStep / 4) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Step Content Container */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {currentStep === 1 && (
          <StepBiodata
            formData={biodata}
            onChange={handleBiodataChange}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <StepLokasi
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            error={errors.location}
          />
        )}

        {currentStep === 3 && (
          <StepBerkas
            files={uploadedFiles}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <StepKonfirmasi
            formData={biodata}
            location={selectedLocation}
            files={uploadedFiles}
            onAgreementChange={setIsAgreed}
            isAgreed={isAgreed}
            isSubmitting={isSubmitting}
            error={submitError}
          />
        )}

        {/* Wizard Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <Link to="/mahasiswa/dashboard" className="btn btn-secondary">
              <Home size={16} />
              <span>Batal & Keluar</span>
            </Link>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              <span>Selanjutnya</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !isAgreed}
              className="btn btn-primary"
              style={{
                background: !isAgreed ? '#94a3b8' : 'linear-gradient(135deg, #10b981, #059669)',
                borderColor: 'transparent',
                boxShadow: isAgreed ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none',
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px' }} />
                  <span>Mengirimkan Berkas...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>Kirim Formulir Pendaftaran</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Success Proof Receipt Modal */}
      {showBuktiModal && submittedData && (
        <BuktiPendaftaranModal
          registration={submittedData}
          onClose={() => setShowBuktiModal(false)}
        />
      )}
    </div>
  );
}

