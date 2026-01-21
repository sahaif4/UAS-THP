
import React, { useState, useEffect, useCallback } from 'react';
import { WARNING_LIMIT, CLASS_NAME } from './constants';
import { StudentSession, ExamStatus } from './types';
import { getSession, saveSession, clearSession, getCurrentStudentNIM, setCurrentStudentNIM } from './services/storage';
import Login from './components/Login';
import Exam from './components/Exam';
import Finished from './components/Finished';
import WarningOverlay from './components/WarningOverlay';
import Supervisor from './components/Supervisor';

const App: React.FC = () => {
  const [status, setStatus] = useState<ExamStatus>(ExamStatus.LOGIN);
  const [session, setSession] = useState<StudentSession | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isSupervisorView, setIsSupervisorView] = useState(false);

  // Check for supervisor view and initialize session from storage
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('view') === 'supervisor') {
      setIsSupervisorView(true);
    } else {
      const currentNim = getCurrentStudentNIM();
      if (currentNim) {
        const saved = getSession(currentNim);
        if (saved) {
          if (saved.warnings >= WARNING_LIMIT) {
            setStatus(ExamStatus.PENALTY);
          } else if (saved.isFinished) {
            setSession(saved);
            setStatus(ExamStatus.FINISHED);
          } else {
            setSession(saved);
            setStatus(ExamStatus.EXAM);
          }
        }
      }
    }
  }, []);

  const handleStartExam = (name: string, nim: string, token: string) => {
    const newSession: StudentSession = {
      name,
      nim,
      className: CLASS_NAME,
      token,
      startTime: Date.now(),
      answers: {},
      warnings: 0,
      isFinished: false
    };
    setSession(newSession);
    saveSession(newSession);
    setCurrentStudentNIM(nim);
    setStatus(ExamStatus.EXAM);
  };

  const handleFinishExam = useCallback((score: number) => {
    if (session) {
      const finalSession = { ...session, isFinished: true, score };
      setSession(finalSession);
      saveSession(finalSession);
      setStatus(ExamStatus.FINISHED);
      console.log("Submitting Score:", score);
    }
  }, [session]);

  const handleCheatAttempt = useCallback(() => {
    if (status !== ExamStatus.EXAM || !session) return;

    const newWarnings = session.warnings + 1;
    const updatedSession = { ...session, warnings: newWarnings };
    setSession(updatedSession);
    saveSession(updatedSession);

    if (newWarnings >= WARNING_LIMIT) {
      setStatus(ExamStatus.PENALTY);
      clearSession(session.nim); // Remove so they can't resume
    } else {
      setShowWarning(true);
    }
  }, [status, session]);

  if (isSupervisorView) {
    return <Supervisor />;
  }

  if (status === ExamStatus.PENALTY) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">AKSES DIBLOKIR</h1>
          <p className="text-slate-600 mb-6">
            Anda telah melanggar aturan ujian (perpindahan jendela/tab) lebih dari {WARNING_LIMIT - 1} kali.
            Status Anda telah dicatat sebagai <strong>PENALTY</strong>.
          </p>
          <div className="bg-red-50 p-4 rounded-lg text-red-800 text-sm font-medium">
            Nilai Anda akan dipending. Silakan hubungi dosen pengampu untuk jadwal remedial.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {status === ExamStatus.LOGIN && (
        <Login onLogin={handleStartExam} />
      )}
      {status === ExamStatus.EXAM && session && (
        <Exam 
          session={session} 
          onUpdateSession={(updated) => {
            setSession(updated);
            saveSession(updated);
          }}
          onFinish={handleFinishExam}
          onCheatAttempt={handleCheatAttempt}
        />
      )}
      {status === ExamStatus.FINISHED && session && (
        <Finished session={session} />
      )}
      {showWarning && (
        <WarningOverlay 
          warningCount={session?.warnings || 0} 
          onClose={() => setShowWarning(false)} 
        />
      )}
    </div>
  );
};

export default App;
