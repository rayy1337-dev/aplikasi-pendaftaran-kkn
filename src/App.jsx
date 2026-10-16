import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/public/LandingPage';
import JadwalPage from './pages/public/JadwalPage';
import PanduanPage from './pages/public/PanduanPage';
import FAQPage from './pages/public/FAQPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MahasiswaDashboard from './pages/mahasiswa/MahasiswaDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="jadwal" element={<JadwalPage />} />
          <Route path="panduan" element={<PanduanPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Mahasiswa Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="mahasiswa" />}>
          <Route path="/mahasiswa/dashboard" element={<MahasiswaDashboard />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
