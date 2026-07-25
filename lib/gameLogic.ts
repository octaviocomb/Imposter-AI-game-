import type { Player } from "./types";

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 20;

export function maxImposters(playerCount: number): number {
  return Math.max(1, playerCount - 2);
}

export function validateSettings(playerCount: number, imposterCount: number): string | null {
  if (playerCount < MIN_PLAYERS) return `Need at least ${MIN_PLAYERS} players.`;
  if (playerCount > MAX_PLAYERS) return `Maximum ${MAX_PLAYERS} players.`;
  if (imposterCount < 1) return "Need at least 1 imposter.";
  const limit = maxImposters(playerCount);
  if (imposterCount > limit) {
    return `With ${playerCount} players, the maximum is ${limit} imposter${limit === 1 ? "" : "s"}.`;
  }
  return null;
}

export function pickRandomWord(words: string[], rng: () => number = Math.random): string {
  return words[Math.floor(rng() * words.length)];
}

export function assignRoles(
  playerNames: string[],
  imposterCount: number,
  rng: () => number = Math.random
): Player[] {
  const indices = playerNames.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const imposterIndices = new Set(indices.slice(0, imposterCount));
  return playerNames.map((name, i) => ({
    id: crypto.randomUUID(),
    name,
    isImposter: imposterIndices.has(i),
    hasRevealed: false,
  }));
}
