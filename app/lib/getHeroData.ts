import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export type HeroData = {
  projects: number;
  experience: number;
  cv: string | null;
};

export async function getHeroData(): Promise<HeroData> {
  // Experience
  const expSnap = await getDoc(doc(db, "experience", "main"));

  const projects = expSnap.exists()
    ? expSnap.data().projects ?? 0
    : 0;

  const experience = expSnap.exists()
    ? expSnap.data().years ?? 0
    : 0;

  // CV
  const cvSnap = await getDoc(doc(db, "cv", "main"));

  const cv = cvSnap.exists()
    ? cvSnap.data().url ?? null
    : null;

  return {
    projects,
    experience,
    cv,
  };
}
