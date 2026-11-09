import api from './api';

const ANNOUNCEMENT_STORAGE_KEY = 'kkn_announcements_data';

export const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Batas Akhir Penyerahan Berkas Pendaftaran KKN Semester Genap',
    date: '08 November 2026',
    author: 'Koordinator LPPM',
    category: 'Penting',
    content: 'Diberitahukan kepada seluruh mahasiswa calon peserta KKN bahwa penutupan pendaftaran online dan upload berkas persyaratan adalah pada 20 November 2026 pukul 23:59 WIB. Pastikan status berkas telah terverifikasi.',
  },
  {
    id: 2,
    title: 'Rilis Resmi Hasil Verifikasi Berkas & Plotting Kelompok KKN Tahap 1',
    date: '07 November 2026',
    author: 'Tim Penempatan LPPM',
    category: 'Akademik',
    content: 'Daftar penempatan kelompok KKN dan penugasan Dosen Pembimbing Lapangan (DPL) telah diterbitkan di Dashboard Mahasiswa bagi yang telah berstatus Diterima.',
  },
  {
    id: 3,
    title: 'Jadwal Pembekalan & Coaching Mahasiswa KKN Angkatan 2026/2027',
    date: '06 November 2026',
    author: 'Tim Akademik LPPM',
    category: 'Akademik',
    content: 'Pembekalan umum KKN akan dilaksanakan secara hybrid di Auditorium Pusat dan via Zoom pada tanggal 28 November 2026. Kehadiran pembekalan bersifat wajib sebagai syarat penerbitan surat tugas.',
  },
  {
    id: 4,
    title: 'Ketentuan Format Surat Keterangan Sehat dan Izin Orang Tua',
    date: '02 November 2026',
    author: 'Sekretariat KKN',
    category: 'Administrasi',
    content: 'Surat keterangan sehat wajib menyertakan stempel basah fasilitas kesehatan resmi (Puskesmas/Klinik/RS). Surat izin orang tua/wali wajib bermaterai Rp 10.000.',
  },
];

const getStored = () => {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading announcements from storage:', err);
  }
  localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
  return DEFAULT_ANNOUNCEMENTS;
};

const setStored = (data) => {
  localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(data));
};

export const announcementService = {
  getAll: async () => {
    try {
      const res = await api.get('/pengumuman');
      if (res.data && Array.isArray(res.data)) {
        setStored(res.data);
        return { success: true, data: res.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }
    return { success: true, data: getStored(), isBackendConnected: false };
  },

  create: async (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      author: item.author || 'Administrator LPPM',
    };

    try {
      const res = await api.post('/pengumuman', newItem);
      if (res.data) {
        return { success: true, data: res.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const current = getStored();
    const updated = [newItem, ...current];
    setStored(updated);
    return { success: true, data: newItem, isBackendConnected: false };
  },

  delete: async (id) => {
    try {
      await api.delete(`/pengumuman/${id}`);
    } catch {
      // fallback
    }

    const current = getStored();
    const updated = current.filter((a) => a.id !== id);
    setStored(updated);
    return { success: true };
  },
};

export default announcementService;
