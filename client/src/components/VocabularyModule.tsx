import { useState } from 'react';
import { vocabularyWords, getVocabularyCategories, getVocabularyByCategory, VocabularyWord } from '../data/vocabulary';
import { useAudio } from '../hooks/useAudio';

interface VocabularyModuleProps {
  onShowToast: (message: string) => void;
}

export default function VocabularyModule({ onShowToast }: VocabularyModuleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentMode, setCurrentMode] = useState<'browse' | 'quiz'>('browse');
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { playAudio } = useAudio();

  const categories = getVocabularyCategories();
  const displayWords = selectedCategory === 'all' 
    ? vocabularyWords 
    : getVocabularyByCategory(selectedCategory);

  const currentQuizWord = displayWords[quizIndex];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setQuizIndex(0);
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const handleModeChange = (mode: 'browse' | 'quiz') => {
    setCurrentMode(mode);
    setQuizIndex(0);
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const handlePlayAudio = (word: VocabularyWord) => {
    playAudio(word.japanese);
    onShowToast('Audio playback feature coming soon!');
  };

  const handleQuizSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === currentQuizWord.english.toLowerCase();
    setIsCorrect(correct);
    setShowAnswer(true);
    
    if (correct) {
      onShowToast('Correct! Well done!');
    } else {
      onShowToast(`Incorrect. The answer is "${currentQuizWord.english}"`);
    }
  };

  const handleNextQuiz = () => {
    setShowAnswer(false);
    setIsCorrect(null);
    setUserAnswer('');
    setQuizIndex((prev) => (prev + 1) % displayWords.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showAnswer && userAnswer.trim()) {
      handleQuizSubmit();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Japanese Vocabulary</h2>
        
        {/* Mode Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => handleModeChange('browse')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              currentMode === 'browse'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <i className="fas fa-book-open"></i>
            <span>Browse Words</span>
          </button>
          <button
            onClick={() => handleModeChange('quiz')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              currentMode === 'quiz'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <i className="fas fa-question-circle"></i>
            <span>Quiz Mode</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All Words
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {currentMode === 'browse' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayWords.map((word) => (
            <div
              key={word.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-center mb-4">
                <div className="text-3xl font-medium text-slate-900 mb-2 font-japanese">
                  {word.japanese}
                </div>
                <div className="text-lg text-slate-600 mb-1">
                  {word.romaji}
                </div>
                <div className="text-base font-semibold text-emerald-600">
                  {word.english}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full capitalize">
                  {word.category}
                </span>
                <button
                  onClick={() => handlePlayAudio(word)}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="mb-6 text-center">
            <div className="text-sm text-slate-600 mb-2">
              Word {quizIndex + 1} of {displayWords.length}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((quizIndex + 1) / displayWords.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center mb-6">
            <div className="text-4xl font-medium text-slate-900 mb-4 font-japanese">
              {currentQuizWord.japanese}
            </div>
            <div className="text-lg text-slate-600 mb-6">
              {currentQuizWord.romaji}
            </div>
            
            {!showAnswer ? (
              <div className="space-y-4">
                <div className="text-sm text-slate-600 mb-4">
                  What does this mean in English?
                </div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter English meaning..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={handleQuizSubmit}
                  disabled={!userAnswer.trim()}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  Check Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </div>
                <div className="text-xl font-semibold text-emerald-600 mb-2">
                  {currentQuizWord.english}
                </div>
                <div className="text-sm text-slate-600 mb-4">
                  Category: {currentQuizWord.category}
                </div>
                <button 
                  onClick={() => handlePlayAudio(currentQuizWord)}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors mb-4"
                >
                  <i className="fas fa-volume-up mr-1"></i> Play Sound
                </button>
              </div>
            )}
          </div>
          
          {showAnswer && (
            <div className="text-center">
              <button
                onClick={handleNextQuiz}
                className="px-8 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Next Word
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}