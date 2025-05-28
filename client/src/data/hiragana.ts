import { HiraganaCharacter } from '../types/learning';

export const hiraganaCharacters: HiraganaCharacter[] = [
  // Vowels (a, i, u, e, o)
  { char: 'あ', romaji: 'a', mnemonic: 'A temple gate' },
  { char: 'い', romaji: 'i', mnemonic: 'An eel swimming' },
  { char: 'う', romaji: 'u', mnemonic: 'An upside-down hook' },
  { char: 'え', romaji: 'e', mnemonic: 'Elephant trunk' },
  { char: 'お', romaji: 'o', mnemonic: 'Octopus tentacles' },
  
  // K row (ka, ki, ku, ke, ko)
  { char: 'か', romaji: 'ka', mnemonic: 'Katana blade' },
  { char: 'き', romaji: 'ki', mnemonic: 'Key shape' },
  { char: 'く', romaji: 'ku', mnemonic: 'Cuckoo bird beak' },
  { char: 'け', romaji: 'ke', mnemonic: 'Keg barrel' },
  { char: 'こ', romaji: 'ko', mnemonic: 'Coin shape' },
  
  // S row (sa, shi, su, se, so)
  { char: 'さ', romaji: 'sa', mnemonic: 'Samurai sword' },
  { char: 'し', romaji: 'shi', mnemonic: 'Fishing hook' },
  { char: 'す', romaji: 'su', mnemonic: 'Swing set' },
  { char: 'せ', romaji: 'se', mnemonic: 'Seven with a line' },
  { char: 'そ', romaji: 'so', mnemonic: 'Sewing needle' },
  
  // T row (ta, chi, tsu, te, to)
  { char: 'た', romaji: 'ta', mnemonic: 'Table with legs' },
  { char: 'ち', romaji: 'chi', mnemonic: 'Cheerleader' },
  { char: 'つ', romaji: 'tsu', mnemonic: 'Tsunami wave' },
  { char: 'て', romaji: 'te', mnemonic: 'Telephone pole' },
  { char: 'と', romaji: 'to', mnemonic: 'Toothpick' },
  
  // N row (na, ni, nu, ne, no)
  { char: 'な', romaji: 'na', mnemonic: 'Naughty cross' },
  { char: 'に', romaji: 'ni', mnemonic: 'Needle and thread' },
  { char: 'ぬ', romaji: 'nu', mnemonic: 'Noodle slurp' },
  { char: 'ね', romaji: 'ne', mnemonic: 'Nail bent' },
  { char: 'の', romaji: 'no', mnemonic: 'No symbol' },
  
  // H row (ha, hi, fu, he, ho)
  { char: 'は', romaji: 'ha', mnemonic: 'Hahaha face' },
  { char: 'ひ', romaji: 'hi', mnemonic: 'He is tall' },
  { char: 'ふ', romaji: 'fu', mnemonic: 'Futon bed' },
  { char: 'へ', romaji: 'he', mnemonic: 'Heaven above' },
  { char: 'ほ', romaji: 'ho', mnemonic: 'House with chimney' },
  
  // M row (ma, mi, mu, me, mo)
  { char: 'ま', romaji: 'ma', mnemonic: 'Mama hugging' },
  { char: 'み', romaji: 'mi', mnemonic: 'Me pointing' },
  { char: 'む', romaji: 'mu', mnemonic: 'Moo cow face' },
  { char: 'め', romaji: 'me', mnemonic: 'Messy hair' },
  { char: 'も', romaji: 'mo', mnemonic: 'More curvy lines' },
  
  // Y row (ya, yu, yo)
  { char: 'や', romaji: 'ya', mnemonic: 'Yacht sailing' },
  { char: 'ゆ', romaji: 'yu', mnemonic: 'You fishing' },
  { char: 'よ', romaji: 'yo', mnemonic: 'Yo-yo string' },
  
  // R row (ra, ri, ru, re, ro)
  { char: 'ら', romaji: 'ra', mnemonic: 'Rabbit ears' },
  { char: 'り', romaji: 'ri', mnemonic: 'River flowing' },
  { char: 'る', romaji: 'ru', mnemonic: 'Roof curving' },
  { char: 'れ', romaji: 're', mnemonic: 'Red pepper' },
  { char: 'ろ', romaji: 'ro', mnemonic: 'Robot square' },
  
  // W row (wa, wo) and N
  { char: 'わ', romaji: 'wa', mnemonic: 'Waffle pattern' },
  { char: 'を', romaji: 'wo', mnemonic: 'Wow exclamation' },
  { char: 'ん', romaji: 'n', mnemonic: 'Nap curled up' },
];

export const getCharacterByRomaji = (romaji: string): HiraganaCharacter | undefined => {
  return hiraganaCharacters.find(char => char.romaji === romaji);
};

export const getCharacterByChar = (char: string): HiraganaCharacter | undefined => {
  return hiraganaCharacters.find(character => character.char === char);
};
