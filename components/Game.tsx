"use client";

import { useReducer, useState } from "react";
import { assignRoles, pickRandomWord, validateSettings } from "@/lib/gameLogic";
import { findCategory } from "@/lib/categories";
import { useLocalStorageSettings } from "@/lib/useLocalStorageSettings";
import type { GameSettings, RoundData } from "@/lib/types";
import SetupScreen from "./setup/SetupScreen";
import RevealScreen from "./reveal/RevealScreen";
import DiscussionScreen from "./discuss/DiscussionScreen";
import ResultsScreen from "./results/ResultsScreen";

type Phase = "setup" | "reveal" | "discuss" | "results";

type State = { phase: Phase; round: RoundData | null };

type Action =
  | { type: "ROUND_STARTED"; round: RoundData }
  | { type: "MARK_REVEALED"; playerId: string }
  | { type: "ALL_REVEALED" }
  | { type: "REVEAL_ANSWERS" }
  | { type: "NEW_SETUP" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ROUND_STARTED":
      return { phase: "reveal", round: action.round };
    case "MARK_REVEALED":
      if (!state.round) return state;
      return {
        ...state,
        round: {
          ...state.round,
          players: state.round.players.map((p) =>
            p.id === action.playerId ? { ...p, hasRevealed: true } : p
          ),
        },
      };
    case "ALL_REVEALED":
      return { ...state, phase: "discuss" };
    case "REVEAL_ANSWERS":
      return { ...state, phase: "results" };
    case "NEW_SETUP":
      return { phase: "setup", round: null };
    default:
      return state;
  }
}

async function fetchRound(settings: GameSettings): Promise<RoundData> {
  const isCustomCategory = settings.categoryId === "custom";
  let categoryName: string;
  let word: string | undefined;

  if (isCustomCategory) {
    categoryName = settings.customCategory.trim();
  } else {
    const category = findCategory(settings.categoryId);
    if (!category) throw new Error("Unknown category");
    categoryName = category.name;
    word = pickRandomWord(category.words);
  }

  const res = await fetch("/api/generate-word", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category: categoryName,
      isCustomCategory,
      word,
      wantHint: settings.hintEnabled,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to start the round");

  const players = assignRoles(settings.playerNames, settings.imposterCount);

  return {
    categoryName,
    word: data.word,
    hint: data.hintFailed ? undefined : data.hint,
    players,
  };
}

export default function Game() {
  const { settings, setSettings } = useLocalStorageSettings();
  const [state, dispatch] = useReducer(reducer, { phase: "setup", round: null });
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const startRound = async (currentSettings: GameSettings) => {
    const validationError = validateSettings(
      currentSettings.playerNames.length,
      currentSettings.imposterCount
    );
    if (validationError) {
      setStartError(validationError);
      return;
    }
    setStarting(true);
    setStartError(null);
    try {
      const round = await fetchRound(currentSettings);
      dispatch({ type: "ROUND_STARTED", round });
    } catch (err) {
      setStartError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setStarting(false);
    }
  };

  if (state.phase === "setup") {
    return (
      <SetupScreen
        settings={settings}
        onChange={setSettings}
        onStart={() => startRound(settings)}
        starting={starting}
        startError={startError}
      />
    );
  }

  if (!state.round) return null;

  if (state.phase === "reveal") {
    return (
      <RevealScreen
        round={state.round}
        onMarkRevealed={(playerId) => dispatch({ type: "MARK_REVEALED", playerId })}
        onAllRevealed={() => dispatch({ type: "ALL_REVEALED" })}
      />
    );
  }

  if (state.phase === "discuss") {
    return <DiscussionScreen onRevealAnswers={() => dispatch({ type: "REVEAL_ANSWERS" })} />;
  }

  return (
    <ResultsScreen
      round={state.round}
      onPlayAgainSame={() => startRound(settings)}
      onPlayAgainNewSetup={() => dispatch({ type: "NEW_SETUP" })}
    />
  );
}
