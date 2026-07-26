"use client";

import { useState } from "react";
import type { RoundData } from "@/lib/types";
import PlayerGrid from "./PlayerGrid";
import PassPhoneConfirm from "./PassPhoneConfirm";
import RevealCard from "./RevealCard";

interface Props {
  round: RoundData;
  onMarkRevealed: (playerId: string) => void;
  onAllRevealed: () => void;
}

type Stage = { step: "grid" } | { step: "confirm"; playerId: string } | { step: "card"; playerId: string };

export default function RevealScreen({ round, onMarkRevealed, onAllRevealed }: Props) {
  const [stage, setStage] = useState<Stage>({ step: "grid" });

  if (stage.step === "confirm") {
    const player = round.players.find((p) => p.id === stage.playerId)!;
    return (
      <PassPhoneConfirm
        playerName={player.name}
        onConfirm={() => setStage({ step: "card", playerId: player.id })}
        onCancel={() => setStage({ step: "grid" })}
      />
    );
  }

  if (stage.step === "card") {
    const player = round.players.find((p) => p.id === stage.playerId)!;
    return (
      <RevealCard
        player={player}
        categoryName={round.categoryName}
        word={round.word}
        hint={round.hint}
        onHide={() => {
          onMarkRevealed(player.id);
          setStage({ step: "grid" });
        }}
      />
    );
  }

  return (
    <PlayerGrid
      players={round.players}
      onSelect={(playerId) => setStage({ step: "confirm", playerId })}
      onAllRevealed={onAllRevealed}
    />
  );
}
