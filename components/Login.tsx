
import React, { useState, useEffect } from 'react';
import { CLASS_NAME } from '../constants';
import { getAdminSettings } from '../services/storage';
import { AdminSettings } from '../types';

interface LoginProps {
  onLogin: (name: string, nim: string, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [token, setToken] = useState('');
  const [adminSettings, setAdminSettings] = useState<AdminSettings | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const settings = getAdminSettings();
    setAdminSettings(settings);
  }, []);

  const isExamActive = adminSettings?.isExamActive ?? false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isExamActive) {
      setError("Ujian belum diaktifkan oleh pengawas.");
      return;
    }

    if (!name || !nim || !token) {
      setError("Semua field harus diisi.");
      return;
    }

    if (token !== adminSettings?.token) {
      setError("Token ujian tidak valid!");
      return;
    }
    
    onLogin(name, nim, token);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-2xl font-bold tracking-tight">UAS Ganjil 2025/2026</h1>
          <p className="text-blue-100 mt-1 opacity-90">Mata Kuliah: Aplikasi Komputer</p>
          <div className="mt-4 inline-block bg-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold border border-blue-400/30">
            {CLASS_NAME}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {!isExamActive && (
            <div className="bg-yellow-50 text-yellow-800 text-sm font-semibold p-4 rounded-xl text-center">
              Ujian belum diaktifkan oleh pengawas. Silakan tunggu.
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap Mahasiswa</label>
            <input 
              required
              disabled={!isExamActive}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              placeholder="Masukkan nama sesuai KRS"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">NIM</label>
            <input 
              required
              disabled={!isExamActive}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              placeholder="Masukkan nomor induk mahasiswa"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Token Ujian</label>
            <input 
              required
              disabled={!isExamActive}
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              placeholder="Dapatkan token dari pengawas"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          
          {error && <p className="text-sm text-red-600 font-semibold text-center">{error}</p>}

          <button 
            type="submit"
            disabled={!isExamActive}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Aktifkan & Mulai Ujian
          </button>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs text-amber-700 font-medium">
                  Pastikan koneksi internet stabil. Sistem akan mendeteksi jika Anda keluar dari tab ini.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
