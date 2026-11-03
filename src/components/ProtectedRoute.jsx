import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ allowedRole }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        color: '#64748b'
      }}>
        <Loader2 size={36} className="spin-animation" style={{ color: '#2563eb' }} />
        <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>Memverifikasi sesi login...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Redirect unauthenticated user to login and preserve target location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Role mismatch: safely redirect to the user's appropriate portal
    return user.role === 'admin'
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/mahasiswa/dashboard" replace />;
  }

  return <Outlet />;
}
