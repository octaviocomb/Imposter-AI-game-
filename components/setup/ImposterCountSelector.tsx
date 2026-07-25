"use client";

import { maxImposters } from "@/lib/gameLogic";

interface Props {
  playerCount: number;
  imposterCount: number;
  onChange: (count: number) => void;
}

export default function ImposterCountSelector({ playerCount, imposterCount, onChange }: Props) {
  const limit = maxImposters(playerCount);

  const set = (value: number) => {
    onChange(Math.min(Math.max(1, value), limit));
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Number of Imposters
      </h2>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => set(imposterCount - 1)}
          disabled={imposterCount <= 1}
          className="h-11 w-11 rounded-full bg-neutral-200 text-xl font-bold disabled:opacity-30 dark:bg-neutral-800"
        >
          −
        </button>
        <span className="w-8 text-center text-xl font-semibold">{imposterCount}</span>
        <button
          type="button"
          onClick={() => set(imposterCount + 1)}
          disabled={imposterCount >= limit}
          className="h-11 w-11 rounded-full bg-neutral-200 text-xl font-bold disabled:opacity-30 dark:bg-neutral-800"
        >
          +
        </button>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">(max {limit})</span>
      </div>
    </div>
  );
}
