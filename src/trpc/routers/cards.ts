import { number, z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

const BASE = "https://api.scryfall.com";

type ScryCard = {
  id: string;
  colors: string[];
  name: string;
  image_uris: {
    png: string;
  };
  cmc: number;
  type_line: string;
  oracle_text: string;
  power?: string;
  toughness?: string;
};

type QuizCard = {
  id: string;
  name: string;
  image: string;
  text: string;
  type: string;
  power?: string;
  toughness?: string;
};

/**
 * Search for non colorless non land cards.
 *
 * @param minYear
 * The bottom limit for the release.
 */
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
    image: card.image_uris.png,
    type: card.type_line,
    power: card.power,
    toughness: card.toughness,
    text: card.oracle_text,
  };
};

const getCardFromScryById = async (id: string): Promise<ScryCard> => {
  const url = new URL("/cards/" + id, BASE);
  const response = await fetch(url);
  const card = <ScryCard>await response.json();
  return card;
};

const arrayEquals = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const checking = [...b];

  for (const elem of a) {
    const index = checking.indexOf(elem);

    if (index === -1) {
      return false;
    }

    checking.splice(index, 1);
  }

  return checking.length === 0;
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

    if (arrayEquals(colors, card.colors)) {
      scores++;
    }

    return scores;
  });

export default router({ getRandomCard, scoreUserGuess });
