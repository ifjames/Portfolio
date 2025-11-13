import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
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

  SiStripe,
  SiFramer
} from "react-icons/si";
import type { Project } from "@/data/projects";
import { EVERYTHING_LOCKED } from "@/data/projects";

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
    'AWS': SiJavascript,
    'AWS S3': SiJavascript,
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
  const [showCodeLocked, setShowCodeLocked] = useState(false);
  const [showLiveLocked, setShowLiveLocked] = useState(false);
  const [showPrivateAccessDialog, setShowPrivateAccessDialog] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // Determine if project should be in locked/development mode
  const isEverythingLocked = EVERYTHING_LOCKED;
  const isInDevelopmentMode = project.developmentMode || isEverythingLocked; // Show badge mode if in development OR everything is locked
  const isCodeLocked = isEverythingLocked || project.codeLocked;
  const isLiveUrlLocked = isEverythingLocked || project.liveUrlLocked;

  const handleCodeClick = () => {
    if (isCodeLocked && !isInDevelopmentMode) {
      setShowCodeLocked(true);
      setTimeout(() => setShowCodeLocked(false), 2000); // Revert after 2 seconds
    }
  };

  const handleLiveClick = () => {
    if (isLiveUrlLocked && !isInDevelopmentMode) {
      setShowLiveLocked(true);
      setTimeout(() => setShowLiveLocked(false), 2000); // Revert after 2 seconds
    }
  };

  const handlePrivateAccessClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setPendingUrl(url);
    setShowPrivateAccessDialog(true);
  };

  const confirmPrivateAccess = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    }
    setShowPrivateAccessDialog(false);
    setPendingUrl(null);
  };
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
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            {project.privateAccess && (
              <div className="absolute top-2 right-2">
                <Badge 
                  variant="secondary" 
                  className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex items-center gap-1"
                  data-testid={`badge-private-access-${project.id}`}
                >
                  <ShieldAlert className="w-3 h-3" />
                  Private Access
                </Badge>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            {project.privateAccess && (
              <p className="text-xs text-amber-700 dark:text-amber-400 mb-3 flex items-start gap-1">
                <ShieldAlert className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{project.privateAccessMessage || "Restricted access - account creation limited"}</span>
              </p>
            )}
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
          <p className="text-center mb-4">{project.description}</p>
          {project.privateAccess && (
            <div className="mb-4">
              <Badge 
                variant="secondary" 
                className="bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-600 text-xs px-3 py-1"
              >
                <ShieldAlert className="w-3 h-3 mr-1" />
                {project.privateAccessMessage || "Private Access Only"}
              </Badge>
            </div>
          )}
          {/* Development Mode - Show status badge instead of buttons */}
          {isInDevelopmentMode ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              <Badge 
                variant="secondary" 
                className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm px-4 py-2 border border-slate-200 dark:border-slate-700"
              >
                <Lock className="w-4 h-4 mr-2" />
                {isEverythingLocked ? "Locked" : (project.developmentMessage || "In Development")}
              </Badge>
            </motion.div>
          ) : (
            /* Normal Mode - Show buttons */
            <div className="flex space-x-4">
              {(project.liveUrl || isLiveUrlLocked) && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, 3, -3, 2, 0] }}
                  animate={{ rotate: 0 }}
                >
                  {isLiveUrlLocked ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-2 border-background overflow-hidden"
                      onClick={handleLiveClick}
                    >
                      <AnimatePresence mode="wait">
                        {showLiveLocked ? (
                          <motion.div
                            key="locked"
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            {isEverythingLocked ? "Everything Locked" : (project.liveUrlLockedMessage || "Locked")}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="normal"
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  ) : (
                    <>
                      {project.privateAccess ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-2 border-background"
                          onClick={(e) => handlePrivateAccessClick(e, project.liveUrl!)}
                          data-testid={`button-live-demo-${project.id}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      ) : (
                        <Button
                          asChild
                          variant="secondary"
                          size="sm"
                          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-2 border-background"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`button-live-demo-${project.id}`}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </>
                  )}
                </motion.div>
              )}
              {(project.githubUrl || isCodeLocked) && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, -3, 3, -2, 0] }}
                  animate={{ rotate: 0 }}
                >
                  {isCodeLocked ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-background bg-transparent text-background hover:bg-background hover:text-foreground overflow-hidden"
                      onClick={handleCodeClick}
                    >
                      <AnimatePresence mode="wait">
                        {showCodeLocked ? (
                          <motion.div
                            key="locked"
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            {isEverythingLocked ? "Everything Locked" : (project.codeLockedMessage || "Locked")}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="normal"
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-2 border-background bg-transparent text-background hover:bg-background hover:text-foreground"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Private Access Dialog */}
      <AlertDialog open={showPrivateAccessDialog} onOpenChange={setShowPrivateAccessDialog}>
        <AlertDialogContent data-testid="dialog-private-access">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              Private Access Project
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This project has restricted access for account creation and certain features.
              </p>
              {project.privateAccessMessage && (
                <p className="text-amber-700 dark:text-amber-400 font-medium">
                  {project.privateAccessMessage}
                </p>
              )}
              <p>
                You can still view the project, but you may need to contact me for full access or account creation.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-private-access">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmPrivateAccess}
              data-testid="button-continue-private-access"
            >
              Continue to Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
