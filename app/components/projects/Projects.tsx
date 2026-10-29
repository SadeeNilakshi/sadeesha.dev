import { getProjects } from "@/lib/getProjects";
import { getVisibleCaseStudies } from "@/data/caseStudies";
import { videoPoster } from "@/lib/media";
import SectionHeading from "../SectionHeading";
import FeaturedWork from "./FeaturedWork";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const projects = await getProjects();

  // Only what the featured cards need (the full case study lives on its own page)
  const featured = getVisibleCaseStudies().map((cs) => ({
    slug: cs.slug,
    title: cs.title,
    category: cs.category,
    platform: cs.platform,
    summary: cs.summary,
    tools: cs.tools,
    cover: cs.cover.image ?? (cs.cover.video ? videoPoster(cs.cover.video, 1200) : undefined),
    draft: !cs.published,
  }));

  return (
    <section id="projects" className="px-6 py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Selected work"
          title="Things I’ve designed & built"
          description="Real-world solutions, pixel-perfect designs, and interactive experiences."
        />

        {featured.length > 0 && <FeaturedWork caseStudies={featured} />}

        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}
