"use client";

interface Props {
  onRevealAnswers: () => void;
}

export default function DiscussionScreen({ onRevealAnswers }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-6 text-center">
      <h1 className="text-3xl font-bold">🗣️ Discuss</h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        Everyone take turns describing the word. Talk it out, then vote out who you think the
        imposter is. When you&apos;re ready, reveal the answer.
      </p>
      <button
        type="button"
        onClick={onRevealAnswers}
        className="rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-md active:scale-95"
      >
        Reveal Answers
      </button>
    </div>
  );
}
