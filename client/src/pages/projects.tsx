import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getAllProjects, getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  
  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();
  
  // Show featured first, then all projects when showAll is true
  const filteredProjects = showAll ? allProjects : featuredProjects;

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

        <motion.div 
          key={showAll ? 'all-projects' : 'featured-projects'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2"
              >
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setShowAll(false)}
                variant="outline"
                className="flex items-center gap-2"
              >
                Show Featured Only
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
