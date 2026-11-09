import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Users, Check, AlertCircle, X, Search } from 'lucide-react';
import { lokasiService } from '../../services/lokasiService';

export default function LokasiManager({ locations, onReloadLocations }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: 'Jawa Barat',
    tema: '',
    deskripsi: '',
    kuotaMax: 20,
    dpl: '',
    kategori: 'Ekonomi Kreatif',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const filtered = locations.filter((loc) =>
    loc.desa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.kabupaten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.tema.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingLocation(null);
    setFormData({
      desa: '',
      kecamatan: '',
      kabupaten: '',
      provinsi: 'Jawa Barat',
      tema: '',
      deskripsi: '',
      kuotaMax: 20,
      dpl: '',
      kategori: 'Ekonomi Kreatif',
    });
    setFormError('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (loc) => {
    setEditingLocation(loc);
    setFormData({
      desa: loc.desa,
      kecamatan: loc.kecamatan,
      kabupaten: loc.kabupaten,
      provinsi: loc.provinsi || 'Jawa Barat',
      tema: loc.tema,
      deskripsi: loc.deskripsi || '',
      kuotaMax: loc.kuotaMax,
      dpl: loc.dpl || '',
      kategori: loc.kategori || 'Ekonomi Kreatif',
    });
    setFormError('');
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus lokasi desa ini dari daftar pilihan KKN?')) {
      await lokasiService.delete(id);
      onReloadLocations();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.desa || !formData.kecamatan || !formData.kabupaten || !formData.tema) {
      setFormError('Harap lengkapi semua kolom wajib.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingLocation) {
        await lokasiService.update(editingLocation.id, formData);
      } else {
        await lokasiService.create(formData);
      }
      setShowAddModal(false);
      onReloadLocations();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan lokasi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Top Header of Lokasi Tab */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            Daftar Desa Pengabdian & Kuota KKN
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Kelola data desa mitra, alokasi kapasitas kuota mahasiswa, serta penugasan DPL.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.25rem' }}
        >
          <Plus size={16} />
          <span>Tambah Lokasi Baru</span>
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
        <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Cari desa atau kabupaten..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.55rem 0.75rem 0.55rem 2.25rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Locations Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '0.75rem' }}>Nama Desa & Wilayah</th>
              <th style={{ padding: '0.75rem' }}>Tema KKN & Kategori</th>
              <th style={{ padding: '0.75rem' }}>DPL Penanggung Jawab</th>
              <th style={{ padding: '0.75rem' }}>Kapasitas Kuota</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((loc) => {
              const sisa = Math.max(0, loc.kuotaMax - loc.kuotaTerisi);
              const percentage = Math.min(100, Math.round((loc.kuotaTerisi / loc.kuotaMax) * 100));

              return (
                <tr key={loc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{loc.desa}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {loc.kecamatan}, {loc.kabupaten}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 600, color: '#334155' }}>{loc.tema}</div>
                    <span style={{ fontSize: '0.7rem', color: '#2563eb', background: '#eff6ff', padding: '1px 6px', borderRadius: '4px' }}>
                      {loc.kategori}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#475569' }}>
                    {loc.dpl || 'Belum Ditetapkan'}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', minWidth: '150px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '3px' }}>
                      <span style={{ fontWeight: 600 }}>{loc.kuotaTerisi} / {loc.kuotaMax} Terisi</span>
                      <span style={{ color: sisa === 0 ? '#ef4444' : '#059669' }}>Sisa: {sisa}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: sisa === 0 ? '#ef4444' : sisa <= 3 ? '#f59e0b' : '#10b981'
                      }} />
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className={`badge ${
                      sisa === 0 ? 'badge-warning' : sisa <= 3 ? 'badge-warning' : 'badge-success'
                    }`}>
                      {sisa === 0 ? 'Penuh' : sisa <= 3 ? 'Hampir Penuh' : 'Tersedia'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleOpenEdit(loc)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        title="Edit Lokasi"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(loc.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#dc2626' }}
                        title="Hapus Lokasi"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Add / Edit Lokasi */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          zIndex: 9999,
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              {editingLocation ? 'Edit Data Lokasi KKN' : 'Tambah Lokasi Desa Binaan Baru'}
            </h3>

            {formError && (
              <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Nama Desa <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.desa}
                  onChange={(e) => setFormData({ ...formData, desa: e.target.value })}
                  placeholder="Contoh: Desa Sukamaju"
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Kecamatan <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.kecamatan}
                  onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                  placeholder="Kecamatan Ciawi"
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Kabupaten <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.kabupaten}
                  onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                  placeholder="Kabupaten Bogor"
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Tema Utama KKN <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                  placeholder="Pemberdayaan Ekonomi UMKM & Digitalisasi Pasar Desa"
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
                >
                  <option value="Ekonomi Kreatif">Ekonomi Kreatif</option>
                  <option value="Pendidikan & Teknologi">Pendidikan & Teknologi</option>
                  <option value="Kesehatan & Lingkungan">Kesehatan & Lingkungan</option>
                  <option value="Pertanian & Pariwisata">Pertanian & Pariwisata</option>
                  <option value="Lingkungan Hidup">Lingkungan Hidup</option>
                  <option value="Sosial & Budaya">Sosial & Budaya</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Kapasitas Kuota Maksimal
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={formData.kuotaMax}
                  onChange={(e) => setFormData({ ...formData, kuotaMax: Number(e.target.value) })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  DPL Ditugaskan
                </label>
                <input
                  type="text"
                  value={formData.dpl}
                  onChange={(e) => setFormData({ ...formData, dpl: e.target.value })}
                  placeholder="Dr. H. Mulyadi, M.Si."
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Lokasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

