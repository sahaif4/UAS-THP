import React from 'react';
import { getAdminSettings, saveAdminSettings, getActiveSessions, removeStudentSession, saveSession, getQuestionBank, saveQuestionBank } from '../services/storage';
import { AdminSettings, StudentSession, Question } from '../types';

const QuestionModal: React.FC<{
  question: Partial<Question> | null;
  onClose: () => void;
  onSave: (question: Question) => void;
  existingIds: number[];
}> = ({ question, onClose, onSave, existingIds }) => {
  const [formData, setFormData] = React.useState<Partial<Question>>(() => {
    // If it's a new question (no id), suggest the next available ID.
    const initialId = question?.id ?? (Math.max(0, ...existingIds) + 1);
    return {
      text: '',
      options: [{key: 'A', text: ''}, {key: 'B', text: ''}, {key: 'C', text: ''}, {key: 'D', text: ''}, {key: 'E', text: ''}],
      correctAnswer: 'A',
      ...question,
      id: initialId,
    };
  });

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value ? parseInt(e.target.value, 10) : undefined;
    setFormData({ ...formData, id });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, text: e.target.value });
  };

  const handleOptionChange = (key: 'A' | 'B' | 'C' | 'D' | 'E', text: string) => {
    const newOptions = formData.options?.map(opt => opt.key === key ? { ...opt, text } : opt);
    setFormData({ ...formData, options: newOptions });
  };
  
  const handleCorrectAnswerChange = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setFormData({ ...formData, correctAnswer: key });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id === undefined) {
      alert("ID Soal tidak boleh kosong.");
      return;
    }

    // For new questions (passed question prop has no ID), check if the chosen ID already exists.
    if (!question?.id && existingIds.includes(formData.id)) {
      alert(`ID Soal "${formData.id}" sudah digunakan. Mohon gunakan ID lain.`);
      return;
    }

    if (!formData.text || !formData.options?.every(opt => opt.text) || !formData.correctAnswer) {
      alert("Semua field harus diisi.");
      return;
    }
    
    onSave({ ...formData, id: formData.id } as Question);
  };

  if (!question) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">{question.id ? 'Edit Soal' : 'Tambah Soal Baru'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">ID Soal</label>
            <input
              type="number"
              value={formData.id ?? ''}
              onChange={handleIdChange}
              className="w-full p-2 border rounded-md disabled:bg-slate-100"
              disabled={!!question.id} // Disable ID field when editing an existing question
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Teks Pertanyaan</label>
            <textarea value={formData.text} onChange={handleTextChange} rows={4} className="w-full p-2 border rounded-md" required />
          </div>
          {formData.options?.map((opt, index) => (
            <div key={opt.key}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Pilihan {opt.key}</label>
              <input type="text" value={opt.text} onChange={(e) => handleOptionChange(opt.key, e.target.value)} className="w-full p-2 border rounded-md" required />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Jawaban Benar</label>
            <div className="flex space-x-4">
                {formData.options?.map(opt => (
                    <label key={opt.key} className="flex items-center space-x-2">
                        <input type="radio" name="correctAnswer" value={opt.key} checked={formData.correctAnswer === opt.key} onChange={() => handleCorrectAnswerChange(opt.key)} className="h-4 w-4"/>
                        <span>{opt.key}</span>
                    </label>
                ))}
            </div>
          </div>
        </form>
        <div className="p-6 border-t bg-slate-50/70 flex justify-end">
            <button onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">Simpan</button>
        </div>
      </div>
    </div>
  );
};

const Supervisor: React.FC = () => {
  const [settings, setSettings] = React.useState<AdminSettings>({ isExamActive: false, token: null });
  const [activeSessions, setActiveSessions] = React.useState<Record<string, StudentSession>>({});
  const [questionBank, setQuestionBank] = React.useState<Question[]>([]);
  const [activeTab, setActiveTab] = React.useState<'monitoring' | 'bank'>('monitoring');
  
  // Modals and details states
  const [detailStudent, setDetailStudent] = React.useState<StudentSession | null>(null);
  const [editingQuestion, setEditingQuestion] = React.useState<Partial<Question> | null>(null);
  
  // UI helpers
  const [copied, setCopied] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');

  React.useEffect(() => {
    setSettings(getAdminSettings() || { isExamActive: false, token: null });
    setQuestionBank(getQuestionBank());

    const interval = setInterval(() => setActiveSessions(getActiveSessions()), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDetailStudentData = detailStudent ? activeSessions[detailStudent.nim] : null;

  React.useEffect(() => { if (!currentDetailStudentData) setMessageText(''); }, [currentDetailStudentData]);

  const generateToken = () => {
    const newToken = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newSettings = { ...settings, token: newToken };
    setSettings(newSettings);
    saveAdminSettings(newSettings);
  };

  const toggleExamActivation = () => {
    const newSettings = { ...settings, isExamActive: !settings.isExamActive };
    if (newSettings.isExamActive && !newSettings.token) {
      newSettings.token = Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    setSettings(newSettings);
    saveAdminSettings(newSettings);
  };

  const handleCopyToClipboard = () => {
    if (settings.token) {
      navigator.clipboard.writeText(settings.token).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDisconnectStudent = (nim: string) => {
    if (window.confirm(`Yakin ingin mengeluarkan mahasiswa dengan NIM ${nim}?`)) {
      removeStudentSession(nim);
      setActiveSessions(getActiveSessions());
    }
  };

  const handleSendMessage = () => {
    if (!currentDetailStudentData || !messageText.trim()) return;
    const updatedSession = { ...currentDetailStudentData, supervisorMessage: { text: messageText, timestamp: Date.now(), acknowledged: false } };
    saveSession(updatedSession);
    setMessageText('');
  };
  
  const handleSaveQuestion = (question: Question) => {
    const index = questionBank.findIndex(q => q.id === question.id);
    let newBank;
    if (index > -1) {
      newBank = [...questionBank];
      newBank[index] = question;
    } else {
      newBank = [...questionBank, question];
    }
    setQuestionBank(newBank);
    saveQuestionBank(newBank);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: number) => {
    if (window.confirm("Yakin ingin menghapus soal ini secara permanen?")) {
      const newBank = questionBank.filter(q => q.id !== id);
      setQuestionBank(newBank);
      saveQuestionBank(newBank);
    }
  };

  // FIX: Explicitly type the sort callback parameters to resolve type inference issues.
  const studentList = Object.values(activeSessions).sort((a: StudentSession, b: StudentSession) => a.name.localeCompare(b.name));
  const totalQuestions = questionBank.length;

  const handleExportCSV = () => {
    if (studentList.length === 0) return;
    const headers = ['NIM', 'Nama Mahasiswa', 'Progress (%)', 'Warnings', 'Status', 'Skor'];
    // FIX: Explicitly type the `student` parameter to resolve type inference issues.
    const csvRows = studentList.map((student: StudentSession) => {
      const progress = totalQuestions > 0 ? Math.round((Object.keys(student.answers).length / totalQuestions) * 100) : 0;
      return [student.nim, student.name, progress, student.warnings, student.isFinished ? 'Selesai' : 'Mengerjakan', student.score ?? 'N/A'].join(',');
    });
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_UAS_Aplikom_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };
  
  const renderMonitoring = () => (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-slate-800">Live Monitoring</h2>
          <span className="text-sm text-slate-500">{studentList.length} Mahasiswa Aktif</span>
        </div>
        <button onClick={handleExportCSV} disabled={studentList.length === 0} className="w-full sm:w-auto flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          Export to CSV
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
        {studentList.length === 0 ? <p className="p-12 text-center text-slate-500">Belum ada mahasiswa yang memulai ujian.</p> : (
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nama Mahasiswa</th>
                <th scope="col" className="px-6 py-3">Progress</th>
                <th scope="col" className="px-6 py-3 text-center">Warnings</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* FIX: Explicitly type the `student` parameter to resolve type inference issues. */}
              {studentList.map((student: StudentSession) => {
                const progress = totalQuestions > 0 ? (Object.keys(student.answers).length / totalQuestions) * 100 : 0;
                return (
                  <tr key={student.nim} onClick={() => setDetailStudent(student)} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
                    <td className="px-6 py-4 font-semibold text-slate-900">{student.name}<span className="block font-normal text-slate-400">{student.nim}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mr-2"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>
                        <span className="font-medium text-slate-600">{Math.round(progress)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center"><span className={`font-bold ${student.warnings > 0 ? 'text-red-500' : 'text-slate-700'}`}>{student.warnings}</span></td>
                    <td className="px-6 py-4 text-center"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${student.isFinished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{student.isFinished ? 'Selesai' : 'Mengerjakan'}</span></td>
                    <td className="px-6 py-4 text-right"><button onClick={(e) => { e.stopPropagation(); handleDisconnectStudent(student.nim); }} disabled={student.isFinished} className="font-medium text-red-600 hover:text-red-800 disabled:text-slate-400">Disconnect</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
  
  const renderQuestionBank = () => (
     <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-slate-800">Bank Soal</h2>
          <span className="text-sm text-slate-500">{questionBank.length} Soal Tersedia</span>
        </div>
        <button onClick={() => setEditingQuestion({})} className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Tambah Soal Baru
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Teks Pertanyaan</th>
              <th scope="col" className="px-6 py-3 text-center">Jawaban Benar</th>
              <th scope="col" className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {questionBank.sort((a,b) => a.id - b.id).map((q, index) => (
              <tr key={q.id} className="bg-white border-b hover:bg-slate-100">
                <td className="px-6 py-4 font-bold text-slate-700">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-900 max-w-lg truncate">{q.text}</td>
                <td className="px-6 py-4 text-center font-mono font-bold text-green-600">{q.correctAnswer}</td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button onClick={() => setEditingQuestion(q)} className="font-medium text-blue-600 hover:text-blue-800">Edit</button>
                  <button onClick={() => handleDeleteQuestion(q.id)} className="font-medium text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white w-full max-w-6xl mx-auto rounded-3xl shadow-xl border border-slate-200">
        <div className="p-8 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800">Halaman Pengawas Ujian</h1>
          <p className="text-slate-500 mt-1">Gunakan halaman ini untuk mengontrol status ujian dan memonitor mahasiswa secara live.</p>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status Ujian</label>
            <div className={`px-4 py-3 rounded-xl flex items-center justify-center font-bold text-sm ${settings.isExamActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{settings.isExamActive ? 'UJIAN AKTIF' : 'UJIAN TIDAK AKTIF'}</div>
            <button onClick={toggleExamActivation} className={`w-full font-bold py-3 rounded-xl transition-colors text-white ${settings.isExamActive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>{settings.isExamActive ? 'Nonaktifkan Ujian' : 'Aktifkan Ujian'}</button>
          </div>
          <div className="space-y-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Token Ujian Saat Ini</label>
            <div className="relative">
              <div className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-lg text-slate-800 text-center tracking-widest">{settings.token || '---'}</div>
              {settings.token && <button onClick={handleCopyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-200 text-slate-500">{copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" /></svg>}</button>}
            </div>
            <button onClick={generateToken} className="w-full font-bold py-3 rounded-xl transition-colors bg-slate-800 hover:bg-slate-900 text-white">Buat Token Baru</button>
          </div>
        </div>
        
        <div className="border-t border-slate-200">
            <nav className="flex border-b border-slate-200">
                <button onClick={() => setActiveTab('monitoring')} className={`flex-1 py-4 px-2 text-center font-semibold ${activeTab === 'monitoring' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}>Live Monitoring</button>
                <button onClick={() => setActiveTab('bank')} className={`flex-1 py-4 px-2 text-center font-semibold ${activeTab === 'bank' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}>Bank Soal</button>
            </nav>
            <div className="p-8">
                {activeTab === 'monitoring' ? renderMonitoring() : renderQuestionBank()}
            </div>
        </div>

      </div>

      {currentDetailStudentData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Detail Jawaban: {currentDetailStudentData.name}</h2><button onClick={() => setDetailStudent(null)} className="p-2 rounded-full hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="p-6 overflow-y-auto space-y-6">
              {questionBank.map((q, index) => {
                const studentAnswer = currentDetailStudentData.answers[q.id];
                return (
                  <div key={q.id} className="bg-slate-50 p-4 rounded-lg border">
                    <p className="font-semibold text-slate-800 mb-3">#{index + 1}. {q.text}</p>
                    <div className="space-y-2">
                      {q.options.map(option => {
                        let classes = 'border-slate-200';
                        if (currentDetailStudentData.isFinished) {
                          if (studentAnswer === option.key && q.correctAnswer === option.key) classes = 'bg-green-100 border-green-400 font-semibold';
                          else if (studentAnswer === option.key && q.correctAnswer !== option.key) classes = 'bg-red-100 border-red-400 font-semibold';
                          else if (q.correctAnswer === option.key) classes = 'bg-green-100 border-green-300';
                        } else if (studentAnswer === option.key) classes = 'bg-blue-100 border-blue-400 font-semibold';
                        return <div key={option.key} className={`p-2 rounded-md border text-sm flex ${classes}`}><span className="font-bold mr-2">{option.key}.</span><span>{option.text}</span></div>;
                      })}
                    </div>
                    {!studentAnswer && <p className="text-xs text-slate-500 italic mt-2">Belum dijawab</p>}
                  </div>
                );
              })}
            </div>
            <div className="p-6 border-t bg-slate-50/70">
              <h3 className="text-md font-semibold text-slate-700 mb-2">Kirim Pesan</h3>
              {currentDetailStudentData.supervisorMessage && !currentDetailStudentData.supervisorMessage.acknowledged && <div className="mb-2 p-2 bg-yellow-100 text-yellow-800 text-xs rounded-md">Pesan Terakhir: "{currentDetailStudentData.supervisorMessage.text}" (Menunggu konfirmasi)</div>}
              <div className="flex items-center space-x-2"><textarea value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Ketik pesan..." className="w-full p-2 text-sm rounded-lg border" rows={1} /><button onClick={handleSendMessage} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-400" disabled={!messageText.trim()}>Kirim</button></div>
            </div>
          </div>
        </div>
      )}

      {editingQuestion && (
        <QuestionModal 
            question={editingQuestion} 
            onClose={() => setEditingQuestion(null)}
            onSave={handleSaveQuestion}
            existingIds={questionBank.map(q => q.id)}
        />
      )}
    </div>
  );
};

export default Supervisor;