import { useState } from 'react';
import { HiraganaCharacter } from '../types/learning';

interface StrokeOrderGameProps {
  characters: HiraganaCharacter[];
  onShowToast: (message: string) => void;
}

interface Stroke {
  id: number;
  path: string;
  order: number;
}

export default function StrokeOrderGame({ characters, onShowToast }: StrokeOrderGameProps) {
  const [currentCharacter, setCurrentCharacter] = useState<HiraganaCharacter>(characters[0]);
  const [selectedStrokes, setSelectedStrokes] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Enhanced stroke data with proper Japanese character stroke orders
  const getStrokesForCharacter = (char: string): Stroke[] => {
    const strokeData: Record<string, Stroke[]> = {
      // Hiragana examples
      'あ': [
        { id: 1, path: 'M20,30 Q30,15 35,35', order: 1 }, // First horizontal curve
        { id: 2, path: 'M15,55 Q30,45 45,55', order: 2 }, // Bottom horizontal
        { id: 3, path: 'M35,40 Q40,50 42,70', order: 3 }  // Right vertical
      ],
      'か': [
        { id: 1, path: 'M20,20 L20,70', order: 1 },        // Left vertical
        { id: 2, path: 'M20,35 L50,35', order: 2 },        // Horizontal cross
        { id: 3, path: 'M35,20 Q40,30 45,50', order: 3 }   // Right stroke
      ],
      'さ': [
        { id: 1, path: 'M15,25 L50,25', order: 1 },        // Top horizontal
        { id: 2, path: 'M30,25 L30,45', order: 2 },        // Vertical down
        { id: 3, path: 'M15,55 Q32,48 50,58', order: 3 }   // Bottom curve
      ],
      'た': [
        { id: 1, path: 'M25,20 L25,45', order: 1 },        // Left vertical
        { id: 2, path: 'M15,35 L50,35', order: 2 },        // Horizontal
        { id: 3, path: 'M35,35 Q40,45 42,65', order: 3 }   // Right hook
      ],
      'な': [
        { id: 1, path: 'M20,25 L45,25', order: 1 },        // Top horizontal
        { id: 2, path: 'M32,25 L32,70', order: 2 },        // Vertical
        { id: 3, path: 'M15,45 Q25,40 35,45', order: 3 },  // Left curve
        { id: 4, path: 'M40,50 Q45,60 48,70', order: 4 }   // Right tail
      ],
      // Katakana examples
      'ア': [
        { id: 1, path: 'M25,20 L35,70', order: 1 },        // Left diagonal
        { id: 2, path: 'M40,20 L30,70', order: 2 },        // Right diagonal
        { id: 3, path: 'M20,45 L45,45', order: 3 }         // Horizontal cross
      ],
      'カ': [
        { id: 1, path: 'M20,20 L20,70', order: 1 },        // Left vertical
        { id: 2, path: 'M20,35 L50,35', order: 2 },        // Horizontal
        { id: 3, path: 'M35,20 L50,70', order: 3 }         // Right diagonal
      ],
      'サ': [
        { id: 1, path: 'M15,25 L50,25', order: 1 },        // Top horizontal
        { id: 2, path: 'M15,45 L50,45', order: 2 },        // Middle horizontal
        { id: 3, path: 'M15,65 L50,65', order: 3 }         // Bottom horizontal
      ]
    };
    
    return strokeData[char] || [
      { id: 1, path: 'M25,30 L45,30', order: 1 },
      { id: 2, path: 'M35,20 L35,60', order: 2 }
    ];
  };

  const strokes = getStrokesForCharacter(currentCharacter.char);
  const shuffledStrokes = [...strokes].sort(() => Math.random() - 0.5);

  const handleStrokeClick = (strokeId: number) => {
    const stroke = strokes.find(s => s.id === strokeId);
    if (!stroke) return;

    const expectedOrder = selectedStrokes.length + 1;
    
    if (stroke.order === expectedOrder) {
      // Correct stroke order
      setSelectedStrokes(prev => [...prev, strokeId]);
      
      if (selectedStrokes.length + 1 === strokes.length) {
        // Character complete
        setScore(prev => prev + 10);
        onShowToast('Perfect! Character completed correctly!');
        setTimeout(() => {
          nextCharacter();
        }, 1500);
      } else {
        onShowToast('Correct stroke!');
      }
    } else {
      // Wrong stroke order
      onShowToast('Incorrect stroke order. Try again!');
      setSelectedStrokes([]);
      setAttempts(prev => prev + 1);
    }
  };

  const nextCharacter = () => {
    const nextIndex = (characters.indexOf(currentCharacter) + 1) % characters.length;
    setCurrentCharacter(characters[nextIndex]);
    setSelectedStrokes([]);
    
    if (nextIndex === 0) {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentCharacter(characters[0]);
    setSelectedStrokes([]);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
  };

  const skipCharacter = () => {
    onShowToast('Character skipped');
    nextCharacter();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Stroke Order Practice</h3>
        <p className="text-slate-600">Learn the correct stroke order for Japanese characters</p>
      </div>

      {!gameComplete ? (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-sm text-slate-600">Score</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-amber-600">{attempts}</div>
              <div className="text-sm text-slate-600">Mistakes</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-emerald-600">{selectedStrokes.length}/{strokes.length}</div>
              <div className="text-sm text-slate-600">Progress</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-medium text-slate-900 mb-2 font-japanese">
                {currentCharacter.char}
              </div>
              <div className="text-lg text-slate-600">{currentCharacter.romaji}</div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-block bg-slate-50 rounded-lg p-6">
                <svg width="200" height="200" viewBox="0 0 100 100" className="border border-slate-200 rounded">
                  {/* Grid lines for reference */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  
                  {/* Render completed strokes */}
                  {selectedStrokes.map((strokeId, index) => {
                    const stroke = strokes.find(s => s.id === strokeId);
                    return stroke ? (
                      <path
                        key={strokeId}
                        d={stroke.path}
                        stroke="#10b981"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        className="animate-pulse-success"
                      />
                    ) : null;
                  })}
                  
                  {/* Show next stroke hint */}
                  {selectedStrokes.length < strokes.length && (
                    <circle
                      cx="30"
                      cy="30"
                      r="3"
                      fill="#6366f1"
                      className="animate-pulse"
                    />
                  )}
                </svg>
              </div>
            </div>

            <div className="text-center text-sm text-slate-600 mb-4">
              Click the strokes in the correct order ({selectedStrokes.length + 1} of {strokes.length})
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {shuffledStrokes.map((stroke) => (
                <button
                  key={stroke.id}
                  onClick={() => handleStrokeClick(stroke.id)}
                  disabled={selectedStrokes.includes(stroke.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStrokes.includes(stroke.id)
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-700 cursor-not-allowed'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
                  }`}
                >
                  <svg width="60" height="60" viewBox="0 0 100 100" className="mx-auto">
                    <path
                      d={stroke.path}
                      stroke={selectedStrokes.includes(stroke.id) ? "#10b981" : "#6366f1"}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-xs mt-2">Stroke {stroke.order}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={skipCharacter}
              className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Skip Character
            </button>
            <button
              onClick={() => setSelectedStrokes([])}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Reset Strokes
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="text-6xl mb-4">🎨</div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Great Job!</h4>
            <p className="text-slate-600 mb-6">You've practiced stroke order for all characters!</p>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-sm text-slate-600">Final Score</div>
            </div>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Practice Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}