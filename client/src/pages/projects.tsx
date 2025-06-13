import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const [showAll, setShowAll] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const allTechnologies = projects ? 
    projects.reduce((acc: string[], project) => {
      project.technologies.forEach(tech => {
        if (!acc.includes(tech)) acc.push(tech);
      });
      return acc;
    }, []) : [];

  const filteredProjects = projects?.filter(project => {
    if (selectedTech && !project.technologies.includes(selectedTech)) {
      return false;
    }
    if (!showAll && !project.featured) {
      return false;
    }
    return true;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {showAll ? "All Projects" : "Featured Work"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {showAll 
              ? "Complete portfolio showcasing my skills across different technologies" 
              : "Here are some of my recent projects showcasing different technologies and design approaches"
            }
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Button
            variant={showAll ? "default" : "outline"}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showAll ? "Show Featured Only" : "Show All Projects"}
          </Button>
          
          {showAll && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTech === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTech(null)}
              >
                All Technologies
              </Button>
              {allTechnologies.map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTech === tech ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTech(tech)}
                >
                  {tech}
                </Button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button 
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
