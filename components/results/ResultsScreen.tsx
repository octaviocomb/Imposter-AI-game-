"use client";

import type { RoundData } from "@/lib/types";

interface Props {
  round: RoundData;
  onPlayAgainSame: () => void;
  onPlayAgainNewSetup: () => void;
}

export default function ResultsScreen({ round, onPlayAgainSame, onPlayAgainNewSetup }: Props) {
  const imposters = round.players.filter((p) => p.isImposter);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-6 text-center">
      <h1 className="text-2xl font-bold">The word was</h1>
      <p className="text-4xl font-extrabold text-violet-600">{round.word}</p>

      <div>
        <p className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {imposters.length > 1 ? "Imposters" : "Imposter"}
        </p>
        <p className="text-2xl font-bold">{imposters.map((p) => p.name).join(", ")}</p>
      </div>

      <div className="mt-4 flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={onPlayAgainSame}
          className="rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white shadow-md active:scale-95"
        >
          Play Again — Same Players
        </button>
        <button
          type="button"
          onClick={onPlayAgainNewSetup}
          className="rounded-2xl border border-neutral-300 py-4 text-lg font-semibold text-neutral-800 active:scale-95 dark:border-neutral-700 dark:text-neutral-100"
        >
          New Setup
        </button>
      </div>
    </div>
  );
}
