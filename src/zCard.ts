import { z } from "zod";

const zImageUris = () =>
  z.object({
    // PNG: 745 × 1040 A transparent, rounded full card PNG. This is the best image to use for videos or other high-quality content.
    png: z.string().url(),

    // JPG 480 × 680 A full card image with the rounded corners and the majority of the border cropped off. Designed for dated contexts where rounded images can’t be used.
    border_crop: z.string().url(),

    // JPG Varies A rectangular crop of the card’s art only. Not guaranteed to be perfect for cards with outlier designs or strange frame arrangements
    art_crop: z.string().url(),

    // JPG 672 × 936 A large full card image
    large: z.string().url(),

    // JPG 488 × 680 A medium-sized full card image
    normal: z.string().url(),

    // JPG 146 × 204 A small full card image. Designed for use as thumbnail or list icon.
    small: z.string().url(),
  });

/**
 * Cards that are closely related to other cards
 * (because they call them by name, or generate a token, or meld, etc)
 * have a all_parts property that contains Related Card objects.
 * Those objects have the following properties:
 */
const zRelatedCard = () =>
  z.object({
    // An unique ID for this card in Scryfall’s database.
    id: z.string(),

    // A content type for this object, always related_card.
    object: z.string(),

    // A field explaining what role this card plays in this relationship, one of token, meld_part, meld_result, or combo_piece.
    component: z.enum(["token", "meld_part", "meld_result", "combo_piece"]),

    // The name of this particular related card.
    name: z.string(),

    // The type line of this card.
    type_line: z.string(),

    // A URI where you can retrieve a full object describing this card on Scryfall’s API.
    uri: z.string().url(),
  });

/**
 * Multiface cards have a card_faces property
 * containing at least two Card Face objects.
 * Those objects have the following properties:
 */
const zCardFace = () =>
  z.object({
    // The name of the illustrator of this card face. Newly spoiled cards may not have this field yet.
    artist: z.string().optional(),

    // The ID of the illustrator of this card face. Newly spoiled cards may not have this field yet.
    artist_id: z.string().optional(),

    // The mana value of this particular face, if the card is reversible.
    cmc: z.number().optional(),

    // The colors in this face’s color indicator, if any.
    color_indicator: z.array(z.string()).optional(),

    // This face’s colors, if the game defines colors for the individual face of this card.
    colors: z.array(z.string()).optional(),

    // This face’s defense, if the game defines colors for the individual face of this card.
    defense: z.string().optional(),

    // The flavor text printed on this face, if any.
    flavor_text: z.string().optional(),

    // A unique identifier for the card face artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
    illustration_id: z.string().optional(),

    // An object providing URIs to imagery for this face, if this is a double-sided card. If this card is not double-sided, then the image_uris property will be part of the parent object instead.
    image_uris: zImageUris().optional(),

    // The layout of this card face, if the card is reversible.
    layout: z.string().optional(),

    // This face’s loyalty, if any.
    loyalty: z.string().optional(),

    // The mana cost for this face. This value will be any empty string "" if the cost is absent. Remember that per the game rules, a missing mana cost and a mana cost of {0} are different values.
    mana_cost: z.string().optional(),

    // The name of this particular face.
    name: z.string(),

    // A content type for this object, always card_face.
    object: z.string(),

    // The Oracle ID of this particular face, if the card is reversible.
    oracle_id: z.string().optional(),

    // The Oracle text for this face, if any.
    oracle_text: z.string().optional(),

    // This face’s power, if any. Note that some cards have powers that are not numeric, such as *.
    power: z.string().optional(),

    // The localized name printed on this face, if any.
    printed_name: z.string().optional(),

    // The localized text printed on this face, if any.
    printed_text: z.string().optional(),

    // The localized type line printed on this face, if any.
    printed_type_line: z.string().optional(),

    // This face’s toughness, if any.
    toughness: z.string().optional(),

    // The type line of this particular face, if the card is reversible.
    type_line: z.string().optional(),

    // The watermark on this particulary card face, if any.
    watermark: z.string().optional(),
  });

/**
 * https://scryfall.com/docs/api/cards
 *
 * Card objects represent individual Magic:
 * The Gathering cards that players could obtain and add to their collection
 * (with a few minor exceptions).
 *
 * Cards are the API’s most complex object.
 * You are encouraged to thoroughly read this document and also the
 * article about layouts and images.
 */
