
import { getHeroData } from "./lib/getHeroData";
import ScrollLayout from "./components/layout/ScrollLayout";

export default async function Home() {
  const heroData = await getHeroData();

  return <ScrollLayout heroData={heroData} />;
}

