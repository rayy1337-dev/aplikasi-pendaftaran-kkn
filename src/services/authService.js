import api from './api';

// Predefined demo accounts for quick testing & demonstration
export const DEMO_ACCOUNTS = {
  mahasiswa: {
    id: 1,
    name: 'Feris Pratama',
    email: 'feris.pratama@student.kampus.ac.id',
    nim: '220101001',
    role: 'mahasiswa',
    prodi: 'Teknik Informatika',
    fakultas: 'Ilmu Komputer',
    no_hp: '081234567890',
    sks: 110,
    ipk: 3.75,
  },
  admin: {
    id: 99,
    name: 'Dra. Hj. Nurul Hidayati, M.Kom (Admin LPPM)',
    email: 'admin.kkn@kampus.ac.id',
    role: 'admin',
    unit: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM)',
  },
};

/**
 * Service for user authentication (Login, Register, Logout)
 * Seamlessly integrates with Ricko's backend API (/api/auth)
 * with graceful fallback to offline demo mode if backend is not yet started.
 */
export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { identifier, password, role }
   */
  login: async ({ identifier, password, role = 'mahasiswa' }) => {
    try {
      // Attempt login to Ricko's backend REST API
      const response = await api.post('/auth/login', {
        identifier,
        email: identifier,
        password,
        role,
      });

      const { token, user } = response.data;
      return {
        success: true,
        token: token || 'jwt-token-' + Date.now(),
        user: user || {
          email: identifier,
          name: role === 'admin' ? 'Administrator LPPM' : identifier.split('@')[0],
          role,
          nim: role === 'mahasiswa' ? identifier : undefined,
        },
        isBackendConnected: true,
      };
    } catch (err) {
      // Check if this was a network error (backend server offline)
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED';

      if (isNetworkError) {
        console.warn('Backend server (localhost:5000) not responding. Falling back to local authentication mode.');
        
        // Match demo accounts or generate appropriate user profile
        let user;
        if (role === 'admin') {
          user = {
            ...DEMO_ACCOUNTS.admin,
            email: identifier.includes('@') ? identifier : DEMO_ACCOUNTS.admin.email,
          };
        } else {
          user = {
            ...DEMO_ACCOUNTS.mahasiswa,
            email: identifier.includes('@') ? identifier : `${identifier}@student.kampus.ac.id`,
            nim: !identifier.includes('@') ? identifier : DEMO_ACCOUNTS.mahasiswa.nim,
          };
        }

        const mockToken = `mock-jwt-${role}-${Date.now()}`;

        return {
          success: true,
          token: mockToken,
          user,
          isBackendConnected: false,
          notice: 'Mode Demo Offline: Terhubung ke sesi simulasi frontend (Backend Ricko belum aktif di port 5000).',
        };
      }

      // If backend returned 400/401/403/etc, throw the server's error message
      const message = err.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.';
      throw new Error(message);
    }
  },

  /**
   * Register a new Mahasiswa account
   * @param {Object} userData - { name, nim, email, prodi, fakultas, no_hp, password }
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
        isBackendConnected: true,
      };
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED';

      if (isNetworkError) {
        console.warn('Backend server offline. Simulating successful registration locally.');
        return {
          success: true,
          data: {
            id: Date.now(),
            ...userData,
            role: 'mahasiswa',
          },
          isBackendConnected: false,
          notice: 'Mode Demo Offline: Pendaftaran akun tersimpan secara lokal.',
        };
      }

      const message = err.response?.data?.message || 'Pendaftaran gagal. Silakan coba kembali.';
      throw new Error(message);
    }
  },

  /**
   * Fetch current user profile using JWT token
   */
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch {
      // In offline mode, retrieve from localStorage
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
  },
};

export default authService;
