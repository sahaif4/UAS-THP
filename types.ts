
export interface Question {
  id: number;
  text: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  category?: string;
}

export interface StudentSession {
  name: string;
  nim: string;
  className: string;
  token: string;
  startTime: number;
  answers: Record<number, string>;
  warnings: number;
  isFinished: boolean;
  score?: number;
  supervisorMessage?: {
    text: string;
    timestamp: number;
    acknowledged: boolean;
  };
}

export enum ExamStatus {
  LOGIN = 'LOGIN',
  EXAM = 'EXAM',
  FINISHED = 'FINISHED',
  PENALTY = 'PENALTY'
}

export interface AdminSettings {
  isExamActive: boolean;
  token: string | null;
}
