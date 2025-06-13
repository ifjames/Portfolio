import { 
  users, 
  projects, 
  contactMessages,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample projects
    this.initializeProjects();
  }

  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "E-Commerce Platform",
        description: "Modern shopping platform with React, Node.js, and Stripe integration",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "Node.js", "Stripe", "MongoDB"],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/example/ecommerce",
        featured: true
      },
      {
        title: "Task Management App",
        description: "Collaborative task management with real-time updates and team features",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Vue.js", "Firebase", "Socket.io"],
        liveUrl: "https://example-tasks.com",
        githubUrl: "https://github.com/example/tasks",
        featured: true
      },
      {
        title: "Analytics Dashboard",
        description: "Data visualization platform with interactive charts and reporting",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["D3.js", "Python", "PostgreSQL"],
        liveUrl: "https://example-analytics.com",
        githubUrl: "https://github.com/example/analytics",
        featured: true
      },
      {
        title: "Social Media Dashboard",
        description: "Unified social media management platform with analytics and scheduling",
        image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "TypeScript", "Node.js", "Redis"],
        liveUrl: "https://example-social.com",
        githubUrl: "https://github.com/example/social",
        featured: false
      },
      {
        title: "Weather App",
        description: "Real-time weather application with location-based forecasts and alerts",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React Native", "OpenWeather API", "SQLite"],
        liveUrl: "https://example-weather.com",
        githubUrl: "https://github.com/example/weather",
        featured: false
      },
      {
        title: "Portfolio Website",
        description: "Responsive portfolio website with modern design and animations",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
        liveUrl: "https://example-portfolio.com",
        githubUrl: "https://github.com/example/portfolio",
        featured: false
      },
      {
        title: "Restaurant Management System",
        description: "Complete restaurant management with order tracking and inventory",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Angular", "Express.js", "MySQL", "Socket.io"],
        liveUrl: "https://example-restaurant.com",
        githubUrl: "https://github.com/example/restaurant",
        featured: false
      },
      {
        title: "Learning Management System",
        description: "Educational platform with course management and progress tracking",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Vue.js", "Django", "PostgreSQL", "AWS S3"],
        liveUrl: "https://example-lms.com",
        githubUrl: "https://github.com/example/lms",
        featured: false
      },
      {
        title: "Fitness Tracker",
        description: "Personal fitness tracking app with workout plans and progress monitoring",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React Native", "Firebase", "Chart.js"],
        liveUrl: "https://example-fitness.com",
        githubUrl: "https://github.com/example/fitness",
        featured: false
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
