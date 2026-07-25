"use client";

interface Props {
  playerName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PassPhoneConfirm({ playerName, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 flex min-h-dvh flex-col items-center justify-center gap-6 bg-neutral-950 px-6 text-center text-white">
      <p className="text-lg text-neutral-300">Pass the phone to</p>
      <h1 className="text-4xl font-bold">{playerName}</h1>
      <p className="text-sm text-neutral-400">Make sure no one else is looking, then tap below.</p>
      <button
        type="button"
        onClick={onConfirm}
        className="mt-4 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold shadow-md active:scale-95"
      >
        I&apos;m {playerName} — Reveal my word
      </button>
      <button type="button" onClick={onCancel} className="text-sm text-neutral-400 underline">
        Wrong person, go back
      </button>
    </div>
  );
}
