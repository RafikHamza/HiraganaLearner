import { useState } from 'react';
import { HiraganaCharacter } from '../types/learning';
import { useProgress } from '../hooks/useProgress';
import { useAudio } from '../hooks/useAudio';

interface CharacterChartProps {
  characters: HiraganaCharacter[];
  onShowToast: (message: string) => void;
}

export default function CharacterChart({ characters, onShowToast }: CharacterChartProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<HiraganaCharacter | null>(null);
  const { progress, markCharacterKnown } = useProgress();
  const { playAudio } = useAudio();

  const handleCharacterClick = (character: HiraganaCharacter) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const handlePlayAudio = (character: string, romaji: string) => {
    playAudio(character, romaji);
    onShowToast('Playing pronunciation...');
  };

  const handleMarkLearned = (character: string) => {
    markCharacterKnown(character);
    onShowToast('Character marked as learned!');
    setSelectedCharacter(null);
  };

  return (
    <>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {characters.map((character) => (
          <div
            key={character.char}
            onClick={() => handleCharacterClick(character)}
            className={`character-card group bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300 ${
              progress.known.includes(character.char)
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-200'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-medium text-slate-900 mb-2 font-japanese">
                {character.char}
              </div>
              <div className="text-sm font-medium text-slate-600 mb-1">
                {character.romaji}
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(character.char, character.romaji);
                  }}
                  className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                >
                  <i className="fas fa-volume-up text-xs"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkLearned(character.char);
                  }}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                >
                  <i className="fas fa-check text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Character Details Modal */}
      {selectedCharacter && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl font-medium text-slate-900 mb-2 font-japanese">
                {selectedCharacter.char}
              </div>
              <div className="text-xl font-semibold text-slate-700 mb-1">
                {selectedCharacter.romaji}
              </div>
              <div className="text-sm text-slate-600">
                Remember: {selectedCharacter.mnemonic}
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handlePlayAudio(selectedCharacter.char, selectedCharacter.romaji)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <i className="fas fa-volume-up"></i>
                <span>Play Pronunciation</span>
              </button>
              
              <button
                onClick={() => handleMarkLearned(selectedCharacter.char)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <i className="fas fa-check"></i>
                <span>Mark as Learned</span>
              </button>
              
              <button
                onClick={handleCloseModal}
                className="w-full px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
