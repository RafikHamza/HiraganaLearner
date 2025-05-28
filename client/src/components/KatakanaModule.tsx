import { useState } from 'react';
import { LearningMode } from '../types/learning';
import { katakanaCharacters } from '../data/katakana';
import CharacterChart from './CharacterChart';
import Flashcards from './Flashcards';
import MemoryGame from './MemoryGame';
import TypingGame from './TypingGame';
import StrokeOrderGame from './StrokeOrderGame';
import MultipleChoiceGame from './MultipleChoiceGame';

interface KatakanaModuleProps {
  onShowToast: (message: string) => void;
}

export default function KatakanaModule({ onShowToast }: KatakanaModuleProps) {
  const [currentMode, setCurrentMode] = useState<LearningMode>('chart');

  const modes = [
    { id: 'chart' as LearningMode, label: 'Character Chart', icon: 'fas fa-table' },
    { id: 'flashcard' as LearningMode, label: 'Flashcards', icon: 'fas fa-clone' },
    { id: 'memory' as LearningMode, label: 'Memory Game', icon: 'fas fa-gamepad' },
    { id: 'typing' as LearningMode, label: 'Speed Typing', icon: 'fas fa-keyboard' },
    { id: 'stroke' as LearningMode, label: 'Stroke Order', icon: 'fas fa-edit' },
    { id: 'quiz' as LearningMode, label: 'Multiple Choice', icon: 'fas fa-question-circle' },
  ];

  const handleModeChange = (mode: LearningMode) => {
    setCurrentMode(mode);
  };

  return (
    <div>
      {/* Learning Mode Selector */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Master Katakana Characters</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                currentMode === mode.id
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <i className={mode.icon}></i>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Learning Views */}
      {currentMode === 'chart' && (
        <CharacterChart 
          characters={katakanaCharacters} 
          onShowToast={onShowToast}
        />
      )}
      
      {currentMode === 'flashcard' && (
        <Flashcards 
          characters={katakanaCharacters} 
          onShowToast={onShowToast}
        />
      )}
      
      {currentMode === 'memory' && (
        <MemoryGame 
          characters={katakanaCharacters} 
          onShowToast={onShowToast}
        />
      )}
      
      {currentMode === 'typing' && (
        <TypingGame 
          characters={katakanaCharacters} 
          onShowToast={onShowToast}
        />
      )}
      
      {currentMode === 'stroke' && (
        <StrokeOrderGame 
          characters={katakanaCharacters} 
          onShowToast={onShowToast}
        />
      )}
      
      {currentMode === 'quiz' && (
        <MultipleChoiceGame 
          characters={katakanaCharacters} 
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
}