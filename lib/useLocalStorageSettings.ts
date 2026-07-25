"use client";

import { useSyncExternalStore } from "react";
import type { GameSettings } from "./types";

const STORAGE_KEY = "imposter-ai-settings";

export function defaultSettings(): GameSettings {
  return {
    playerNames: ["Player 1", "Player 2", "Player 3"],
    imposterCount: 1,
    categoryId: "animals",
    customCategory: "",
    hintEnabled: false,
  };
}

const serverSnapshot = defaultSettings();
let cached: GameSettings | null = null;
const listeners = new Set<() => void>();

function readSnapshot(): GameSettings {
  if (cached) return cached;
  let result: GameSettings;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    result = raw ? { ...defaultSettings(), ...JSON.parse(raw) } : defaultSettings();
  } catch {
    result = defaultSettings();
  }
  cached = result;
  return result;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeSnapshot(next: GameSettings) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage write failures (e.g. private browsing)
  }
  listeners.forEach((listener) => listener());
}

export function useLocalStorageSettings() {
  const settings = useSyncExternalStore(subscribe, readSnapshot, () => serverSnapshot);
  return { settings, setSettings: writeSnapshot, loaded: true };
}
