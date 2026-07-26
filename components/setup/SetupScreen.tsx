"use client";

import { validateSettings } from "@/lib/gameLogic";
import type { GameSettings } from "@/lib/types";
import PlayerListEditor from "./PlayerListEditor";
import ImposterCountSelector from "./ImposterCountSelector";
import CategoryPicker from "./CategoryPicker";

interface Props {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onStart: () => void;
  starting: boolean;
  startError: string | null;
}

export default function SetupScreen({ settings, onChange, onStart, starting, startError }: Props) {
  const validationError = validateSettings(settings.playerNames.length, settings.imposterCount);
  const customCategoryMissing = settings.categoryId === "custom" && !settings.customCategory.trim();
  const canStart = !validationError && !customCategoryMissing && !starting;

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">🕵️ Imposter AI</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Pass the phone. Find the imposter.
        </p>
      </header>

      <PlayerListEditor
        playerNames={settings.playerNames}
        onChange={(playerNames) => onChange({ ...settings, playerNames })}
      />

      <ImposterCountSelector
        playerCount={settings.playerNames.length}
        imposterCount={settings.imposterCount}
        onChange={(imposterCount) => onChange({ ...settings, imposterCount })}
      />

      <CategoryPicker
        categoryId={settings.categoryId}
        customCategory={settings.customCategory}
        onChangeCategoryId={(categoryId) => onChange({ ...settings, categoryId })}
        onChangeCustomCategory={(customCategory) => onChange({ ...settings, customCategory })}
      />

      <label className="flex items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
        <span className="text-sm font-medium">Give the imposter a hint word</span>
        <input
          type="checkbox"
          checked={settings.hintEnabled}
          onChange={(e) => onChange({ ...settings, hintEnabled: e.target.checked })}
          className="h-5 w-5 accent-violet-600"
        />
      </label>

      {validationError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {validationError}
        </p>
      )}
      {startError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {startError}
        </p>
      )}

      <button
        type="button"
        onClick={onStart}
        disabled={!canStart}
        className="mt-auto rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white shadow-md disabled:opacity-40 active:scale-95"
      >
        {starting ? "Starting…" : "Start Game"}
      </button>
    </div>
  );
}
