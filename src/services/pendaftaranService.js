import api from './api';
import { lokasiService } from './lokasiService';

const PENDAFTARAN_STORAGE_KEY = 'kkn_pendaftaran_data';

// Initial sample applicants for testing & demonstration
export const INITIAL_APPLICANTS = [
  {
    id: 101,
    registrationNumber: 'REG-KKN-2026-0012',
    registeredAt: '2026-11-04 10:24',
    nim: '220101045',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@student.kampus.ac.id',
    fakultas: 'Ilmu Sosial dan Ilmu Politik',
    prodi: 'Ilmu Komunikasi',
    noHp: '081398765432',
    sks: 116,
    ipk: 3.82,
    jenisKelamin: 'Perempuan',
    lokasiId: 2,
    desa: 'Desa Margaluyu',
    kecamatan: 'Kecamatan Tanjungsari',
    kabupaten: 'Kabupaten Sumedang',
    kelompok: 'Kelompok KKN-05',
    dpl: 'Dr. Retno Wulandari, S.T., M.Kom.',
    status: 'Diverifikasi', // 'Menunggu Verifikasi' | 'Diverifikasi' | 'Revisi Berkas' | 'Diterima' | 'Ditolak'
    catatanAdmin: 'Semua berkas lengkap dan sesuai kriteria akademik.',
    berkas: {
      ktm: { name: 'KTM_220101045_Siti.pdf', size: '420 KB', uploadedAt: '2026-11-04', url: 'https://placehold.co/600x400/2563eb/white?text=KTM+Siti+Nurhaliza' },
      transkrip: { name: 'Transkrip_Nilai_116SKS.pdf', size: '890 KB', uploadedAt: '2026-11-04', url: 'https://placehold.co/600x800/1e293b/white?text=Transkrip+Nilai+116+SKS' },
      suratSehat: { name: 'Surat_Keterangan_Sehat_Klinik.pdf', size: '512 KB', uploadedAt: '2026-11-04', url: 'https://placehold.co/600x800/059669/white?text=Surat+Keterangan+Sehat' },
      suratIzin: { name: 'Surat_Izin_Orang_Tua_Bermaterai.pdf', size: '620 KB', uploadedAt: '2026-11-04', url: 'https://placehold.co/600x800/d97706/white?text=Surat+Izin+Orang+Tua' },
    },
  },
  {
    id: 102,
    registrationNumber: 'REG-KKN-2026-0038',
    registeredAt: '2026-11-05 14:10',
    nim: '220101089',
    name: 'Budi Santoso',
    email: 'budi.santoso@student.kampus.ac.id',
    fakultas: 'Ekonomi dan Bisnis',
    prodi: 'Manajemen Keuangan',
    noHp: '081277665544',
    sks: 108,
    ipk: 3.45,
    jenisKelamin: 'Laki-laki',
    lokasiId: 3,
    desa: 'Desa Sindangasih',
    kecamatan: 'Kecamatan Karangpawitan',
    kabupaten: 'Kabupaten Garut',
    status: 'Revisi Berkas',
    catatanAdmin: 'Scan Surat Keterangan Sehat blur dan tidak berstempel basah dari puskesmas/klinik. Harap unggah ulang berkas yang jelas.',
    berkas: {
      ktm: { name: 'Scan_KTM_Budi.pdf', size: '380 KB', uploadedAt: '2026-11-05', url: 'https://placehold.co/600x400/2563eb/white?text=KTM+Budi+Santoso' },
      transkrip: { name: 'Transkrip_Akademik_Semester6.pdf', size: '750 KB', uploadedAt: '2026-11-05', url: 'https://placehold.co/600x800/1e293b/white?text=Transkrip+Akademik' },
      suratSehat: { name: 'Surat_Kesehatan_Kabur.jpg', size: '210 KB', uploadedAt: '2026-11-05', url: 'https://placehold.co/600x800/dc2626/white?text=Surat+Kesehatan+(Buram+-+Perlu+Revisi)' },
      suratIzin: { name: 'Pernyataan_Orang_Tua.pdf', size: '490 KB', uploadedAt: '2026-11-05', url: 'https://placehold.co/600x800/d97706/white?text=Pernyataan+Wali' },
    },
  },
  {
    id: 103,
    registrationNumber: 'REG-KKN-2026-0071',
    registeredAt: '2026-11-06 09:15',
    nim: '220101102',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@student.kampus.ac.id',
    fakultas: 'Ilmu Kesehatan',
    prodi: 'Kesehatan Masyarakat',
    noHp: '081911223344',
    sks: 122,
    ipk: 3.91,
    jenisKelamin: 'Perempuan',
    lokasiId: 1,
    desa: 'Desa Sukamaju',
    kecamatan: 'Kecamatan Ciawi',
    kabupaten: 'Kabupaten Bogor',
    kelompok: 'Kelompok KKN-02',
    dpl: 'Dr. H. Mulyadi, M.Si.',
    status: 'Diterima',
    catatanAdmin: 'Selamat! Pendaftaran telah disetujui penuh oleh LPPM. Kelompok KKN-02.',
    berkas: {
      ktm: { name: 'KTM_Dewi_Lestari.pdf', size: '410 KB', uploadedAt: '2026-11-06', url: 'https://placehold.co/600x400/2563eb/white?text=KTM+Dewi+Lestari' },
      transkrip: { name: 'Transkrip_Nilai_Dewi.pdf', size: '920 KB', uploadedAt: '2026-11-06', url: 'https://placehold.co/600x800/1e293b/white?text=Transkrip+Nilai+122+SKS' },
      suratSehat: { name: 'SK_Sehat_Dokter.pdf', size: '600 KB', uploadedAt: '2026-11-06', url: 'https://placehold.co/600x800/059669/white?text=Surat+Kesehatan+Resmi' },
      suratIzin: { name: 'Surat_Izin_Ortu_Materai10k.pdf', size: '550 KB', uploadedAt: '2026-11-06', url: 'https://placehold.co/600x800/d97706/white?text=Surat+Izin+Materai' },
    },
  },
  {
    id: 104,
    registrationNumber: 'REG-KKN-2026-0095',
    registeredAt: '2026-11-07 16:30',
    nim: '220101115',
    name: 'Rizky Firmansyah',
    email: 'rizky.firmansyah@student.kampus.ac.id',
    fakultas: 'Teknik',
    prodi: 'Teknik Sipil',
    noHp: '085712348899',
    sks: 104,
    ipk: 3.30,
    jenisKelamin: 'Laki-laki',
    lokasiId: 5,
    desa: 'Desa Bojongkunci',
    kecamatan: 'Kecamatan Pameungpeuk',
    kabupaten: 'Kabupaten Bandung',
    status: 'Menunggu Verifikasi',
    catatanAdmin: 'Menunggu antrean verifikasi berkas oleh Tim LPPM.',
    berkas: {
      ktm: { name: 'KTM_Rizky.pdf', size: '390 KB', uploadedAt: '2026-11-07', url: 'https://placehold.co/600x400/2563eb/white?text=KTM+Rizky' },
      transkrip: { name: 'Transkrip_Semester5.pdf', size: '710 KB', uploadedAt: '2026-11-07', url: 'https://placehold.co/600x800/1e293b/white?text=Transkrip+Akademik' },
      suratSehat: { name: 'Keterangan_Sehat.pdf', size: '480 KB', uploadedAt: '2026-11-07', url: 'https://placehold.co/600x800/059669/white?text=Surat+Sehat' },
      suratIzin: { name: 'Izin_Ortu.pdf', size: '510 KB', uploadedAt: '2026-11-07', url: 'https://placehold.co/600x800/d97706/white?text=Surat+Izin' },
    },
  },
];

