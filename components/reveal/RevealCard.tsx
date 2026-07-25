"use client";

import type { Player } from "@/lib/types";

interface Props {
  player: Player;
  categoryName: string;
  word: string;
  hint?: string;
  onHide: () => void;
}

export default function RevealCard({ player, categoryName, word, hint, onHide }: Props) {
  return (
    <div
      className={`fixed inset-0 flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center text-white ${
        player.isImposter ? "bg-red-900" : "bg-emerald-900"
      }`}
    >
      <p className="text-sm uppercase tracking-widest text-white/70">Category</p>
      <h2 className="text-2xl font-semibold">{categoryName}</h2>

      {player.isImposter ? (
        <>
          <p className="text-4xl font-extrabold">🎭 You are the Imposter</p>
          {hint ? (
            <p className="text-lg text-white/90">
              Hint: <span className="font-semibold">{hint}</span>
            </p>
          ) : (
            <p className="text-white/70">Blend in — you don&apos;t know the word.</p>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-white/70">Your word is</p>
          <p className="text-4xl font-extrabold">{word}</p>
        </>
      )}

      <button
        type="button"
        onClick={onHide}
        className="mt-6 rounded-2xl bg-white/15 px-8 py-4 text-lg font-semibold shadow-md active:scale-95"
      >
        Hide &amp; pass on
      </button>
    </div>
  );
}
