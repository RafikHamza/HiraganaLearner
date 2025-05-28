import { useState, useEffect } from 'react';
import { HiraganaCharacter } from '../types/learning';
import { GameCard } from '../types/learning';

interface MemoryGameProps {
  characters: HiraganaCharacter[];
  onShowToast: (message: string) => void;
}

export default function MemoryGame({ characters, onShowToast }: MemoryGameProps) {
  const [gameCards, setGameCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Initialize game with first 8 characters
  useEffect(() => {
    initializeGame();
  }, [characters]);

  const initializeGame = () => {
    const gameCharacters = characters.slice(0, 8);
    const cards: GameCard[] = [];

    // Create character cards
    gameCharacters.forEach((char, index) => {
      cards.push({
        id: `char-${index}`,
        type: 'character',
        value: char.char,
        matched: false,
        selected: false,
      });
      
      // Create romaji cards
      cards.push({
        id: `romaji-${index}`,
        type: 'romaji',
        value: char.romaji,
        matched: false,
        selected: false,
      });
    });

    // Shuffle cards
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setSelectedCards([]);
    setScore(0);
  };

  const handleCardClick = (clickedCard: GameCard) => {
    if (isChecking || clickedCard.matched || clickedCard.selected || selectedCards.length >= 2) {
      return;
    }

    const updatedCards = gameCards.map(card =>
      card.id === clickedCard.id ? { ...card, selected: true } : card
    );
    setGameCards(updatedCards);
    
    const newSelectedCards = [...selectedCards, { ...clickedCard, selected: true }];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setIsChecking(true);
      setTimeout(() => checkMatch(newSelectedCards), 600);
    }
  };

  const checkMatch = (cards: GameCard[]) => {
    const [card1, card2] = cards;
    
    // Find the corresponding character for matching
    const isMatch = characters.some(char => 
      (char.char === card1.value && char.romaji === card2.value) ||
      (char.char === card2.value && char.romaji === card1.value)
    );

    if (isMatch) {
      // Match found
      const updatedCards = gameCards.map(card => {
        if (card.id === card1.id || card.id === card2.id) {
          return { ...card, matched: true, selected: false };
        }
        return { ...card, selected: false };
      });
      setGameCards(updatedCards);
      setScore(prev => prev + 10);
      onShowToast('Great match! +10 points');
      
      // Check if game is complete
      const allMatched = updatedCards.every(card => card.matched);
      if (allMatched) {
        setTimeout(() => onShowToast('Congratulations! Game completed!'), 500);
      }
    } else {
      // No match - add shake animation and reset
      const updatedCards = gameCards.map(card => {
        if (card.id === card1.id || card.id === card2.id) {
          return { ...card, selected: false };
        }
        return card;
      });
      setGameCards(updatedCards);
      
      // Trigger shake animation
      setTimeout(() => {
        onShowToast('Try again!');
      }, 300);
    }

    setSelectedCards([]);
    setIsChecking(false);
  };

  const resetGame = () => {
    initializeGame();
    onShowToast('Game reset!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Memory Matching Game</h3>
          <p className="text-sm text-slate-600">Match Hiragana characters with their Romaji pronunciation</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{score}</div>
          <div className="text-sm text-slate-600">Score</div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6">
        {gameCards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`game-card rounded-lg shadow-sm border h-20 flex items-center justify-center transition-all duration-300 ${
              card.matched
                ? 'border-emerald-400 bg-emerald-200 opacity-60 cursor-default transform scale-95'
                : card.selected
                ? 'border-indigo-300 bg-indigo-100 cursor-pointer'
                : 'bg-white border-slate-200 hover:shadow-md cursor-pointer'
            } ${isChecking && card.selected ? 'animate-pulse' : ''}`}
          >
            <div className={`card-content transition-all duration-300 ${
              card.matched 
                ? 'text-emerald-700 opacity-70'
                : card.type === 'character'
                ? 'text-2xl font-medium text-slate-900 font-japanese'
                : 'text-lg font-semibold text-indigo-600'
            }`}>
              {card.matched ? '✓' : card.value}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          <i className="fas fa-redo mr-2"></i> Reset Game
        </button>
      </div>
    </div>
  );
}
