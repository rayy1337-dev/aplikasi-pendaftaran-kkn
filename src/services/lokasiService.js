import api from './api';

// Initial default locations with rich metadata for KKN
export const DEFAULT_LOKASI = [
  {
    id: 1,
    desa: 'Desa Sukamaju',
    kecamatan: 'Kecamatan Ciawi',
    kabupaten: 'Kabupaten Bogor',
    provinsi: 'Jawa Barat',
    tema: 'Pemberdayaan Ekonomi UMKM & Digitalisasi Pasar Desa',
    deskripsi: 'Fokus pada digital branding produk olahan pertanian lokal, pembentukan koperasi digital desa, dan pelatihan laporan keuangan sederhana bagi pelaku usaha mikro.',
    kuotaMax: 25,
    kuotaTerisi: 18,
    dpl: 'Dr. H. Mulyadi, M.Si.',
    fasilitas: ['Posko Balai Desa', 'Akses Internet WiFi', 'Dekat Puskesmas', 'MCK Memadai'],
    kategori: 'Ekonomi Kreatif',
    status: 'Tersedia',
    color: '#2563eb',
  },
  {
    id: 2,
    desa: 'Desa Margaluyu',
    kecamatan: 'Kecamatan Tanjungsari',
    kabupaten: 'Kabupaten Sumedang',
    provinsi: 'Jawa Barat',
    tema: 'Transformasi Digital Sekolah Dasar & Literasi Teknologi Anak',
    deskripsi: 'Revitalisasi laboratorium komputer sekolah dasar pedesaan, pelatihan coding dasar scratch untuk anak-anak, dan optimalisasi sistem informasi desa berbasis web.',
    kuotaMax: 20,
    kuotaTerisi: 19,
    dpl: 'Dr. Retno Wulandari, S.T., M.Kom.',
    fasilitas: ['Rumah Warga (Home Stay)', 'Dekat SD Negeri Margaluyu', 'Jaringan 4G Stabil'],
    kategori: 'Pendidikan & Teknologi',
    status: 'Hampir Penuh',
    color: '#06b6d4',
  },
  {
    id: 3,
    desa: 'Desa Sindangasih',
    kecamatan: 'Kecamatan Karangpawitan',
    kabupaten: 'Kabupaten Garut',
    provinsi: 'Jawa Barat',
    tema: 'Gerakan Sanitasi Bersih, Pengelolaan Sampah & Pencegahan Stunting',
    deskripsi: 'Penyuluhan gizi seimbang balita, pembuatan bank sampah organik dengan maggot BSF, dan perbaikan fasilitas air bersih komunitas warga.',
    kuotaMax: 30,
    kuotaTerisi: 14,
    dpl: 'Dr. apt. Farhan Ramadhani, M.Farm.',
    fasilitas: ['Balai Pertemuan Warga', 'Dapur Umum', 'Dekat Polindes'],
    kategori: 'Kesehatan & Lingkungan',
    status: 'Tersedia',
    color: '#10b981',
  },
  {
    id: 4,
    desa: 'Desa Cibodas',
    kecamatan: 'Kecamatan Lembang',
    kabupaten: 'Kabupaten Bandung Barat',
    provinsi: 'Jawa Barat',
    tema: 'Agrowisata Berkelanjutan & Manajemen Rantai Pasok Sayuran Organik',
    deskripsi: 'Edukasi sertifikasi organik bagi petani hortikultura, pengembangan rute agrowisata edukasi, serta promosi paket wisata alam pedesaan.',
    kuotaMax: 20,
    kuotaTerisi: 20,
    dpl: 'Ir. Bambang Sugiarto, M.P.',
    fasilitas: ['Penginapan Kebun Percobaan', 'Laboratorium Lapangan'],
    kategori: 'Pertanian & Pariwisata',
    status: 'Penuh',
    color: '#f59e0b',
  },
  {
    id: 5,
    desa: 'Desa Bojongkunci',
    kecamatan: 'Kecamatan Pameungpeuk',
    kabupaten: 'Kabupaten Bandung',
    provinsi: 'Jawa Barat',
    tema: 'Mitigasi Bencana Banjir & Pelestarian Daerah Aliran Sungai',
    deskripsi: 'Program penghijauan bantaran sungai, pembentukan posko tanggap bencana remaja desa, dan simulasi evakuasi mandiri untuk warga lansia.',
    kuotaMax: 25,
    kuotaTerisi: 11,
    dpl: 'Dr. Ir. Hendra Gunawan, M.T.',
    fasilitas: ['Posko Siaga Bencana', 'Aula Serbaguna Kantor Desa', 'Akses Jalan Aspal'],
    kategori: 'Lingkungan Hidup',
    status: 'Tersedia',
    color: '#6366f1',
  },
  {
    id: 6,
    desa: 'Desa Wanasari',
    kecamatan: 'Kecamatan Wanaraja',
    kabupaten: 'Kabupaten Garut',
    provinsi: 'Jawa Barat',
    tema: 'Pemberdayaan Pengrajin Anyaman Bambu & Ekspor Kerajinan Lokal',
    deskripsi: 'Pelatihan standarisasi kualitas kerajinan tangan, pendaftaran HKI/Merek Dagang kelompok pengrajin, dan onboarding ke e-commerce nasional.',
    kuotaMax: 20,
    kuotaTerisi: 8,
    dpl: 'Dra. Endang Sulistyowati, M.M.',
    fasilitas: ['Workshop Sentra Kerajinan', 'Akses Transportasi Mudah'],
    kategori: 'Sosial & Budaya',
    status: 'Tersedia',
    color: '#ec4899',
  },
];

