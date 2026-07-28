// PAIO 2025 organising committees for the Administration tab.
// Team/Deputy leaders are edition delegation data (see team-leaders.ts / deputy-leaders.ts).
import type { AdministrationGroup } from "@/domain/edition";

export const administration: AdministrationGroup[] = [
  {
    title: "International Scientific Committee",
    members: [
      {
        name: "Anton Tsypko",
        roles: ["IOI 2017 Gold Medalist", "Team Leader, Ukraine"],
        image: "/images/administration/anton-tsypko.png",
      },
      {
        name: "Prof Pedro Paredes",
        roles: ["Teaching Professor, Princeton", "Head of Portugal International Scientific Committee"],
        image: "/images/administration/pedro-paredes.jpg",
      },
      {
        name: "Bartosz Kostka",
        roles: ["Software Engineer, Google", "IOI Scientific Committee"],
        image: "/images/administration/bartosz-kostka.png",
      },
      {
        name: "Tamio-Vesa Nakajima",
        roles: ["IOI 2017 Gold Medalist", "Head of Romanian Scientific Committee"],
        image: "/images/administration/tamio-nakajima.png",
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
        name: "Qingyu Shi",
        roles: ["Asia Pacific Informatics Olympiad Scientific Committee", "Co-President of Universal Cup"],
        image: "/images/qingyu.jpg",
      },
    ],
  },
  {
    title: "Host Committee",
    members: [
      { name: "Dr. Papias Niyigena", roles: ["Principal, Rwanda Coding Academy"] },
      { name: "Hirwa Arnold", roles: ["Rwanda Computing Olympiad"], image: "/images/hirwa.jpeg" },
      {
        name: "Arun Shanmuganathan",
        roles: ["Founder, African Olympiad Academy"],
        image: "/images/administration/arun.jpg",
      },
      {
        name: "Joel Lee",
        roles: ["Software and Avocado Enthusiast"],
        image: "/images/joel.webp",
      },
      {
        name: "Norbert Ndayisenga",
        roles: ["Rwanda Computing Olympiad"],
        image: "/images/norbert.webp",
      },
      {
        name: "Jean Paul Elisa NIYOKWIZERWA",
        roles: ["Rwanda Computing Olympiad"],
        image: "/images/administration/jean-paul.jpg",
      },
    ],
  },
  {
    title: "International Committee",
    members: [
      {
        name: "Jennie Oluchi",
        roles: ["Nigeria Olympiad Program"],
        image: "/images/administration/jennie-oluchi.png",
      },
      { name: "Hirwa Arnold", roles: ["Rwanda Olympiad Foundation"], image: "/images/hirwa.jpeg" },
      { name: "Obed Nsanzimfura", roles: ["Rwanda Olympiad Foundation"], image: "/images/obed.webp" },
      { name: "Sihine Negede", roles: ["African Olympiad Academy"] },
      {
        name: "Maya Chouikrat",
        roles: ["Algerian Olympiad Program"],
        image: "/images/administration/maya.jpg",
      },
    ],
  },
];
