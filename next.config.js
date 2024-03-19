//https://cards.scryfall.io/png/front/5/4/54cb25b6-049c-46dd-88a4-f3890e018db0.png?1592710839

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cards.scryfall.io',
      },
    ],
  },
}

module.exports = nextConfig