const STORAGE_KEY = 'kkn_lokasi_data';

// Helper to get stored locations or initialize
const getStoredLocations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading locations from localStorage:', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LOKASI));
  return DEFAULT_LOKASI;
};

// Helper to save locations
const setStoredLocations = (locations) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
};

export const lokasiService = {
  /**
   * Fetch all locations
   */
  getAll: async () => {
    try {
      const response = await api.get('/lokasi');
      if (response.data && Array.isArray(response.data)) {
        setStoredLocations(response.data);
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // Fallback to local storage if backend offline
    }
    const localData = getStoredLocations();
    return {
      success: true,
      data: localData,
      isBackendConnected: false,
    };
  },

  /**
   * Get location by ID
   */
  getById: async (id) => {
    const numericId = Number(id);
    try {
      const response = await api.get(`/lokasi/${numericId}`);
      if (response.data) {
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }
    const list = getStoredLocations();
    const item = list.find((loc) => loc.id === numericId);
    return { success: Boolean(item), data: item, isBackendConnected: false };
  },

  /**
   * Add new location (Admin feature)
   */
  create: async (newLocation) => {
    const itemWithId = {
      ...newLocation,
      id: Date.now(),
      kuotaTerisi: 0,
      kuotaMax: Number(newLocation.kuotaMax) || 20,
      status: 'Tersedia',
      fasilitas: newLocation.fasilitas || ['Balai Desa', 'Akses Listrik'],
      color: newLocation.color || '#2563eb',
    };

    try {
      const response = await api.post('/lokasi', itemWithId);
      if (response.data) {
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const currentList = getStoredLocations();
    const updated = [itemWithId, ...currentList];
    setStoredLocations(updated);
    return { success: true, data: itemWithId, isBackendConnected: false };
  },

  /**
   * Update location (Admin feature)
   */
  update: async (id, updatedFields) => {
    const numericId = Number(id);
    try {
      const response = await api.put(`/lokasi/${numericId}`, updatedFields);
      if (response.data) {
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const currentList = getStoredLocations();
    const updated = currentList.map((loc) => {
      if (loc.id === numericId) {
        const kuotaMax = Number(updatedFields.kuotaMax ?? loc.kuotaMax);
        const kuotaTerisi = Number(updatedFields.kuotaTerisi ?? loc.kuotaTerisi);
        const status = kuotaTerisi >= kuotaMax ? 'Penuh' : kuotaMax - kuotaTerisi <= 3 ? 'Hampir Penuh' : 'Tersedia';
        return { ...loc, ...updatedFields, kuotaMax, kuotaTerisi, status };
      }
      return loc;
    });
    setStoredLocations(updated);
    const updatedItem = updated.find((l) => l.id === numericId);
    return { success: true, data: updatedItem, isBackendConnected: false };
  },

  /**
   * Delete location
   */
  delete: async (id) => {
    const numericId = Number(id);
    try {
      await api.delete(`/lokasi/${numericId}`);
    } catch {
      // fallback
    }

    const currentList = getStoredLocations();
    const updated = currentList.filter((loc) => loc.id !== numericId);
    setStoredLocations(updated);
    return { success: true };
  },

  /**
   * Book a slot when student registers for this location
   */
  incrementKuota: (lokasiId) => {
    const numericId = Number(lokasiId);
    const list = getStoredLocations();
    const updated = list.map((loc) => {
      if (loc.id === numericId) {
        const kuotaTerisi = Math.min(loc.kuotaMax, loc.kuotaTerisi + 1);
        const status = kuotaTerisi >= loc.kuotaMax ? 'Penuh' : loc.kuotaMax - kuotaTerisi <= 3 ? 'Hampir Penuh' : 'Tersedia';
        return { ...loc, kuotaTerisi, status };
      }
      return loc;
    });
    setStoredLocations(updated);
  },
};

export default lokasiService;

