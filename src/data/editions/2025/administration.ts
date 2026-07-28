// PAIO 2025 organising committees for the Administration tab.
// Roles are PAIO org roles (IOI-style), not employers or biographies.
// Team/Deputy leaders are edition delegation data (see team-leaders.ts / deputy-leaders.ts).
import type { AdministrationGroup } from "@/domain/edition";

export const administration: AdministrationGroup[] = [
  {
    title: "International Scientific Committee",
    members: [
      {
        name: "Anton Tsypko",
        roles: ["ISC member"],
        image: "/images/administration/anton-tsypko.png",
      },
      {
        name: "Prof Pedro Paredes",
        roles: ["ISC member"],
        image: "/images/administration/pedro-paredes.jpg",
      },
      {
        name: "Bartosz Kostka",
        roles: ["ISC member"],
        image: "/images/administration/bartosz-kostka.png",
      },
      {
        name: "Tamio-Vesa Nakajima",
        roles: ["ISC member"],
        image: "/images/administration/tamio-nakajima.png",
      },
      {
        name: "Bernard Ibrahimcha",
        roles: ["ISC member"],
        image: "/images/Bernard.jpg",
      },
      {
        name: "Qingyu Shi",
        roles: ["ISC member"],
        image: "/images/qingyu.jpg",
      },
    ],
  },
  {
    title: "Host Committee",
    members: [
      { name: "Dr. Papias Niyigena", roles: ["Host Committee member"] },
      {
        name: "Hirwa Arnold",
        roles: ["Host Committee member"],
        image: "/images/hirwa.jpeg",
      },
      {
        name: "Arun Shanmuganathan",
        roles: ["Host Committee member"],
        image: "/images/administration/arun.jpg",
      },
      {
        name: "Joel Lee",
        roles: ["Host Committee member"],
        image: "/images/joel.webp",
      },
      {
        name: "Norbert Ndayisenga",
        roles: ["Host Committee member"],
        image: "/images/norbert.webp",
      },
      {
        name: "Jean Paul Elisa NIYOKWIZERWA",
        roles: ["Host Committee member"],
        image: "/images/administration/jean-paul.jpg",
      },
    ],
  },
  {
    title: "International Committee",
    members: [
      {
        name: "Jennie Oluchi",
        roles: ["IC member"],
        image: "/images/administration/jennie-oluchi.png",
      },
      {
        name: "Hirwa Arnold",
        roles: ["IC member"],
        image: "/images/hirwa.jpeg",
      },
      {
        name: "Obed Nsanzimfura",
        roles: ["IC member"],
        image: "/images/obed.webp",
      },
      { name: "Sihine Negede", roles: ["IC member"] },
      {
        name: "Maya Chouikrat",
        roles: ["IC member"],
        image: "/images/administration/maya.jpg",
      },
    ],
  },
];
