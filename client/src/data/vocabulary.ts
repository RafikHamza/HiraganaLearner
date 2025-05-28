export interface VocabularyWord {
  id: string;
  japanese: string;
  hiragana: string;
  romaji: string;
  english: string;
  category: string;
  audioUrl?: string;
}

export const vocabularyWords: VocabularyWord[] = [
  // Greetings
  {
    id: 'greeting-1',
    japanese: 'おはよう',
    hiragana: 'おはよう',
    romaji: 'ohayou',
    english: 'good morning (informal)',
    category: 'greetings'
  },
  {
    id: 'greeting-2',
    japanese: 'こんにちは',
    hiragana: 'こんにちは',
    romaji: 'konnichiwa',
    english: 'hello/good afternoon',
    category: 'greetings'
  },
  {
    id: 'greeting-3',
    japanese: 'こんばんは',
    hiragana: 'こんばんは',
    romaji: 'konbanwa',
    english: 'good evening',
    category: 'greetings'
  },
  {
    id: 'greeting-4',
    japanese: 'さようなら',
    hiragana: 'さようなら',
    romaji: 'sayounara',
    english: 'goodbye',
    category: 'greetings'
  },
  {
    id: 'greeting-5',
    japanese: 'ありがとう',
    hiragana: 'ありがとう',
    romaji: 'arigatou',
    english: 'thank you',
    category: 'greetings'
  },

  // Family
  {
    id: 'family-1',
    japanese: 'おかあさん',
    hiragana: 'おかあさん',
    romaji: 'okaasan',
    english: 'mother',
    category: 'family'
  },
  {
    id: 'family-2',
    japanese: 'おとうさん',
    hiragana: 'おとうさん',
    romaji: 'otousan',
    english: 'father',
    category: 'family'
  },
  {
    id: 'family-3',
    japanese: 'おにいさん',
    hiragana: 'おにいさん',
    romaji: 'oniisan',
    english: 'older brother',
    category: 'family'
  },
  {
    id: 'family-4',
    japanese: 'おねえさん',
    hiragana: 'おねえさん',
    romaji: 'oneesan',
    english: 'older sister',
    category: 'family'
  },

  // Food
  {
    id: 'food-1',
    japanese: 'すし',
    hiragana: 'すし',
    romaji: 'sushi',
    english: 'sushi',
    category: 'food'
  },
  {
    id: 'food-2',
    japanese: 'みず',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'water',
    category: 'food'
  },
  {
    id: 'food-3',
    japanese: 'おちゃ',
    hiragana: 'おちゃ',
    romaji: 'ocha',
    english: 'tea',
    category: 'food'
  },
  {
    id: 'food-4',
    japanese: 'ごはん',
    hiragana: 'ごはん',
    romaji: 'gohan',
    english: 'rice/meal',
    category: 'food'
  },

  // Basic Words
  {
    id: 'basic-1',
    japanese: 'ねこ',
    hiragana: 'ねこ',
    romaji: 'neko',
    english: 'cat',
    category: 'animals'
  },
  {
    id: 'basic-2',
    japanese: 'いぬ',
    hiragana: 'いぬ',
    romaji: 'inu',
    english: 'dog',
    category: 'animals'
  },
  {
    id: 'basic-3',
    japanese: 'ほん',
    hiragana: 'ほん',
    romaji: 'hon',
    english: 'book',
    category: 'objects'
  },
  {
    id: 'basic-4',
    japanese: 'がっこう',
    hiragana: 'がっこう',
    romaji: 'gakkou',
    english: 'school',
    category: 'places'
  },
  {
    id: 'basic-5',
    japanese: 'いえ',
    hiragana: 'いえ',
    romaji: 'ie',
    english: 'house',
    category: 'places'
  }
];

export const getVocabularyByCategory = (category: string): VocabularyWord[] => {
  return vocabularyWords.filter(word => word.category === category);
};

export const getVocabularyCategories = (): string[] => {
  const categories = vocabularyWords.map(word => word.category);
  return Array.from(new Set(categories));
};