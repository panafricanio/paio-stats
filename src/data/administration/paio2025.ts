// PAIO 2025 organising side, gathered from the official PAIO 2025 website
// (panafricanio/paio_new: data/committeeMembers.ts + data/coaches.ts).
// Photos are snapshotted locally under /public/images to avoid depending on
// expiring external URLs. Members without a reliable photo fall back to initials.
import type { AdministrationGroup } from "@/domain/edition";

export const paio2025Administration: AdministrationGroup[] = [
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
      { name: "Hirwa Arnold", roles: ["Rwanda Informatics Olympiad"], image: "/images/hirwa.jpeg" },
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
        roles: ["Software Engineer, Rwanda Informatics Olympiad Coach"],
        image: "/images/norbert.webp",
      },
      {
        name: "Jean Paul Elisa NIYOKWIZERWA",
        roles: ["Software Engineer, Technical Expert"],
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
      { name: "Hirwa Arnold", roles: ["Rwanda Olympiad Program"], image: "/images/hirwa.jpeg" },
      { name: "Obed Nsanzimfura", roles: ["Rwanda Olympiad Program"], image: "/images/obed.webp" },
      { name: "Sihine Negede", roles: ["African Olympiad Academy"] },
      {
        name: "Maya Chouikrat",
        roles: ["Algerian Olympiad Program"],
        image: "/images/administration/maya.jpg",
      },
    ],
  },
  {
    title: "Team Leaders",
    members: [
      { name: "Raouf Ould Ali", roles: ["Algeria"], image: "/images/administration/raouf.png" },
      { name: "Dr. Houssein Ahmed Assoweh", roles: ["Djibouti"], image: "/images/DrHoussein.jpg" },
      { name: "Youssef Khalil", roles: ["Egypt"], image: "/images/administration/youssef-khalil.png" },
      { name: "Elias Konadu", roles: ["Ghana"] },
      { name: "Prof James Katende", roles: ["Kenya"], image: "/images/katende.jpeg" },
      { name: "Sébastian Diarra", roles: ["Mali"] },
      { name: "Dr. Anas Abou El Kalam", roles: ["Morocco"], image: "/images/administration/anas.png" },
      { name: "Jennie Oluchi", roles: ["Nigeria"], image: "/images/administration/jennie-oluchi.png" },
      { name: "Etienne Kagaba", roles: ["Rwanda"], image: "/images/kagaba.webp" },
      { name: "Noah Jacobsen", roles: ["South Africa"], image: "/images/administration/noah.jpeg" },
      { name: "Mohamed Fares Nebili", roles: ["Tunisia"], image: "/images/administration/fares-nebili.png" },
      { name: "Valentine Sherekete", roles: ["Zimbabwe"], image: "/images/sherekete.jpeg" },
      { name: "Ahmad Usman", roles: ["Pakistan (Guest)"], image: "/images/administration/ahmad-usman.png" },
    ],
  },
  {
    title: "Coaches",
    members: [
      { name: "Hirwa Arnold", roles: ["Coach"], image: "/images/hirwa.jpeg" },
      { name: "Kagaba Etienne", roles: ["Coach"], image: "/images/kagaba.webp" },
      { name: "Niyokwizera Jean D'Amour", roles: ["Coach"], image: "/images/brojeid.webp" },
      { name: "Joel Lee", roles: ["Coach"], image: "/images/joel.webp" },
      { name: "Obed Nsanzimfura", roles: ["Coach"], image: "/images/obed.webp" },
      { name: "Norbert Ndayisenga", roles: ["Coach"], image: "/images/norbert.webp" },
      { name: "Afsa Umutoniwase", roles: ["Coach"], image: "/images/Afsa.webp" },
      {
        name: "Jean Paul Elisa NIYOKWIZERWA",
        roles: ["Coach"],
        image: "/images/administration/jean-paul.jpg",
      },
      { name: "Kelly Irakoze Ntawigenga", roles: ["Coach"], image: "/images/kelly.webp" },
    ],
  },
];
