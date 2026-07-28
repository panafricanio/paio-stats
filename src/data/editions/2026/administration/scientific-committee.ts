import type { Official } from "@/domain/edition";

/**
 * PAIO 2026 International Scientific Committee (ISC).
 * Roster/roles/portraits carried forward from PAIO 2025, plus Mina Gayed.
 */
export const scientificCommittee: Official[] = [
  {
    name: "Mina Gayed",
    roles: ["PAIO 2025 Champion", "IOI 2025 Silver Medalist"],
  },
  {
    name: "Bartosz Kostka",
    roles: ["Software Engineer, Google", "IOI Scientific Committee"],
    image: "/images/administration/bartosz-kostka.png",
  },
  {
    name: "Qingyu Shi",
    roles: ["Asia Pacific Informatics Olympiad Scientific Committee", "Co-President of Universal Cup"],
    image: "/images/qingyu.jpg",
  },
  {
    name: "Prof Pedro Paredes",
    roles: ["Teaching Professor, Princeton", "Head of Portugal International Scientific Committee"],
    image: "/images/administration/pedro-paredes.jpg",
  },
  {
    name: "Bernard Ibrahimcha",
    roles: [
      "IOI 2023 Honorable Mention",
      "Syrian National Scientific Committee & IIOT Scientific Committee",
    ],
    image: "/images/Bernard.jpg",
  },
  {
    name: "Tamio-Vesa Nakajima",
    roles: ["IOI 2017 Gold Medalist", "Head of Romanian Scientific Committee"],
    image: "/images/administration/tamio-nakajima.png",
  },
];
