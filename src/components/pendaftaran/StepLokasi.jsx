import React, { useState } from 'react';
import { MapPin, Users, Search, AlertTriangle, Check, Info, Sparkles } from 'lucide-react';

export default function StepLokasi({ locations, selectedLocation, onSelectLocation, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Ekonomi Kreatif',
    'Pendidikan & Teknologi',
    'Kesehatan & Lingkungan',
    'Pertanian & Pariwisata',
    'Lingkungan Hidup',
    'Sosial & Budaya',
  ];

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.desa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.kabupaten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.tema.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Semua' || loc.kategori === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
          Langkah 2: Pilih Lokasi Pengabdian Desa Binaan KKN
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Pilih salah satu desa mitra binaan LPPM sesuai minat tema pengabdian Anda. Perhatikan sisa kuota yang tersedia secara real-time.
        </p>
      </div>

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#b91c1c',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari desa, kecamatan, kabupaten, atau tema pengabdian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.5rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#ffffff',
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: selectedCategory === cat ? '#eff6ff' : '#ffffff',
                color: selectedCategory === cat ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Locations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredLocations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          const sisaKuota = Math.max(0, loc.kuotaMax - loc.kuotaTerisi);
          const isFull = sisaKuota === 0;
          const percentage = Math.min(100, Math.round((loc.kuotaTerisi / loc.kuotaMax) * 100));

          return (
            <div
              key={loc.id}
              onClick={() => {
                if (!isFull) {
                  onSelectLocation(loc);
                }
              }}
              style={{
                border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.35rem',
                background: isSelected ? '#f8faff' : '#ffffff',
                boxShadow: isSelected ? '0 8px 24px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.05)',
                cursor: isFull ? 'not-allowed' : 'pointer',
                opacity: isFull ? 0.65 : 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                {/* Header: Village & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '8px' }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: loc.color || '#2563eb',
                      background: `${loc.color || '#2563eb'}15`,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      marginBottom: '4px'
                    }}>
                      {loc.kategori}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{loc.desa}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <MapPin size={14} color="#64748b" />
                      {loc.kecamatan}, {loc.kabupaten}
                    </p>
                  </div>

                  {/* Badge */}
                  <span className={`badge ${
                    isFull ? 'badge-warning' : sisaKuota <= 3 ? 'badge-warning' : 'badge-success'
                  }`} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                    {isFull ? 'Kuota Penuh' : sisaKuota <= 3 ? `Sisa ${sisaKuota} Slot` : 'Tersedia'}
                  </span>
                </div>

                {/* Theme & Description */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                    {loc.tema}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.45 }}>
                    {loc.deskripsi}
                  </p>
                </div>

                {/* DPL & Fasilitas */}
                <div style={{
                  padding: '0.75rem',
                  background: isSelected ? '#ffffff' : '#f8fafc',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                  border: '1px solid #f1f5f9'
                }}>
                  <div style={{ color: '#475569', marginBottom: '4px' }}>
                    <strong>DPL:</strong> {loc.dpl || 'Dosen Pembimbing Lapangan LPPM'}
                  </div>
                  <div style={{ color: '#64748b', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {loc.fasilitas?.map((fas, i) => (
                      <span key={i} style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontSize: '0.725rem' }}>
                        {fas}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Quota Visualizer & Select Button */}
              <div>
                <div style={{ marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} /> Terisi: {loc.kuotaTerisi} / {loc.kuotaMax}
                    </span>
                    <span style={{ color: isFull ? '#dc2626' : sisaKuota <= 3 ? '#d97706' : '#059669' }}>
                      {isFull ? 'Penuh' : `Sisa ${sisaKuota} Mahasiswa`}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${percentage}%`,
                      height: '100%',
                      background: isFull ? '#ef4444' : sisaKuota <= 3 ? '#f59e0b' : '#10b981',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>

                {/* Selection Button */}
                <button
                  type="button"
                  disabled={isFull}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isFull) {
                      onSelectLocation(loc);
                    }
                  }}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.55rem' }}
                >
                  {isSelected ? (
                    <>
                      <Check size={16} /> Lokasi Dipilih
                    </>
                  ) : isFull ? (
                    'Kuota Desa Ini Penuh'
                  ) : (
                    'Pilih Desa Ini'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLocations.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p>Tidak ada desa pengabdian yang cocok dengan kata kunci pencarian.</p>
        </div>
      )}
    </div>
  );
}

