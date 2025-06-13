import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiJavascript, 
  SiPython, 
  SiVuedotjs, 
  SiAngular, 
  SiMongodb, 
  SiPostgresql, 
  SiMysql, 
  SiRedis, 
  SiFirebase, 
  SiSocketdotio, 
  SiTailwindcss, 
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiAmazon,
  SiStripe,
  SiFramer
} from "react-icons/si";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'React': SiReact,
    'React Native': SiReact,
    'Node.js': SiNodedotjs,
    'TypeScript': SiTypescript,
    'JavaScript': SiJavascript,
    'Python': SiPython,
    'Vue.js': SiVuedotjs,
    'Angular': SiAngular,
    'MongoDB': SiMongodb,
    'PostgreSQL': SiPostgresql,
    'MySQL': SiMysql,
    'Redis': SiRedis,
    'Firebase': SiFirebase,
    'Socket.io': SiSocketdotio,
    'Tailwind CSS': SiTailwindcss,
    'Next.js': SiNextdotjs,
    'Express.js': SiExpress,
    'Django': SiDjango,
    'AWS': SiAmazon,
    'AWS S3': SiAmazon,
    'Stripe': SiStripe,
    'Framer Motion': SiFramer,
    'D3.js': SiJavascript,
    'Chart.js': SiJavascript,
    'SQLite': SiPostgresql,
    'OpenWeather API': SiJavascript
  };
  
  return iconMap[tech];
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flip-card h-96"
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div className="flip-card-front absolute inset-0 bg-card dark:bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => {
                const IconComponent = getTechIcon(tech);
                return (
                  <Badge key={tech} variant="secondary" className="text-xs flex items-center gap-1">
                    {IconComponent && <IconComponent className="h-3 w-3" />}
                    {tech}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-primary-foreground">
          <h3 className="text-xl font-bold mb-4">{project.title}</h3>
          <p className="text-center mb-6">{project.description}</p>
          <div className="flex space-x-4">
            {project.liveUrl && (
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
