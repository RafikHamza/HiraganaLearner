import { useState } from 'react';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async (character: string, romaji?: string) => {
    setIsPlaying(true);
    
    try {
      // Use Web Speech API for authentic Japanese pronunciation
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(character);
        
        // Try to find Japanese voice
        const voices = speechSynthesis.getVoices();
        const japaneseVoice = voices.find(voice => 
          voice.lang.includes('ja') || voice.lang.includes('jp')
        ) || voices.find(voice => 
          voice.name.toLowerCase().includes('japanese')
        );
        
        if (japaneseVoice) {
          utterance.voice = japaneseVoice;
        }
        
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8; // Slower for learning
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          console.log('Speech synthesis error, falling back to romaji');
          // Fallback to English pronunciation of romaji if available
          if (romaji) {
            const fallbackUtterance = new SpeechSynthesisUtterance(romaji);
            fallbackUtterance.lang = 'en-US';
            fallbackUtterance.rate = 0.7;
            speechSynthesis.speak(fallbackUtterance);
          }
        };
        
        speechSynthesis.speak(utterance);
      } else {
        console.log('Speech synthesis not supported');
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
    }
  };

  const playRomaji = async (romaji: string) => {
    setIsPlaying(true);
    
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(romaji);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Romaji audio playback error:', error);
      setIsPlaying(false);
    }
  };

  return {
    playAudio,
    playRomaji,
    isPlaying,
  };
};
