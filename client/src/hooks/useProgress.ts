import { useState, useEffect } from 'react';
import { LearningProgress } from '../types/learning';

const defaultProgress: LearningProgress = {
  known: [],
  needsStudy: [],
  practiceCount: {},
  lastPracticed: {},
  studyStreak: 0,
  totalSessions: 0,
};

export const useProgress = () => {
  const [progress, setProgress] = useState<LearningProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem('japaneseProgress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
      }
    }
  }, []);

  const saveProgress = (newProgress: LearningProgress) => {
    setProgress(newProgress);
    localStorage.setItem('japaneseProgress', JSON.stringify(newProgress));
  };

  const markCharacterKnown = (character: string) => {
    const newProgress = { ...progress };
    if (!newProgress.known.includes(character)) {
      newProgress.known.push(character);
    }
    // Remove from needsStudy if present
    newProgress.needsStudy = newProgress.needsStudy.filter(char => char !== character);
    
    // Update practice count
    newProgress.practiceCount[character] = (newProgress.practiceCount[character] || 0) + 1;
    newProgress.lastPracticed[character] = new Date().toISOString();
    
    saveProgress(newProgress);
  };

  const markCharacterNeedsStudy = (character: string) => {
    const newProgress = { ...progress };
    if (!newProgress.needsStudy.includes(character)) {
      newProgress.needsStudy.push(character);
    }
    
    // Update practice count
    newProgress.practiceCount[character] = (newProgress.practiceCount[character] || 0) + 1;
    newProgress.lastPracticed[character] = new Date().toISOString();
    
    saveProgress(newProgress);
  };

  const incrementPracticeCount = (character: string) => {
    const newProgress = { ...progress };
    newProgress.practiceCount[character] = (newProgress.practiceCount[character] || 0) + 1;
    newProgress.lastPracticed[character] = new Date().toISOString();
    saveProgress(newProgress);
  };

  const getProgressStats = () => {
    const totalCharacters = 46; // Total Hiragana characters
    const knownCount = progress.known.length;
    const percentage = Math.round((knownCount / totalCharacters) * 100);
    
    return {
      knownCount,
      totalCharacters,
      percentage,
      needsStudyCount: progress.needsStudy.length,
      studyStreak: progress.studyStreak,
      totalSessions: progress.totalSessions,
    };
  };

  return {
    progress,
    markCharacterKnown,
    markCharacterNeedsStudy,
    incrementPracticeCount,
    getProgressStats,
    saveProgress,
  };
};
