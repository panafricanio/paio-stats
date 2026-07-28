// PAIO 2026 delegation leaders (Team / Deputy), snapshotted from the
// shared Drive photo dump. Filenames use Country_Name_Role; names without a
// fuller known form are taken from the image filename. Photos live under
// /public/images/editions/2026.
import type { AdministrationGroup } from "@/domain/edition";

export const administration: AdministrationGroup[] = [
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
