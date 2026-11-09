import React, { useState, useEffect } from 'react';
import { Bell, Plus, Calendar, AlertCircle, Trash2, X, Send, RefreshCw } from 'lucide-react';
import { announcementService } from '../../services/announcementService';

export default function PengumumanManager() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Penting',
    content: '',
  });

  const loadAnnouncements = async () => {
    setIsLoading(true);
    const res = await announcementService.getAll();
    if (res.data) {
      setAnnouncements(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      await announcementService.delete(id);
      loadAnnouncements();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    await announcementService.create(formData);
    setFormData({ title: '', category: 'Penting', content: '' });
    setShowModal(false);
    loadAnnouncements();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            Pusat Pengumuman & Informasi LPPM
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Siarkan jadwal penting, instruksi revisi massal, atau informasi penetapan kelompok kepada seluruh mahasiswa.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={loadAnnouncements}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 0.9rem' }}
            title="Muat Ulang Pengumuman"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.25rem' }}
          >
            <Plus size={16} />
            <span>Buat Pengumuman Baru</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          <div className="spinner" style={{ margin: '0 auto 0.5rem', width: '24px', height: '24px' }} />
          <span>Memuat daftar pengumuman...</span>
        </div>
      ) : announcements.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          Belum ada pengumuman yang diterbitkan.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {announcements.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '1rem' }}>
                <div>
                  <span className={`badge ${
                    item.category === 'Penting' ? 'badge-warning' : 'badge-primary'
                  }`} style={{ marginBottom: '6px' }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {item.date}
                    </span>
                    <span>Oleh: {item.author}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', color: '#dc2626', fontSize: '0.75rem' }}
                  title="Hapus Pengumuman"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, marginTop: '0.75rem' }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
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
            maxWidth: '550px',
            width: '100%',
            padding: '2rem',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowModal(false)}
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

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Buat Pengumuman Baru
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Judul Pengumuman:
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Pengumuman Hasil Verifikasi Tahap 1"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Kategori:
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
                >
                  <option value="Penting">Penting</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Administrasi">Administrasi</option>
                  <option value="Informasi Umum">Informasi Umum</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Isi Pengumuman:
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tuliskan detail pengumuman yang akan dibaca oleh mahasiswa..."
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Send size={16} />
                  <span>Publikasikan Pengumuman</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
