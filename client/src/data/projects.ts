export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category?: string;
  // Lock properties
  codeLocked?: boolean;
  codeLockedMessage?: string;
  liveUrlLocked?: boolean;
  liveUrlLockedMessage?: string;
  // Development/Status mode - replaces buttons with status badges
  developmentMode?: boolean;
  developmentMessage?: string;
}

// Global setting to override all individual lock settings
export const EVERYTHING_LOCKED = false; // Set to true to lock all projects globally

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Kolekta",
    description: "A comprehensive collection management system built with React and Firebase, featuring real-time data synchronization and robust backend powered by Node.js",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Firebase", "Node.js"],
    liveUrl: "https://projectkolekta.web.app/",
    featured: true,
    category: "Web Development"
  },
  {
    id: 2,
    title: "Driving School Platform",
    description: "A clean and intuitive driving school management platform built with vanilla web technologies and Firebase for seamless user experience",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["HTML", "CSS", "Firebase"],
    liveUrl: "https://driving-5488c.web.app/",
    featured: true,
    category: "Web Development"
  },
  {
    id: 3,
    title: "Project Kamay",
    description: "Full-stack application combining React frontend with Express.js backend and Firebase integration for efficient data management and user authentication",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Firebase", "Express.js"],
    liveUrl: "https://projectkamay.web.app/",
    featured: true,
    category: "Web Development"
  },
  {
    id: 4,
    title: "Ubian Food Hub",
    description: "Dynamic food ordering and management platform featuring React components, Firebase backend, and Express.js API for seamless restaurant operations",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Firebase", "Express.js"],
    liveUrl: "https://ubianfoodhub.web.app/",
    featured: true,
    category: "Web Development"
  },
  {
    id: 5,
    title: "Decoblu USA",
    description: "International client project delivering a modern e-commerce solution with React frontend and Node.js backend for seamless user experience and business operations",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js"],
    liveUrl: "https://decobluusa.com/",
    featured: true,
    category: "Web Development"
  }
];

// Helper functions for easy project management
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: string) => projects.filter(project => project.category === category);
