import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const skills = {
  frontend: ["React", "Vue.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS", "SASS"],
  backend: ["Node.js", "Python", "PHP", "MongoDB", "PostgreSQL", "AWS", "Docker", "CI/CD"],
};

export default function About() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm James Matthew Castillo, a passionate full-stack developer with 5+ years of experience
              building modern web applications. I love creating user-centered
              designs and writing clean, efficient code.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or enjoying the great
              outdoors with my camera.
            </p>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-primary">Frontend</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {skills.frontend.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-primary">Backend</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {skills.backend.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Button className="inline-flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pl-12"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
              alt="Alex Johnson professional headshot"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