// Helper to get stored applicants
const getStoredApplicants = () => {
  try {
    const raw = localStorage.getItem(PENDAFTARAN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading applicants from localStorage:', err);
  }
  localStorage.setItem(PENDAFTARAN_STORAGE_KEY, JSON.stringify(INITIAL_APPLICANTS));
  return INITIAL_APPLICANTS;
};

// Helper to persist applicants
const setStoredApplicants = (applicants) => {
  localStorage.setItem(PENDAFTARAN_STORAGE_KEY, JSON.stringify(applicants));
};

export const pendaftaranService = {
  /**
   * Get all applicants (Admin)
   */
  getAll: async () => {
    try {
      const response = await api.get('/admin/pendaftaran');
      if (response.data && Array.isArray(response.data)) {
        setStoredApplicants(response.data);
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const localData = getStoredApplicants();
    return {
      success: true,
      data: localData,
      isBackendConnected: false,
    };
  },

  /**
   * Get registration for currently logged in student or by NIM
   */
  getByStudent: async (nimOrEmail) => {
    try {
      const response = await api.get('/pendaftaran/me');
      if (response.data) {
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const list = getStoredApplicants();
    const item = list.find((p) => p.nim === nimOrEmail || p.email === nimOrEmail);
    return { success: Boolean(item), data: item || null, isBackendConnected: false };
  },

  /**
   * Submit new registration wizard
   * @param {Object} payload - { biodata, lokasi, berkas }
   */
  submit: async (payload) => {
    const { biodata, lokasi, berkas } = payload;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const randomSuffix = String(Math.floor(1000 + Math.random() * 9000));
    const registrationNumber = `REG-KKN-2026-${randomSuffix}`;

    const newRegistration = {
      id: Date.now(),
      registrationNumber,
      registeredAt: formattedDate,
      nim: biodata.nim,
      name: biodata.name,
      email: biodata.email,
      fakultas: biodata.fakultas,
      prodi: biodata.prodi,
      noHp: biodata.noHp,
      sks: Number(biodata.sks),
      ipk: Number(biodata.ipk),
      jenisKelamin: biodata.jenisKelamin || 'Laki-laki',
      lokasiId: lokasi.id,
      desa: lokasi.desa,
      kecamatan: lokasi.kecamatan,
      kabupaten: lokasi.kabupaten,
      dpl: lokasi.dpl,
      status: 'Menunggu Verifikasi',
      catatanAdmin: 'Berkas berhasil diserahkan ke sistem. Sedang dalam antrean verifikasi Tim LPPM.',
      berkas: {
        ktm: berkas.ktm || { name: 'KTM_Mahasiswa.pdf', size: '450 KB', uploadedAt: formattedDate },
        transkrip: berkas.transkrip || { name: 'Transkrip_Nilai.pdf', size: '780 KB', uploadedAt: formattedDate },
        suratSehat: berkas.suratSehat || { name: 'Surat_Keterangan_Sehat.pdf', size: '520 KB', uploadedAt: formattedDate },
        suratIzin: berkas.suratIzin || { name: 'Surat_Izin_OrangTua.pdf', size: '610 KB', uploadedAt: formattedDate },
      },
    };

    // Try submitting to backend REST API
    try {
      const response = await api.post('/pendaftaran', newRegistration);
      if (response.data) {
        lokasiService.incrementKuota(lokasi.id);
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    // Save to local storage
    const currentList = getStoredApplicants();
    // Replace if same NIM already exists, or prepend
    const existingIndex = currentList.findIndex((item) => item.nim === biodata.nim);
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...currentList];
      updatedList[existingIndex] = newRegistration;
    } else {
      updatedList = [newRegistration, ...currentList];
    }

    setStoredApplicants(updatedList);
    lokasiService.incrementKuota(lokasi.id);

    return {
      success: true,
      data: newRegistration,
      isBackendConnected: false,
      notice: 'Pendaftaran berhasil disimpan ke sistem.',
    };
  },

  /**
   * Verify applicant (Admin: Terima, Revisi Berkas, Tolak)
   */
  verify: async (id, { status, catatanAdmin, kelompok }) => {
    try {
      const response = await api.put(`/admin/pendaftaran/${id}/verifikasi`, {
        status,
        catatanAdmin,
        kelompok,
      });
      if (response.data) {
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const currentList = getStoredApplicants();
    const updated = currentList.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          status,
          catatanAdmin: catatanAdmin || item.catatanAdmin,
          kelompok: kelompok || (status === 'Diterima' ? (item.kelompok || `Kelompok KKN-${Math.floor(1 + Math.random() * 20)}`) : item.kelompok),
          verifiedAt: new Date().toISOString(),
        };
      }
      return item;
    });

    setStoredApplicants(updated);
    const updatedItem = updated.find((i) => i.id === Number(id));
    return { success: true, data: updatedItem, isBackendConnected: false };
  },

  /**
   * Re-upload revision documents (Mahasiswa)
   */
  revisiUpload: async (id, updatedBerkas, catatanMahasiswa) => {
    try {
      const response = await api.put(`/pendaftaran/${id}/revisi-berkas`, {
        berkas: updatedBerkas,
        catatanMahasiswa,
      });
      if (response.data) {
        return { success: true, data: response.data, isBackendConnected: true };
      }
    } catch {
      // fallback
    }

    const currentList = getStoredApplicants();
    const updated = currentList.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          status: 'Menunggu Verifikasi',
          catatanAdmin: `Revisi berkas telah diunggah oleh mahasiswa (${catatanMahasiswa || 'Dokumen diperbaiki'}). Menunggu peninjauan ulang tim LPPM.`,
          berkas: {
            ...item.berkas,
            ...updatedBerkas,
          },
        };
      }
      return item;
    });

    setStoredApplicants(updated);
    const updatedItem = updated.find((i) => i.id === Number(id));
    return { success: true, data: updatedItem, isBackendConnected: false };
  },

  /**
   * Reset / delete registration (For demo / testing)
   */
  delete: async (id) => {
    try {
      await api.delete(`/pendaftaran/${id}`);
    } catch {
      // fallback
    }

    const currentList = getStoredApplicants();
    const updated = currentList.filter((item) => item.id !== Number(id));
    setStoredApplicants(updated);
    return { success: true };
  },
};

export default pendaftaranService;

