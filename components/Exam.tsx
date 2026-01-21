
import React, { useState, useEffect } from 'react';
import { StudentSession, Question } from '../types';
import { EXAM_DURATION_MINUTES, GOOGLE_SHEETS_ENDPOINT } from '../constants';
import { getSession, getQuestionBank } from '../services/storage';

interface ExamProps {
  session: StudentSession;
  onUpdateSession: (session: StudentSession) => void;
  onFinish: (score: number) => void;
  onCheatAttempt: () => void;
}

const Exam: React.FC<ExamProps> = ({ session, onUpdateSession, onFinish, onCheatAttempt }) => {
  const [questions] = useState<Question[]>(() => getQuestionBank());
  
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [indicator, setIndicator] = useState<{ show: boolean; text: string; type: 'success' | 'error' }>({ show: false, text: '', type: 'success' });
  const [indicatorTimeout, setIndicatorTimeout] = useState<number | null>(null);
  const [supervisorMessage, setSupervisorMessage] = useState<{text: string; timestamp: number} | null>(null);


  // Remote Disconnect & Message Check
  useEffect(() => {
    const sessionCheckInterval = setInterval(() => {
      const currentSession = getSession(session.nim);
      if (!currentSession) {
        clearInterval(sessionCheckInterval);
        alert("Sesi Anda telah dihentikan oleh pengawas.");
        window.location.reload();
      } else if (currentSession.supervisorMessage && !currentSession.supervisorMessage.acknowledged) {
        setSupervisorMessage({
          text: currentSession.supervisorMessage.text,
          timestamp: currentSession.supervisorMessage.timestamp,
        });
      }
    }, 2000);

    return () => clearInterval(sessionCheckInterval);
  }, [session.nim]);


  // Anti-Cheat: Visibility and Blur detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        onCheatAttempt();
      }
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => window.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [onCheatAttempt]);

  // Timer logic
  useEffect(() => {
    const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
    const initialTime = Math.max(0, EXAM_DURATION_MINUTES * 60 - elapsed);
    setTimeLeft(initialTime);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session.startTime]);
  
  const triggerIndicator = (text: string, type: 'success' | 'error' = 'success') => {
      if (indicatorTimeout) clearTimeout(indicatorTimeout);
      setIndicator({ show: true, text, type });
      const newTimeout = window.setTimeout(() => setIndicator(prev => ({ ...prev, show: false })), 2500);
      setIndicatorTimeout(newTimeout);
  };

  // Auto-save feature
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      onUpdateSession(session);
      triggerIndicator('Jawaban tersimpan otomatis');
    }, 30000);
    return () => clearInterval(autoSaveInterval);
  }, [session, onUpdateSession]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (questionId: number, optionKey: string) => {
    const newAnswers = { ...session.answers, [questionId]: optionKey };
    onUpdateSession({ ...session, answers: newAnswers });
    syncAnswerToSheet(questionId, optionKey);
    triggerIndicator('Jawaban disimpan');
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => { if (session.answers[q.id] === q.correctAnswer) correct++; });
    if (questions.length === 0) return 0;
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    const answeredQuestions = Object.keys(session.answers).length;
    if (timeLeft > 0 && answeredQuestions < questions.length) {
      if (!window.confirm("Anda belum menjawab semua pertanyaan. Yakin ingin mengakhiri ujian sekarang?")) return;
    } else if (timeLeft > 0) {
      if (!window.confirm("Yakin ingin mengakhiri ujian sekarang?")) return;
    }

    setIsSubmitting(true);
    const score = calculateScore();
    try {
      await fetch(GOOGLE_SHEETS_ENDPOINT, { method: 'POST', body: JSON.stringify({ action: 'SUBMIT_EXAM', nim: session.nim, nama: session.name, kelas: session.className, score, timestamp: new Date().toISOString(), answers: JSON.stringify(session.answers), warnings: session.warnings }) });
    } catch (e) { console.error("Submission failed, but score saved locally", e); }
    onFinish(score);
    setIsSubmitting(false);
  };
  
  const syncAnswerToSheet = async (questionId: number, answer: string) => {
    try {
        await fetch(GOOGLE_SHEETS_ENDPOINT, { method: 'POST', body: JSON.stringify({ action: 'UPDATE_ANSWER', nim: session.nim, nama: session.name, questionId, answer, timestamp: new Date().toISOString() }) });
    } catch (e) { console.error("Failed to sync answer in real-time:", e); }
  };

  const handleAcknowledgeMessage = () => {
    const currentSession = getSession(session.nim);
    if (currentSession && currentSession.supervisorMessage && !currentSession.supervisorMessage.acknowledged) {
        const updatedSession = { ...currentSession, supervisorMessage: { ...currentSession.supervisorMessage, acknowledged: true } };
        onUpdateSession(updatedSession);
    }
    setSupervisorMessage(null);
  };
  
  const totalQuestions = questions.length;
  if (totalQuestions === 0) {
      return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
            <div className="text-center p-8">
                <h2 className="text-xl font-bold text-slate-700">Ujian Belum Siap</h2>
                <p className="text-slate-500 mt-2">Belum ada soal yang ditambahkan oleh pengawas. Silakan hubungi pengawas ujian.</p>
            </div>
        </div>
      );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <div className="min-h-screen bg-slate-100 flex items-center justify-center"><h2 className="text-xl font-bold">Memuat Soal...</h2></div>;

  const answeredQuestions = Object.keys(session.answers).length;
  const progressPercent = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">UAS Aplikasi Komputer</h1>
          <p className="text-sm text-slate-500">{session.name} ({session.nim})</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
          <div className="text-xs text-slate-500">Sisa Waktu</div>
        </div>
      </header>
      
      <div className="w-full bg-slate-200 h-2"><div className="bg-blue-600 h-2 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div></div>
      
      {supervisorMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl z-20 px-4 transition-all duration-300 animate-fade-in-down">
            <div role="alert" className="bg-sky-100 border-l-4 border-sky-500 text-sky-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="font-bold">Pesan dari Pengawas</p>
                        <p className="text-sm">{supervisorMessage.text}</p>
                    </div>
                </div>
                <button 
                  onClick={handleAcknowledgeMessage} 
                  aria-label="Tutup pesan"
                  className="ml-4 p-1.5 rounded-full text-sky-500 bg-sky-200/50 hover:bg-sky-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
      )}

      <main className="w-full max-w-5xl p-4 md:p-8 flex-grow">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Pertanyaan <span className="font-bold text-blue-600">{currentQuestionIndex + 1}</span> dari {totalQuestions}</h2>
            <span className={`text-xs font-bold py-1 px-3 rounded-full ${session.answers[currentQuestion.id] ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{session.answers[currentQuestion.id] ? 'Sudah Dijawab' : 'Belum Dijawab'}</span>
          </div>
          <p className="text-slate-700 leading-relaxed mb-8">{currentQuestion.text}</p>
          <div className="space-y-4">
            {currentQuestion.options.map(option => (
              <button key={option.key} onClick={() => handleSelectOption(currentQuestion.id, option.key)} className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start space-x-4 ${session.answers[currentQuestion.id] === option.key ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}>
                <span className={`font-bold text-sm flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${session.answers[currentQuestion.id] === option.key ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{option.key}</span>
                <span className="text-slate-800">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="w-full bg-white/80 backdrop-blur-sm border-t border-slate-200 p-4 sticky bottom-0 z-10 flex justify-between items-center">
        <button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">Sebelumnya</button>
        {indicator.show && <div className={`animate-fade-in-out px-4 py-2 rounded-full text-sm font-semibold ${indicator.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{indicator.text}</div>}
        {currentQuestionIndex === totalQuestions - 1 ? (
          <button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-400">{isSubmitting ? 'Mengirim...' : 'Selesai & Kirim'}</button>
        ) : (
          <button onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))} disabled={currentQuestionIndex === totalQuestions - 1} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">Selanjutnya</button>
        )}
      </footer>
    </div>
  );
};

export default Exam;
