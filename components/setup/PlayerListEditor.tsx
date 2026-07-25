"use client";

import { MAX_PLAYERS, MIN_PLAYERS } from "@/lib/gameLogic";

interface Props {
  playerNames: string[];
  onChange: (names: string[]) => void;
}

export default function PlayerListEditor({ playerNames, onChange }: Props) {
  const updateName = (index: number, value: string) => {
    const next = [...playerNames];
    next[index] = value;
    onChange(next);
  };

  const blurName = (index: number) => {
    if (!playerNames[index].trim()) {
      const next = [...playerNames];
      next[index] = `Player ${index + 1}`;
      onChange(next);
    }
  };

  const addPlayer = () => {
    if (playerNames.length >= MAX_PLAYERS) return;
    onChange([...playerNames, `Player ${playerNames.length + 1}`]);
  };

  const removePlayer = (index: number) => {
    if (playerNames.length <= MIN_PLAYERS) return;
    onChange(playerNames.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Players ({playerNames.length})
        </h2>
        <button
          type="button"
          onClick={addPlayer}
          disabled={playerNames.length >= MAX_PLAYERS}
          className="rounded-full bg-violet-600 px-3 py-1 text-sm font-medium text-white disabled:opacity-40 active:scale-95"
        >
          + Add
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {playerNames.map((name, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              onBlur={() => blurName(i)}
              maxLength={24}
              placeholder={`Player ${i + 1}`}
              className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base dark:border-neutral-700 dark:bg-neutral-900"
            />
            <button
              type="button"
              onClick={() => removePlayer(i)}
              disabled={playerNames.length <= MIN_PLAYERS}
              aria-label={`Remove ${name || `Player ${i + 1}`}`}
              className="shrink-0 rounded-lg px-3 py-2 text-neutral-500 disabled:opacity-30"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
