// PAIO 2026 administration: IC / ISC / ITC, plus delegation Team / Deputy leaders.
// ISC portraits reused from PAIO 2025 where available; IC/ITC reuse existing local
// snapshots. New IC portraits: Abinew (Google Scholar). Wendy and Martin pending.
import type { AdministrationGroup } from "@/domain/edition";

export const administration: AdministrationGroup[] = [
  {
    title: "International Committee",
    members: [
      {
        name: "Hirwa Arnold",
        roles: ["Chairman", "Rwanda Olympiad Foundation"],
        image: "/images/hirwa.jpeg",
      },
      {
        name: "Obed Nsanzimfura",
        roles: ["Rwanda Olympiad Foundation"],
        image: "/images/obed.webp",
      },
      {
        name: "Wendy Essuman",
        roles: ["African Olympiad Academy"],
      },
      {
        name: "Abinew Ali Ayele",
        roles: ["University of Hamburg"],
        image: "/images/administration/abinew-ali-ayele.jpg",
      },
      {
        name: "Martin Mungai",
        roles: ["CEMASTEA, Kenya"],
      },
    ],
  },
  {
    title: "International Scientific Committee",
    members: [
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
    ],
  },
  {
    title: "International Technical Committee",
    members: [
      {
        name: "Jean Paul Elisa NIYOKWIZERWA",
        roles: ["Rwanda Computing Olympiad"],
        image: "/images/administration/jean-paul.jpg",
      },
      {
        name: "Niyokwizera Jean D'Amour",
        roles: ["Rwanda Computing Olympiad"],
        image: "/images/brojeid.webp",
      },
      {
        name: "Etienne Kagaba",
        roles: ["Rwanda Computing Olympiad"],
        image: "/images/kagaba.webp",
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
        name: "Raouf Ould Ali",
        roles: ["Algeria"],
        image: "/images/administration/raouf.png",
      },
    ],
  },
  {
    title: "Team Leaders",
    members: [
      { name: "Youssef Khalil", roles: ["Egypt"], image: "/images/editions/2026/egypt-khalil-team-leader.jpg" },
      { name: "Ágnes", roles: ["Hungary"], image: "/images/editions/2026/hungary-agnes-team-leader.jpg" },
      { name: "Jennie Oluchi", roles: ["Nigeria"], image: "/images/editions/2026/nigeria-oluchi-team-leader.jpg" },
      { name: "Mohamed", roles: ["Saudi Arabia"], image: "/images/editions/2026/saudi-arabia-mohamed-team-leader.jpg" },
      { name: "Kerim", roles: ["Turkmenistan"], image: "/images/editions/2026/turkmenistan-kerim-team-leader.jpg" },
      { name: "Valentine Sherekete", roles: ["Zimbabwe"], image: "/images/editions/2026/zimbabwe-valentine-team-leader.jpg" },
    ],
  },
  {
    title: "Deputy Leaders",
    members: [
      { name: "Zsolt", roles: ["Hungary"], image: "/images/editions/2026/hungary-zsolt-deputy-leader.jpg" },
      { name: "Mousa", roles: ["Libya"], image: "/images/editions/2026/libya-mousa-deputy-leader.jpg" },
      { name: "Mohamed", roles: ["Morocco"], image: "/images/editions/2026/morocco-mohamed-deputy-leader.jpg" },
      { name: "Sarah", roles: ["Nigeria"], image: "/images/editions/2026/nigeria-sarah-deputy-leader.jpg" },
      { name: "Kemal", roles: ["Turkmenistan"], image: "/images/editions/2026/turkmenistan-kemal-deputy-leader.jpg" },
    ],
  },
];
