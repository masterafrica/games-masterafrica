import type { GameCardData } from "@/components/modules/game-card";

export type GameWithOffset = GameCardData & {
  offset?: "none" | "sm" | "md";
};

export const GAMES: GameWithOffset[] = [
  {
    id: 2,
    title: "Interview Quest",
    description: "Sharpening the mind",
    image: "/images/games/interview-quest.jpg",
    theme: "yellow",
    offset: "none",
  },
//   {
//     id: 2,
//     title: "Afro IQ",
//     description: "Sharpening the mind",
//     image: "/images/games/afro-iq.jpg",
//     theme: "purple",
//     offset: "sm",
//   },
//   {
//     id: 3,
//     title: "Match the picture",
//     description: "Sharpening the mind",
//     image: "/images/games/match-picture.jpg",
//     theme: "blue",
//     offset: "md",
//   },
//   {
//     id: 4,
//     title: "Afro IQ",
//     description: "Sharpening the mind",
//     image: "/images/games/unscramble-word.jpg",
//     theme: "green",
//     offset: "md",
//   },
];

