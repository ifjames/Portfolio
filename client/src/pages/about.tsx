import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const skills = {
  frontend: ["React", "Vue.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS", "SASS"],
  backend: ["Node.js", "Python", "PHP", "MongoDB", "PostgreSQL", "AWS", "Docker", "CI/CD"],
};

export default function About() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">About Me</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 lg:mb-6">
              I'm James Matthew Castillo, a passionate full-stack developer with 5+ years of experience
              building modern web applications. I love creating user-centered
              designs and writing clean, efficient code.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 lg:mb-8">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or enjoying the great
              outdoors with my camera.
            </p>

            {/* Skills */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 lg:mb-4">Technical Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
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

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, 5, -5, 3, 0] }}
              animate={{ rotate: 0 }}
            >
              <Button className="inline-flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 lg:pl-12 mb-8 lg:mb-0"
          >
            <img
              src="https://i.ibb.co/Lzg00ZW3/454890869-1551467882442501-6964452098914490991-n.jpg&auto=format&fit=crop&w=600&h=600"
              alt="James profile"
              className="rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
