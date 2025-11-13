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
  // Private access - users can visit but not create accounts
  privateAccess?: boolean;
  privateAccessMessage?: string;
}

// Global setting to override all individual lock settings
export const EVERYTHING_LOCKED = false; // Set to true to lock all projects globally

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Kolekta",
    description:
      "Real-time peer-to-peer cash exchange platform for commuters. Matches users who need change with those who have it. Features real-time matching, safe meetup coordination, and community-driven exchange system - perfect for getting exact fare for transportation.",
    image:
      "https://api.imghippo.com/files/ltaY8185nP.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Firebase", "Node.js"],
    liveUrl: "https://projectkolekta.web.app/",
    featured: false,
    category: "Web Development",
  },
  {
    id: 2,
    title: "James LTO Online Reviewer",
    description:
      "Comprehensive LTO (Land Transportation Office) exam preparation platform. Features mock exams, practice quizzes, progress tracking, and study materials for Philippine driver's license examinations. Includes road signs, traffic rules, and safety guidelines for both non-professional and professional drivers.",
    image:
      "https://api.imghippo.com/files/ZTr1822YbE.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["HTML", "CSS", "Firebase"],
    liveUrl: "https://driving-5488c.web.app/",
    featured: false,
    category: "Web Development",
  },
  {
    id: 3,
    title: "BigKAS - Filipino Dialect Learning",
    description:
      "Educational platform dedicated to learning and preserving Filipino dialects. Provides interactive lessons and resources to help users learn various Philippine languages with cultural appreciation and respect for linguistic diversity.",
    image:
      "https://api.imghippo.com/files/XDXS5776SxE.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Firebase", "Express.js"],
    liveUrl: "https://projectkamay.web.app/",
    featured: true,
    category: "Web Development",
  },
  {
    id: 4,
    title: "UB FoodHub",
    description:
      "University of Batangas food ordering and management platform. Streamlines the campus dining experience with real-time menu browsing, order management, and delivery coordination for students and staff.",
    image:
      "https://api.imghippo.com/files/TRzJ7014DKw.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Firebase", "Express.js"],
    liveUrl: "https://ubianfoodhub.web.app/",
    featured: true,
    category: "Web Development",
    privateAccess: true,
    privateAccessMessage: "University of Batangas Students Only.",
  },
  {
    id: 5,
    title: "DecoBlu USA",
    description:
      "Professional e-commerce platform for architectural finish solutions. Showcases premium products including INFeel architectural films, luxury vinyl flooring, window films, and interior decoration materials. Features detailed product catalogs, specifications, and professional consultation services for commercial and residential projects.",
    image:
      "https://api.imghippo.com/files/aYm6780fA.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js"],
    liveUrl: "https://decobluusa.com/",
    featured: true,
    category: "Web Development",
  },
];

// Helper functions for easy project management
export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: string) =>
  projects.filter((project) => project.category === category);
