import { useState } from 'react';
import { HiraganaCharacter } from '../types/learning';
import { useProgress } from '../hooks/useProgress';
import { useAudio } from '../hooks/useAudio';

interface FlashcardsProps {
  characters: HiraganaCharacter[];
  onShowToast: (message: string) => void;
}

export default function Flashcards({ characters, onShowToast }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { markCharacterKnown, markCharacterNeedsStudy } = useProgress();
  const { playAudio } = useAudio();

  const currentCharacter = characters[currentIndex];
  const progress = ((currentIndex + 1) / characters.length) * 100;

  const handleSubmit = () => {
    const correct = userInput.toLowerCase().trim() === currentCharacter.romaji.toLowerCase();
    setIsCorrect(correct);
    setShowAnswer(true);
    
    if (correct) {
      onShowToast('Correct! Well done!');
    } else {
      onShowToast(`Incorrect. The answer is "${currentCharacter.romaji}"`);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setIsCorrect(null);
    setUserInput('');
    
    // Auto-advance after correct answer
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
    }, isCorrect ? 800 : 0);
  };

  const handleKnown = () => {
    markCharacterKnown(currentCharacter.char);
    onShowToast('Character learned!');
    handleNext();
  };

  const handleNeedsStudy = () => {
    markCharacterNeedsStudy(currentCharacter.char);
    onShowToast('Added to study list');
    handleNext();
  };

  const handlePlayAudio = () => {
    playAudio(currentCharacter.char);
    onShowToast('Audio playback feature coming soon!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showAnswer && userInput.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="text-sm text-slate-600 mb-2">
          Card {currentIndex + 1} of {characters.length}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center mb-6">
        <div className="text-7xl font-medium text-slate-900 mb-6 font-japanese">
          {currentCharacter.char}
        </div>
        
        {!showAnswer ? (
          <div className="space-y-4">
            <div className="text-sm text-slate-600 mb-4">
              Type the romaji pronunciation:
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter romaji..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Check Answer
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <div className="text-xl font-semibold text-indigo-600 mb-2">
              {currentCharacter.romaji}
            </div>
            <div className="text-sm text-slate-600 mb-4">
              {currentCharacter.mnemonic}
            </div>
            <button 
              onClick={handlePlayAudio}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200 transition-colors mb-4"
            >
              <i className="fas fa-volume-up mr-1"></i> Play Sound
            </button>
          </div>
        )}
      </div>
      
      {showAnswer && (
        <div className="flex justify-center space-x-4 mb-4">
          <button 
            onClick={handleKnown}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-check"></i>
            <span>I Know This</span>
          </button>
          <button 
            onClick={handleNeedsStudy}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-redo"></i>
            <span>Study More</span>
          </button>
        </div>
      )}
      
      <div className="text-center">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Next Character
        </button>
      </div>
    </div>
  );
}
