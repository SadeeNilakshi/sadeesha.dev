import { getProjects } from "@/lib/getProjects";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-12 text-white">
      <ProjectsClient projects={projects} />
    </section>
  );
}
