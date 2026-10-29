import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export type Project = {
  id: string;
  name: string;
  description: string;
  img: string | null;
  video?: string | null;
  category_id: string;
  git_link?: string;
  live_link?: string;
  view_live_id: string;
  usecase_pdf?: string | null;
};

export async function getProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "projects"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    // createdAt is a Firestore Timestamp (not a plain object), so it can't be
    // passed to Client Components; it's only needed for the orderBy above.
    const data = doc.data();
    delete data.createdAt;
    return {
      id: doc.id,
      ...(data as Omit<Project, "id">),
    };
  });
}
