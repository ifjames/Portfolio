import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { ProjectCard } from "@/components/project-card";
import { Mascot } from "@/components/mascot";
import { getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 dark:from-primary/10 dark:via-background dark:to-primary/5"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Glowing Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Mascot */}
            <Mascot />
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm{" "}
              <span className="text-primary">James Castillo</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Full Stack Developer crafting beautiful, functional web experiences
              with modern technologies
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: [1, 1.3, 0.9, 1.2, 1],
                  rotate: [0, 5, -5, 3, 0],
                  transition: { 
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut"
                  }
                }}
                animate={{ rotate: 0 }}
                className="relative"
              >
                <Button asChild size="lg" className="relative overflow-hidden">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: [1, 1.3, 0.9, 1.2, 1],
                  rotate: [0, -5, 5, -3, 0],
                  transition: { 
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut"
                  }
                }}
                animate={{ rotate: 0 }}
                className="relative"
              >
                <Button asChild variant="outline" size="lg" className="relative overflow-hidden">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToProjects}
          >
            <ChevronDown className="text-muted-foreground text-2xl hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects showcasing different technologies
              and design approaches
            </p>
          </motion.div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No featured projects available at the moment.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="link" className="text-primary">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}