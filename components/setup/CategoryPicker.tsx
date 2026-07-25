"use client";

import { CATEGORIES } from "@/lib/categories";

interface Props {
  categoryId: string | "custom";
  customCategory: string;
  onChangeCategoryId: (id: string | "custom") => void;
  onChangeCustomCategory: (value: string) => void;
}

export default function CategoryPicker({
  categoryId,
  customCategory,
  onChangeCategoryId,
  onChangeCustomCategory,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Category
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChangeCategoryId(cat.id)}
            className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
              categoryId === cat.id
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-neutral-300 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChangeCategoryId("custom")}
          className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
            categoryId === "custom"
              ? "border-violet-600 bg-violet-600 text-white"
              : "border-dashed border-neutral-400 bg-white text-neutral-800 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
          }`}
        >
          ✨ Custom
        </button>
      </div>
      {categoryId === "custom" && (
        <div className="flex flex-col gap-1">
          <input
            value={customCategory}
            onChange={(e) => onChangeCustomCategory(e.target.value)}
            maxLength={40}
            placeholder="e.g. 90s Cartoons, Board Games..."
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base dark:border-neutral-700 dark:bg-neutral-900"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            AI will pick a word for this theme when the round starts.
          </p>
        </div>
      )}
    </div>
  );
}
