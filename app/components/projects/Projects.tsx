import { getProjects } from "@/lib/getProjects";
import Reveal from "../motion/Reveal";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="px-6 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center">
          <h2 className="text-2xl font-lato">Projects</h2>
          <p className="text-white/70 mt-2">
            Real-world solutions, pixel-perfect designs, and interactive experiences.
          </p>
        </Reveal>

        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}
