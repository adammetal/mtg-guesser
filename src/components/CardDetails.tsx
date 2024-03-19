"use client";

import { type RouterOutputs } from "../trpc/routers/_app";

type Card = RouterOutputs["getRandomCard"];

export default function CardDetails({
  card,
  onGuess,
}: {
  card: Card;
  onGuess: () => void;
}) {
  return (
    <div className="shadow-2xl p-4 bg-white select-none">
      <h1 className="text-2xl border-b-2">{card.name}</h1>
      <p className="mt-2">{card.text}</p>

      {typeof card.power !== "undefined" && (
        <div className="text-right text-lg mt-2">
          <span className="p-2">{card.power}</span>
          <span>/</span>
          <span className="p-2">{card.toughness}</span>
        </div>
      )}

      <button
        onClick={() => onGuess()}
        className="p-2 px-4 bg-slate-400 shadow-md mt-4 rounded-md text-white"
      >
        Guess!
      </button>
    </div>
  );
}
