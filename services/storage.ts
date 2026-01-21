
import { StudentSession, AdminSettings, Question } from '../types';
import { DEFAULT_EXAM_QUESTIONS } from '../questions';

const ACTIVE_SESSIONS_KEY = 'uas_aplikom_active_sessions';
const ADMIN_STORAGE_KEY = 'uas_aplikom_admin_settings';
const CURRENT_STUDENT_NIM_KEY = 'uas_aplikom_current_nim';
const QUESTION_BANK_KEY = 'uas_aplikom_question_bank';

// --- Question Bank Management ---

export const getQuestionBank = (): Question[] => {
  const data = localStorage.getItem(QUESTION_BANK_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    // If no bank exists, seed it with the default questions
    saveQuestionBank(DEFAULT_EXAM_QUESTIONS);
    return DEFAULT_EXAM_QUESTIONS;
  }
};

export const saveQuestionBank = (questions: Question[]) => {
  localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(questions));
};


// --- Multi-Session Management for Supervisor ---

export const getActiveSessions = (): Record<string, StudentSession> => {
  const data = localStorage.getItem(ACTIVE_SESSIONS_KEY);
  return data ? JSON.parse(data) : {};
};

const saveActiveSessions = (sessions: Record<string, StudentSession>) => {
  localStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(sessions));
};

export const removeStudentSession = (nim: string) => {
  const sessions = getActiveSessions();
  delete sessions[nim];
  saveActiveSessions(sessions);
};


// --- Single Session Management for Student ---

export const saveSession = (session: StudentSession) => {
  const sessions = getActiveSessions();
  sessions[session.nim] = session;
  saveActiveSessions(sessions);
};

export const getSession = (nim: string): StudentSession | null => {
  const sessions = getActiveSessions();
  return sessions[nim] || null;
};

export const clearSession = (nim: string) => {
  removeStudentSession(nim);
  clearCurrentStudentNIM();
};


// --- Current User Tracking for Session Recovery ---

export const setCurrentStudentNIM = (nim: string) => {
  localStorage.setItem(CURRENT_STUDENT_NIM_KEY, nim);
};

export const getCurrentStudentNIM = (): string | null => {
  return localStorage.getItem(CURRENT_STUDENT_NIM_KEY);
};

export const clearCurrentStudentNIM = () => {
  localStorage.removeItem(CURRENT_STUDENT_NIM_KEY);
};


// --- Admin Settings Management ---

export const saveAdminSettings = (settings: AdminSettings) => {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(settings));
};

export const getAdminSettings = (): AdminSettings | null => {
  const data = localStorage.getItem(ADMIN_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};
