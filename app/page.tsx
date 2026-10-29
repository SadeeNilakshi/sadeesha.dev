import { getHeroData } from "./lib/getHeroData";
import ScrollLayout from "./components/layout/ScrollLayout";
import Projects from "./components/projects/Projects";

// Serve a cached page and refresh the Firestore data in the background every
// 10 minutes. If Firestore is unreachable, visitors keep getting the last good page.
export const revalidate = 600;

export default async function Home() {
  const heroData = await getHeroData();

  return <ScrollLayout heroData={heroData} projects={<Projects />} />;
}

