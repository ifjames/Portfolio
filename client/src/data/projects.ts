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
export const EVERYTHING_LOCKED = true; // Set to true to lock all projects globally

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Shop Platform",
    description: "Modern shopping platform with React, Node.js, and Stripe integration",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js", "Stripe", "MongoDB"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true,
    category: "Web Development",
    developmentMode: true,
    developmentMessage: "In Active Development"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Vue.js", "Firebase", "Socket.io"],
    liveUrl: "https://example-tasks.com",
    githubUrl: "https://github.com/example/tasks",
    featured: true,
    category: "Web Development",
    codeLocked: true,
    codeLockedMessage: "Private Repository"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Data visualization platform with interactive charts and reporting",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["D3.js", "Python", "PostgreSQL"],
    liveUrl: "https://example-analytics.com",
    githubUrl: "https://github.com/example/analytics",
    featured: true,
    category: "Data Visualization",
    liveUrlLocked: true,
    liveUrlLockedMessage: "In Development"
  },
  {
    id: 4,
    title: "Weather Mobile App",
    description: "React Native weather app with location-based forecasts",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React Native", "OpenWeather API", "SQLite"],
    liveUrl: "https://example-weather.com",
    githubUrl: "https://github.com/example/weather-app",
    featured: false,
    category: "Mobile Development",
    developmentMode: true,
    developmentMessage: "Beta Testing"
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Real-time messaging platform with file sharing and group chats",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Socket.io", "Express.js", "MongoDB", "React"],
    liveUrl: "https://example-chat.com",
    githubUrl: "https://github.com/example/chat-app",
    featured: false,
    category: "Web Development",
    codeLocked: true,
    codeLockedMessage: "Proprietary Code",
    liveUrlLocked: true,
    liveUrlLockedMessage: "Coming Soon"
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern web technologies",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example-portfolio.com",
    githubUrl: "https://github.com/example/portfolio",
    featured: false,
    category: "Web Development",
    liveUrlLocked: true,
    liveUrlLockedMessage: "Work in Progress"
  }
];

// Helper functions for easy project management
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: string) => projects.filter(project => project.category === category);
