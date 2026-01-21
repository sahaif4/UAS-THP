
import React from 'react';
import { StudentSession } from '../types';

interface FinishedProps {
  session: StudentSession;
}

const Finished: React.FC<FinishedProps> = ({ session }) => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Ujian Selesai!</h1>
        <p className="text-slate-500 mb-8">Terima kasih, jawaban Anda telah berhasil terkirim ke server.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Skor Anda</span>
            <span className="text-4xl font-black text-blue-600">{session.score}</span>
            <span className="text-slate-400 font-bold">/100</span>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</span>
            <span className="text-lg font-bold text-green-600 uppercase">LULUS UJIAN</span>
          </div>
        </div>

        <div className="text-left space-y-3 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
          <div className="flex justify-between text-sm">
            <span className="text-blue-700 font-medium">Nama:</span>
            <span className="text-slate-900 font-bold">{session.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-700 font-medium">NIM:</span>
            <span className="text-slate-900 font-bold">{session.nim}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-700 font-medium">Kelas:</span>
            <span className="text-slate-900 font-bold">{session.className}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-700 font-medium">Pelanggaran:</span>
            <span className="text-slate-900 font-bold">{session.warnings} Kali</span>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400 italic">
          Data ini telah terarsip secara permanen di database universitas.
        </p>
      </div>
    </div>
  );
};

export default Finished;
