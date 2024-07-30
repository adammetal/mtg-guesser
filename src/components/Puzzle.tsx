"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type RouterOutputs } from "../trpc/routers/_app";
import CardImage from "./CardImage";
import * as Symbols from "./Symbols";
import CardDetails from "./CardDetails";
import Cmc from "./Cmc";
import { trpc } from "../trpc/trpcClient";

type Card = RouterOutputs["getRandomCard"];

export default function Card({ card }: { card: Card }) {
  const query = useQuery({
    queryKey: ["card"],
    queryFn: () => trpc.getRandomCard.query({}),
    initialData: card,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const [score, setScore] = useState(0);
  const [sent, setSent] = useState(false);
  const [cmc, setCmc] = useState("");
  const [colors, setColors] = useState<Record<string, boolean>>({
    r: false,
    g: false,
    u: false,
    w: false,
    b: false,
    c: false,
  });

  const guess = useCallback(async () => {
    setSent(true);

    const result = await trpc.scoreUserGuess.query({
      cmc: Number(cmc),
      id: query.data.id,
      colors: Object.entries(colors)
        .filter((entry) => entry[1])
        .map((entry) => entry[0].toUpperCase()),
    });

    setScore((s) => s + result);
  }, [cmc, colors, query.data.id]);

  const reset = useCallback(async () => {
    await query.refetch();
    setSent(false);

    setColors({
      r: false,
      g: false,
      u: false,
      w: false,
      b: false,
      c: false,
    });

    setCmc("");
  }, [query]);

  const colorChanger = (key: string) => (value: boolean) =>
    setColors((c) => ({ ...c, [key]: value }));

  return (
    <div className="grid grid-cols-6 gap-2 max-w-md">
      <Symbols.Red active={colors.r} onChange={colorChanger("r")} />
      <Symbols.Green active={colors.g} onChange={colorChanger("g")} />
      <Symbols.Blue active={colors.u} onChange={colorChanger("u")} />
      <Symbols.White active={colors.w} onChange={colorChanger("w")} />
      <Symbols.Black active={colors.b} onChange={colorChanger("b")} />
      <Symbols.Colorless active={colors.c} onChange={colorChanger("c")} />
      <Cmc
        value={cmc}
        onChange={(cmc) => {
          setCmc(cmc);
        }}
      />
      <div className="col-span-6 relative z-20">
        {sent ? (
          <CardImage src={query.data.image} />
        ) : (
          <CardDetails
            onGuess={() => {
              guess();
            }}
            card={query.data}
          />
        )}
      </div>
      <div className="col-span-3">Scores: {score}</div>
      <div className="col-span-3">
        {sent && (
          <button
            onClick={reset}
            className="p-2 px-4 bg-slate-500 rounded-sm shadow-sm"
          >
            {query.isFetching ? "Loading..." : "Again"}
          </button>
        )}
      </div>
    </div>
  );
}
