export interface Category {
  id: string;
  name: string;
  words: string[];
}

export interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  hasRevealed: boolean;
}

export interface GameSettings {
  playerNames: string[];
  imposterCount: number;
  categoryId: string | "custom";
  customCategory: string;
  hintEnabled: boolean;
}

export interface RoundData {
  categoryName: string;
  word: string;
  hint?: string;
  players: Player[];
}
