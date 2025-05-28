import { HiraganaCharacter } from '../types/learning';

export const katakanaCharacters: HiraganaCharacter[] = [
  // Vowels (a, i, u, e, o)
  { char: 'ア', romaji: 'a', mnemonic: 'Axe chopping' },
  { char: 'イ', romaji: 'i', mnemonic: 'Eagle beak' },
  { char: 'ウ', romaji: 'u', mnemonic: 'Unicorn horn' },
  { char: 'エ', romaji: 'e', mnemonic: 'Elevator doors' },
  { char: 'オ', romaji: 'o', mnemonic: 'Opera singer' },
  
  // K row (ka, ki, ku, ke, ko)
  { char: 'カ', romaji: 'ka', mnemonic: 'Cutting knife' },
  { char: 'キ', romaji: 'ki', mnemonic: 'Key with teeth' },
  { char: 'ク', romaji: 'ku', mnemonic: 'Claw mark' },
  { char: 'ケ', romaji: 'ke', mnemonic: 'Ketchup bottle' },
  { char: 'コ', romaji: 'ko', mnemonic: 'Corner angle' },
  
  // S row (sa, shi, su, se, so)
  { char: 'サ', romaji: 'sa', mnemonic: 'Sake cup' },
  { char: 'シ', romaji: 'shi', mnemonic: 'Sheep jumping' },
  { char: 'ス', romaji: 'su', mnemonic: 'Skiing down' },
  { char: 'セ', romaji: 'se', mnemonic: 'Say with mouth' },
  { char: 'ソ', romaji: 'so', mnemonic: 'Sewing zigzag' },
  
  // T row (ta, chi, tsu, te, to)
  { char: 'タ', romaji: 'ta', mnemonic: 'Taxi top sign' },
  { char: 'チ', romaji: 'chi', mnemonic: 'Cheese wedge' },
  { char: 'ツ', romaji: 'tsu', mnemonic: 'Tsunami with dots' },
  { char: 'テ', romaji: 'te', mnemonic: 'Television antenna' },
  { char: 'ト', romaji: 'to', mnemonic: 'Totem pole' },
  
  // N row (na, ni, nu, ne, no)
  { char: 'ナ', romaji: 'na', mnemonic: 'Knife cutting' },
  { char: 'ニ', romaji: 'ni', mnemonic: 'Needle through' },
  { char: 'ヌ', romaji: 'nu', mnemonic: 'Noodle twist' },
  { char: 'ネ', romaji: 'ne', mnemonic: 'Net for catching' },
  { char: 'ノ', romaji: 'no', mnemonic: 'Note diagonal' },
  
  // H row (ha, hi, fu, he, ho)
  { char: 'ハ', romaji: 'ha', mnemonic: 'Hat brim' },
  { char: 'ヒ', romaji: 'hi', mnemonic: 'He is standing' },
  { char: 'フ', romaji: 'fu', mnemonic: 'Roof hook' },
  { char: 'ヘ', romaji: 'he', mnemonic: 'Mountain peak' },
  { char: 'ホ', romaji: 'ho', mnemonic: 'Holy cross' },
  
  // M row (ma, mi, mu, me, mo)
  { char: 'マ', romaji: 'ma', mnemonic: 'Mama bird mouth' },
  { char: 'ミ', romaji: 'mi', mnemonic: 'Missile trails' },
  { char: 'ム', romaji: 'mu', mnemonic: 'Moon crescent' },
  { char: 'メ', romaji: 'me', mnemonic: 'Medicine cross' },
  { char: 'モ', romaji: 'mo', mnemonic: 'More than sign' },
  
  // Y row (ya, yu, yo)
  { char: 'ヤ', romaji: 'ya', mnemonic: 'Yacht mast' },
  { char: 'ユ', romaji: 'yu', mnemonic: 'U-turn sign' },
  { char: 'ヨ', romaji: 'yo', mnemonic: 'Yo-yo on string' },
  
  // R row (ra, ri, ru, re, ro)
  { char: 'ラ', romaji: 'ra', mnemonic: 'Rabbit running' },
  { char: 'リ', romaji: 'ri', mnemonic: 'River reeds' },
  { char: 'ル', romaji: 'ru', mnemonic: 'Route sign' },
  { char: 'レ', romaji: 're', mnemonic: 'Red arrow' },
  { char: 'ロ', romaji: 'ro', mnemonic: 'Robot mouth' },
  
  // W row (wa, wo) and N
  { char: 'ワ', romaji: 'wa', mnemonic: 'Wine glass' },
  { char: 'ヲ', romaji: 'wo', mnemonic: 'Woman dancing' },
  { char: 'ン', romaji: 'n', mnemonic: 'Nap sitting' },
];

export const getKatakanaByRomaji = (romaji: string): HiraganaCharacter | undefined => {
  return katakanaCharacters.find(char => char.romaji === romaji);
};

export const getKatakanaByChar = (char: string): HiraganaCharacter | undefined => {
  return katakanaCharacters.find(character => character.char === char);
};