"use client";

import type { Player } from "@/lib/types";

interface Props {
  players: Player[];
  onSelect: (playerId: string) => void;
  onAllRevealed: () => void;
}

export default function PlayerGrid({ players, onSelect, onAllRevealed }: Props) {
  const allRevealed = players.every((p) => p.hasRevealed);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold">Pass the phone</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Tap your name to see your word. Then hide it and pass the phone on.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {players.map((player) => (
          <li key={player.id}>
            <button
              type="button"
              onClick={() => onSelect(player.id)}
              className={`flex w-full flex-col items-center gap-1 rounded-xl border px-3 py-4 text-center font-medium transition ${
                player.hasRevealed
                  ? "border-neutral-200 bg-neutral-100 text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-600"
                  : "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-100"
              }`}
            >
              <span className="truncate max-w-full">{player.name}</span>
              <span className="text-xs">{player.hasRevealed ? "✓ Seen" : "Tap to reveal"}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onAllRevealed}
        disabled={!allRevealed}
        className="mt-auto rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white shadow-md disabled:opacity-40 active:scale-95"
      >
        Everyone has seen their word
      </button>
    </div>
  );
}
