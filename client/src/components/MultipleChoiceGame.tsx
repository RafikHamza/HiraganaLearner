import { useState, useEffect } from 'react';
import { HiraganaCharacter } from '../types/learning';
import { useProgress } from '../hooks/useProgress';

interface MultipleChoiceGameProps {
  characters: HiraganaCharacter[];
  onShowToast: (message: string) => void;
}

export default function MultipleChoiceGame({ characters, onShowToast }: MultipleChoiceGameProps) {
  const [questionQueue, setQuestionQueue] = useState<HiraganaCharacter[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameMode, setGameMode] = useState<'char-to-romaji' | 'romaji-to-char'>('char-to-romaji');
  const [gameComplete, setGameComplete] = useState(false);
  const [mistakeQueue, setMistakeQueue] = useState<HiraganaCharacter[]>([]);
  const { markCharacterKnown, markCharacterNeedsStudy } = useProgress();

  // Initialize randomized question queue
  const initializeQuestionQueue = () => {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    setQuestionQueue(shuffled);
    setCurrentQuestionIndex(0);
    setMistakeQueue([]);
  };

  // Initialize on component mount and mode change
  useEffect(() => {
    initializeQuestionQueue();
  }, [characters]);

  const currentCharacter = questionQueue[currentQuestionIndex];

  const generateQuestion = () => {
    if (!currentCharacter) return { correct: characters[0], options: characters.slice(0, 4) };
    
    const wrongOptions = characters
      .filter(char => char.romaji !== currentCharacter.romaji)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [currentCharacter, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    return {
      correct: currentCharacter,
      options: allOptions
    };
  };

  const { correct, options } = generateQuestion();

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = gameMode === 'char-to-romaji' 
      ? answer === correct.romaji 
      : answer === correct.char;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      markCharacterKnown(correct.char);
      onShowToast('Correct! Well done!');
    } else {
      markCharacterNeedsStudy(correct.char);
      // Add to mistake queue for repeat practice (appears twice more)
      setMistakeQueue(prev => [...prev, currentCharacter, currentCharacter]);
      onShowToast(`Incorrect. The answer was "${gameMode === 'char-to-romaji' ? correct.romaji : correct.char}"`);
    }
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex >= questionQueue.length) {
      // If we have mistakes to practice, add them to the queue
      if (mistakeQueue.length > 0) {
        const newQueue = [...mistakeQueue].sort(() => Math.random() - 0.5);
        setQuestionQueue(newQueue);
        setCurrentQuestionIndex(0);
        setMistakeQueue([]);
        onShowToast(`Practicing ${newQueue.length} characters you missed...`);
      } else {
        setGameComplete(true);
      }
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
    
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetGame = () => {
    initializeQuestionQueue();
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
  };

  const switchMode = (mode: 'char-to-romaji' | 'romaji-to-char') => {
    setGameMode(mode);
    resetGame();
  };

  if (gameComplete) {
    const percentage = Math.round((score / (characters.length * 10)) * 100);
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-6xl mb-4">🎯</div>
          <h4 className="text-2xl font-bold text-slate-900 mb-4">Quiz Complete!</h4>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-indigo-600">{score}</div>
              <div className="text-sm text-slate-600">Total Score</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-emerald-600">{percentage}%</div>
              <div className="text-sm text-slate-600">Accuracy</div>
            </div>
          </div>
          <div className="space-y-2 mb-6 text-slate-600">
            <p>Questions answered: {characters.length}</p>
            <p>Correct answers: {score / 10}</p>
          </div>
          <div className="space-x-4">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={() => switchMode(gameMode === 'char-to-romaji' ? 'romaji-to-char' : 'char-to-romaji')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Switch Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Multiple Choice Quiz</h3>
        <p className="text-slate-600">Choose the correct answer from the options below</p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => switchMode('char-to-romaji')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            gameMode === 'char-to-romaji'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          Character → Romaji
        </button>
        <button
          onClick={() => switchMode('romaji-to-char')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            gameMode === 'romaji-to-char'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          Romaji → Character
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questionQueue.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questionQueue.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
        <div className="text-center mb-8">
          <div className="text-sm text-slate-600 mb-4">
            {gameMode === 'char-to-romaji' ? 'What is the romaji for this character?' : 'Which character represents this romaji?'}
          </div>
          <div className="text-6xl font-medium text-slate-900 mb-4 font-japanese">
            {gameMode === 'char-to-romaji' ? correct.char : correct.romaji}
          </div>
          {gameMode === 'char-to-romaji' && (
            <div className="text-sm text-slate-500">{correct.mnemonic}</div>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => {
            const optionValue = gameMode === 'char-to-romaji' ? option.romaji : option.char;
            const isSelected = selectedAnswer === optionValue;
            const isCorrect = showResult && optionValue === (gameMode === 'char-to-romaji' ? correct.romaji : correct.char);
            const isWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(optionValue)}
                disabled={showResult}
                className={`p-6 rounded-xl border-2 transition-all font-medium ${
                  isCorrect
                    ? 'border-emerald-400 bg-emerald-100 text-emerald-800'
                    : isWrong
                    ? 'border-red-400 bg-red-100 text-red-800'
                    : isSelected
                    ? 'border-indigo-400 bg-indigo-100 text-indigo-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className={`text-2xl mb-2 ${gameMode === 'romaji-to-char' ? 'font-japanese' : ''}`}>
                  {optionValue}
                </div>
                {showResult && isCorrect && (
                  <div className="text-sm text-emerald-600">✓ Correct</div>
                )}
                {showResult && isWrong && (
                  <div className="text-sm text-red-600">✗ Wrong</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentQuestionIndex + 1 >= characters.length ? 'View Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}