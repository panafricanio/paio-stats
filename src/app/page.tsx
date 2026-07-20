import { statsService } from "@/services";
import HomeView from "@/features/home/HomeView";

export default async function HomePage() {
  const editions = await statsService.listEditions();
  return <HomeView editions={editions} />;
}
