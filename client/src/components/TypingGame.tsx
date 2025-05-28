import { useState, useEffect } from 'react';
import { HiraganaCharacter } from '../types/learning';
import { useProgress } from '../hooks/useProgress';

interface TypingGameProps {
  characters: HiraganaCharacter[];
  onShowToast: (message: string) => void;
}

export default function TypingGame({ characters, onShowToast }: TypingGameProps) {
  const [currentCharacter, setCurrentCharacter] = useState<HiraganaCharacter>(characters[0]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const { markCharacterKnown } = useProgress();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, timeLeft]);

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsGameActive(true);
    setGameOver(false);
    setStreak(0);
    setTotalTyped(0);
    setUserInput('');
    setCurrentCharacter(getRandomCharacter());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setUserInput(value);

    if (value === currentCharacter.romaji) {
      // Correct answer
      const points = 10 + (streak * 2); // Bonus points for streaks
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setTotalTyped(prev => prev + 1);
      setUserInput('');
      markCharacterKnown(currentCharacter.char);
      onShowToast(`Correct! +${points} points (${streak + 1} streak)`);
      
      // Auto-advance to next character
      setTimeout(() => {
        setCurrentCharacter(getRandomCharacter());
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.length > 0) {
      // Wrong answer - reset streak
      setStreak(0);
      setTotalTyped(prev => prev + 1);
      setUserInput('');
      setCurrentCharacter(getRandomCharacter());
      onShowToast(`Incorrect! The answer was "${currentCharacter.romaji}"`);
    }
  };

  const accuracy = totalTyped > 0 ? Math.round(((score / 10) / totalTyped) * 100) : 0;
  const wpm = totalTyped > 0 ? Math.round((totalTyped / (60 - timeLeft)) * 60) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Speed Typing Challenge</h3>
        <p className="text-slate-600">Type the romaji as fast as you can!</p>
      </div>

      {!isGameActive && !gameOver && (
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
            <div className="text-6xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Ready to Test Your Speed?</h4>
            <p className="text-slate-600 mb-6">You have 60 seconds to type as many characters as possible!</p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {isGameActive && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-sm text-slate-600">Score</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-emerald-600">{timeLeft}s</div>
              <div className="text-sm text-slate-600">Time Left</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-amber-600">{streak}</div>
              <div className="text-sm text-slate-600">Streak</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-purple-600">{wpm}</div>
              <div className="text-sm text-slate-600">CPM</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
            <div className="text-8xl font-medium text-slate-900 mb-6 font-japanese">
              {currentCharacter.char}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type the romaji..."
              className="w-full max-w-xs mx-auto px-6 py-4 border border-slate-300 rounded-lg text-center text-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
            />
            <div className="mt-4 text-sm text-slate-500">
              Press Enter to skip if you don't know
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Game Over!</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-indigo-600">{score}</div>
                <div className="text-sm text-slate-600">Final Score</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-600">{accuracy}%</div>
                <div className="text-sm text-slate-600">Accuracy</div>
              </div>
            </div>
            <div className="space-y-2 mb-6 text-slate-600">
              <p>Characters typed: {totalTyped}</p>
              <p>Best streak: {streak}</p>
              <p>Characters per minute: {wpm}</p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-4"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}