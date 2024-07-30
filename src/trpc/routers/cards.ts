import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ScryCard } from "@/zCard";
import arrayEqual from "@/utils/array-equal";

const BASE = "https://api.scryfall.com";

type QuizCard = {
  id: string;
  name: string;
  image: string;
  text: string;
  type: string;
  power?: string;
  toughness?: string;
};


const getRandomCardFromScry = async (minYear: number): Promise<QuizCard> => {
  const url = new URL("/cards/random", BASE);
  url.searchParams.append("q", `-c:colorless -t:land year>=${minYear}`);

  const response = await fetch(url, {
    cache: "no-cache",
  });

  const card = <ScryCard>await response.json();

  return {
    id: card.id,
    name: card.name,
    type: card.type_line,
    power: card.power,
    toughness: card.toughness,
    image: card?.image_uris?.png ?? "",
    text: card?.oracle_text ?? "",
  };
};

const getCardFromScryById = async (id: string): Promise<ScryCard> => {
  const url = new URL("/cards/" + id, BASE);
  const response = await fetch(url);
  const card = <ScryCard>await response.json();
  return card;
};


const getRandomCard = procedure
  .input(z.object({ yearFrom: z.number().default(2000) }))
  .query(async ({ input, ctx }) => {
    const { session } = ctx;
    const { yearFrom } = input;

    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return getRandomCardFromScry(yearFrom);
  });

const scoreUserGuess = procedure
  .input(
    z.object({
      cmc: z.number(),
      id: z.string(),
      colors: z.array(z.string()),
    })
  )
  .query(async ({ input }) => {
    let scores = 0;
    const { cmc, id, colors } = input;
    const card = await getCardFromScryById(id);

    if (card.cmc === cmc) {
      scores++;
    }

    if (arrayEqual(colors, card.colors ?? [])) {
      scores++;
    }

    return scores;
  });

export default router({ getRandomCard, scoreUserGuess });