export const zCard = () =>
  z.object({
    // This card’s Arena ID, if any. A large percentage of cards are not available on Arena and do not have this ID.
    arena_id: z.number().optional(),

    // A unique ID for this card in Scryfall’s database.
    id: z.string(),

    // A language code for this printing.
    lang: z.string(),

    // This card’s Magic Online ID (also known as the Catalog ID), if any. A large percentage of cards are not available on Magic Online and do not have this ID.
    mtgo_id: z.number().optional(),

    // This card’s foil Magic Online ID (also known as the Catalog ID), if any. A large percentage of cards are not available on Magic Online and do not have this ID.
    mtgo_foil_id: z.number().optional(),

    // This card’s multiverse IDs on Gatherer, if any, as an array of integers. Note that Scryfall includes many promo cards, tokens, and other esoteric objects that do not have these identifiers.
    multiverse_ids: z.array(z.number()).optional(),

    // This card’s ID on TCGplayer’s API, also known as the productId.
    tcgplayer_id: z.number().optional(),

    // This card’s ID on TCGplayer’s API, for its etched version if that version is a separate product.
    tcgplayer_etched_id: z.number().optional(),

    // This card’s ID on Cardmarket’s API, also known as the idProduct.
    cardmarket_id: z.number().optional(),

    // A content type for this object, always card.
    object: z.string(),

    // A code for this card’s layout.
    layout: z.string(),

    /* A unique ID for this card’s oracle identity.
    This value is consistent across reprinted card editions,
    and unique among different cards with the same name
    (tokens, Unstable variants, etc).
    Always present except for the reversible_card layout where it will be absent;
    oracle_id will be found on each face instead. */
    oracle_id: z.string().optional(),

    // A link to where you can begin paginating all re/prints for this card on Scryfall’s API.
    prints_search_uri: z.string().url(),

    // A link to this card’s rulings list on Scryfall’s API.
    rulings_uri: z.string().url(),

    // A link to this card’s permapage on Scryfall’s website.
    scryfall_uri: z.string().url(),

    // A link to this card object on Scryfall’s API.
    uri: z.string().url(),

    // If this card is closely related to other cards, this property will be an array with Related Card Objects.
    all_parts: z.array(zRelatedCard()).optional(),

    // An array of Card Face objects, if this card is multifaced.
    card_faces: z.array(zCardFace()).optional(),

    // The card’s mana value. Note that some funny cards have fractional mana costs.
    cmc: z.number(),

    // This card’s color identity.
    color_identity: z.array(z.string()),

    //The colors in this card’s color indicator, if any. A null value for this field indicates the card does not have one.
    color_indicator: z.array(z.string()).optional(),

    // This card’s colors, if the overall card has colors defined by the rules. Otherwise the colors will be on the card_faces objects, see below.
    colors: z.array(z.string()).optional(),

    // This face’s defense, if any.
    defense: z.string().optional(),

    // This card’s overall rank/popularity on EDHREC. Not all cards are ranked.
    edhrec_rank: z.number().optional(),

    // This card’s hand modifier, if it is Vanguard card. This value will contain a delta, such as -1.
    hand_modifier: z.string().optional(),

    // An array of keywords that this card uses, such as 'Flying' and 'Cumulative upkeep'.
    keywords: z.array(z.string()),

    // An object describing the legality of this card across play formats. Possible legalities are legal, not_legal, restricted, and banned.
    legalities: z.record(
      z.enum(["legal", "not_legal", "restricted", "banned"])
    ),

    // This card’s life modifier, if it is Vanguard card. This value will contain a delta, such as +2.
    life_modifier: z.string().optional(),

    // This loyalty if any. Note that some cards have loyalties that are not numeric, such as X.
    loyalty: z.string().optional(),

    /**
     * The mana cost for this card.
     * This value will be any empty string "" if the cost is absent.
     * Remember that per the game rules, a missing mana cost and a
     * mana cost of {0} are different values.
     * Multi-faced cards will report this value in card faces.
     */
    mana_cost: z.string().optional(),

    // The name of this card. If this card has multiple faces, this field will contain both names separated by ␣//␣.
    name: z.string(),

    // The Oracle text for this card, if any.
    oracle_text: z.string().optional(),

    // This card’s rank/popularity on Penny Dreadful. Not all cards are ranked.
    penny_rank: z.number().optional(),

    // This card’s power, if any. Note that some cards have powers that are not numeric, such as *.
    power: z.string().optional(),

    // Colors of mana that this card could produce.
    produced_mana: z.array(z.string()).optional(),

    // True if this card is on the Reserved List.
    reserved: z.boolean(),

    // This card’s toughness, if any. Note that some cards have toughnesses that are not numeric, such as *.
    toughness: z.string().optional(),

    // The type line of this card.
    type_line: z.string(),

    // The name of the illustrator of this card. Newly spoiled cards may not have this field yet.
    artist: z.string().optional(),

    // The IDs of the artists that illustrated this card. Newly spoiled cards may not have this field yet.
    artist_ids: z.array(z.string()).optional(),

    // The lit Unfinity attractions lights on this card, if any.
    attraction_lights: z.array(z.string()).optional(),

    // Whether this card is found in boosters.
    booster: z.boolean(),

    // This card’s border color: black, white, borderless, silver, or gold.
    border_color: z.string(),

    // The Scryfall ID for the card back design present on this card.
    card_back_id: z.string().optional(),

    // This card’s collector number. Note that collector numbers can contain non-numeric characters, such as letters or ★.
    collector_number: z.string(),

    // True if you should consider avoiding use of this print downstream.
    content_warning: z.boolean().optional(),

    // True if this card was only released in a video game.
    digital: z.boolean(),

    // An array of computer-readable flags that indicate if this card can come in foil, nonfoil, or etched finishes.
    finishes: z.array(z.string()),

    // The just-for-fun name printed on the card (such as for Godzilla series cards).
    flavor_name: z.string().optional(),

    // The flavor text, if any.
    flavor_text: z.string().optional(),

    // This card’s frame effects, if any.
    frame_effects: z.array(z.string()).optional(),

    // This card’s frame layout.
    frame: z.string(),

    // True if this card’s artwork is larger than normal.
    full_art: z.boolean(),

    // A list of games that this card print is available in, paper, arena, and/or mtgo.
    games: z.array(z.string()),

    // True if this card’s imagery is high resolution.
    highres_image: z.boolean(),

    // A unique identifier for the card artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
    illustration_id: z.string().optional(),

    // A computer-readable indicator for the state of this card’s image, one of missing, placeholder, lowres, or highres_scan.
    image_status: z.enum(["missing", "placeholder", "lowres", "highres_scan"]),

    // An object listing available imagery for this card. See the Card Imagery article for more information.
    image_uris: zImageUris().optional(),

    // True if this card is oversized.
    oversized: z.boolean(),

    /**
     * An object containing daily price information for this card,
     * including usd, usd_foil, usd_etched, eur, eur_foil, eur_etched,
     * and tix prices, as strings.
     */
    prices: z.record(z.string().optional().nullable()),

    // The localized name printed on this card, if any.
    printed_name: z.string().optional(),

    // The localized text printed on this card, if any.
    printed_text: z.string().optional(),

    // The localized type line printed on this card, if any.
    printed_type_line: z.string().optional(),

    // True if this card is a promotional print.
    promo: z.boolean(),

    // An array of strings describing what categories of promo cards this card falls into.
    promo_types: z.array(z.string()).optional(),

    // An object providing URIs to this card’s listing on major marketplaces. Omitted if the card is unpurchaseable.
    purchase_uris: z.record(z.string().url()).optional(),

    // This card’s rarity. One of common, uncommon, rare, special, mythic, or bonus.
    rarity: z.enum([
      "common",
      "uncommon",
      "rare",
      "special",
      "mythic",
      "bonus",
    ]),

    // An object providing URIs to this card’s listing on other Magic: The Gathering online resources.
    related_uris: z.record(z.string().url()),

    // The date this card was first released.
    released_at: z.string(),

    // True if this card is a reprint.
    reprint: z.boolean(),

    // A link to this card’s set on Scryfall’s website.
    scryfall_set_uri: z.string().url(),

    // This card’s full set name.
    set_name: z.string(),

    // A link to where you can begin paginating this card’s set on the Scryfall API.
    set_search_uri: z.string().url(),

    // The type of set this printing is in.
    set_type: z.string(),

    // A link to this card’s set object on Scryfall’s API.
    set_uri: z.string().url(),

    // This card’s set code.
    set: z.string(),

    // This card’s Set object UUID.
    set_id: z.string(),

    // True if this card is a Story Spotlight.
    story_spotlight: z.boolean(),

    // True if the card is printed without text.
    textless: z.boolean(),

    // Whether this card is a variation of another printing.
    variation: z.boolean(),

    // The printing ID of the printing this card is a variation of.
    variation_of: z.string().optional(),

    // The security stamp on this card, if any. One of oval, triangle, acorn, circle, arena, or heart.
    security_stamp: z
      .enum(["oval", "triangle", "acorn", "circle", "arena", "heart"])
      .optional(),

    // This card’s watermark, if any.
    watermark: z.string().optional(),

    preview: z
      .object({
        // The date this card was previewed.
        previewed_at: z.string().optional(),

        // A link to the preview for this card.
        source_uri: z.string().optional(),

        // The name of the source that previewed this card.
        source: z.string().optional(),
      })
      .optional(),
  });

export type ScryCard = z.infer<ReturnType<typeof zCard>>;
