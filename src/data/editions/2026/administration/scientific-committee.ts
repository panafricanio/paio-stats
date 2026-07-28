import type { Official } from "@/domain/edition";

/**
 * PAIO 2026 International Scientific Committee (ISC).
 * Roster carried forward from PAIO 2025, plus Mina Gayed.
 */
export const scientificCommittee: Official[] = [
  {
    name: "Mina Gayed",
    roles: ["ISC member"],
  },
  {
    name: "Bartosz Kostka",
    roles: ["ISC member"],
    image: "/images/administration/bartosz-kostka.png",
  },
  {
    name: "Qingyu Shi",
    roles: ["ISC member"],
    image: "/images/qingyu.jpg",
  },
  {
    name: "Prof Pedro Paredes",
    roles: ["ISC member"],
    image: "/images/administration/pedro-paredes.jpg",
  },
  {
    name: "Bernard Ibrahimcha",
    roles: ["ISC member"],
    image: "/images/Bernard.jpg",
  },
  {
    name: "Tamio-Vesa Nakajima",
    roles: ["ISC member"],
    image: "/images/administration/tamio-nakajima.png",
  },
];
