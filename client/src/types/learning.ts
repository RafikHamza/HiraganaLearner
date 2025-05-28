export interface HiraganaCharacter {
  char: string;
  romaji: string;
  mnemonic: string;
  strokeOrder?: string[];
  audioUrl?: string;
}

export interface LearningProgress {
  known: string[];
  needsStudy: string[];
  practiceCount: Record<string, number>;
  lastPracticed: Record<string, string>;
  studyStreak: number;
  totalSessions: number;
}

export interface GameCard {
  id: string;
  type: 'character' | 'romaji';
  value: string;
  matched: boolean;
  selected: boolean;
}

export type LearningMode = 'chart' | 'flashcard' | 'memory' | 'typing' | 'stroke' | 'quiz';
export type TabType = 'hiragana' | 'katakana' | 'vocabulary' | 'progress';
