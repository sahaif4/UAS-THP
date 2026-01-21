
import React from 'react';
import { WARNING_LIMIT } from '../constants';

interface WarningOverlayProps {
  warningCount: number;
  onClose: () => void;
}

const WarningOverlay: React.FC<WarningOverlayProps> = ({ warningCount, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-amber-400 animate-bounce-short">
        <div className="text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase italic tracking-tighter">PERINGATAN KE-{warningCount}!</h2>
          <p className="text-slate-600 mb-6">
            Jangan melakukan kecurangan! Sistem mendeteksi Anda meninggalkan halaman ujian. 
            Jika mencapai peringatan ke-{WARNING_LIMIT}, sistem akan otomatis mengeluarkan Anda dan memblokir akses.
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all uppercase tracking-widest"
          >
            Saya Mengerti & Kembali Ujian
          </button>
          
          <p className="mt-4 text-xs font-bold text-red-500 uppercase">
            Tersisa {WARNING_LIMIT - warningCount} Peluang Lagi
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningOverlay;
