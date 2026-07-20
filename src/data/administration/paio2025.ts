// PAIO 2025 organising side, gathered from the official PAIO 2025 website
// (panafricanio/paio_new: data/committeeMembers.ts + data/coaches.ts).
import type { AdministrationGroup } from "@/domain/edition";

export const paio2025Administration: AdministrationGroup[] = [
  {
    title: "International Scientific Committee",
    members: [
      { name: "Anton Tsypko", roles: ["IOI 2017 Gold Medalist", "Team Leader, Ukraine"] },
      {
        name: "Prof Pedro Paredes",
        roles: ["Teaching Professor, Princeton", "Head of Portugal International Scientific Committee"],
      },
      {
        name: "Bartosz Kostka",
        roles: ["Software Engineer, Google", "IOI Scientific Committee"],
      },
      {
        name: "Tamio-Vesa Nakajima",
        roles: ["IOI 2017 Gold Medalist", "Head of Romanian Scientific Committee"],
      },
      {
        name: "Bernard Ibrahimcha",
        roles: [
          "IOI 2023 Honorable Mention",
          "Syrian National Scientific Committee & IIOT Scientific Committee",
        ],
      },
      {
        name: "Qingyu Shi",
        roles: ["Asia Pacific Informatics Olympiad Scientific Committee", "Co-President of Universal Cup"],
      },
    ],
  },
  {
    title: "Host Committee",
    members: [
      { name: "Dr. Papias Niyigena", roles: ["Principal, Rwanda Coding Academy"] },
      { name: "Hirwa Arnold", roles: ["Rwanda Informatics Olympiad"] },
      { name: "Arun Shanmuganathan", roles: ["Founder, African Olympiad Academy"] },
      { name: "Joel Lee", roles: ["Software and Avocado Enthusiast"] },
      { name: "Norbert Ndayisenga", roles: ["Software Engineer, Rwanda Informatics Olympiad Coach"] },
      { name: "Jean Paul Elisa NIYOKWIZERWA", roles: ["Software Engineer, Website Creator"] },
    ],
  },
  {
    title: "International Committee",
    members: [
      { name: "Jennie Oluchi", roles: ["Nigeria Olympiad Program"] },
      { name: "Hirwa Arnold", roles: ["Rwanda Olympiad Program"] },
      { name: "Obed Nsanzimfura", roles: ["Rwanda Olympiad Program"] },
      { name: "Sihine Negede", roles: ["African Olympiad Academy"] },
      { name: "Maya Chouikrat", roles: ["Algerian Olympiad Program"] },
    ],
  },
  {
    title: "Team Leaders",
    members: [
      { name: "Raouf Ould Ali", roles: ["Algeria"] },
      { name: "Dr. Houssein Ahmed Assoweh", roles: ["Djibouti"] },
      { name: "Youssef Khalil", roles: ["Egypt"] },
      { name: "Elias Konadu", roles: ["Ghana"] },
      { name: "Prof James Katende", roles: ["Kenya"] },
      { name: "Sébastian Diarra", roles: ["Mali"] },
      { name: "Dr. Anas Abou El Kalam", roles: ["Morocco"] },
      { name: "Jennie Oluchi", roles: ["Nigeria"] },
      { name: "Etienne Kagaba", roles: ["Rwanda"] },
      { name: "Noah Jacobsen", roles: ["South Africa"] },
      { name: "Mohamed Fares Nebili", roles: ["Tunisia"] },
      { name: "Valentine Sherekete", roles: ["Zimbabwe"] },
      { name: "Ahmad Usman", roles: ["Pakistan (Guest)"] },
    ],
  },
  {
    title: "Coaches",
    members: [
      { name: "Hirwa Arnold", roles: ["Coach"] },
      { name: "Kagaba Etienne", roles: ["Coach"] },
      { name: "Niyokwizera Jean D'Amour", roles: ["Coach"] },
      { name: "Joel Lee", roles: ["Coach"] },
      { name: "Obed Nsanzimfura", roles: ["Coach"] },
      { name: "Norbert Ndayisenga", roles: ["Coach"] },
      { name: "Afsa Umutoniwase", roles: ["Coach"] },
      { name: "Jean Paul Elisa NIYOKWIZERWA", roles: ["Coach"] },
      { name: "Kelly Irakoze Ntawigenga", roles: ["Coach"] },
    ],
  },
];
