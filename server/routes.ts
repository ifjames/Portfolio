import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendContactEmail, verifyEmailConfig } from "./email";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get featured projects
  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Send contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Save message to database
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification
      try {
        await sendContactEmail(validatedData);
        console.log("Contact message received and email sent:", message);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue even if email fails - message is still saved
      }
      
      res.json({ message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: 'Message is required' });
      }

      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      if (!OPENAI_API_KEY) {
        return res.status(500).json({ 
          message: 'AI service not configured' 
        });
      }

      const PORTFOLIO_CONTEXT = `
You are a friendly AI assistant for James Matthew Castillo's portfolio website. You help visitors learn about James and his work.

About James:
- Full-stack developer based in Batangas City, Philippines
- 5+ years of experience in web development
- Specializes in React, Node.js, TypeScript, and modern web technologies
- Available for local Philippine projects and international remote work
- Works in Philippine Time (PHT/GMT+8) but flexible with scheduling
- Email: jamesmatthewcastillo4@gmail.com
- Phone: +63 960 381 8382

Projects Portfolio:

1. Project Kolekta
   - Description: Real-time peer-to-peer cash exchange platform for commuters
   - Technologies: React, Firebase, Node.js
   - Features: Real-time matching, safe meetup coordination, community-driven exchange
   - Live URL: https://projectkolekta.web.app/
   - Category: Web Development

2. James LTO Online Reviewer
   - Description: Comprehensive LTO exam preparation platform for Philippine driver's license
   - Technologies: HTML, CSS, Firebase
   - Features: Mock exams, practice quizzes, progress tracking, study materials
   - Covers road signs, traffic rules, and safety guidelines
   - Live URL: https://driving-5488c.web.app/
   - Category: Web Development

3. BigKAS - Filipino Dialect Learning
   - Description: Educational platform for learning and preserving Filipino dialects
   - Technologies: React, Firebase, Express.js
   - Features: Interactive lessons, cultural appreciation, linguistic diversity
   - Live URL: https://projectkamay.web.app/
   - Category: Web Development
   - Status: Featured Project

4. UB FoodHub
   - Description: University of Batangas food ordering and management platform
   - Technologies: React, Firebase, Express.js
   - Features: Real-time menu browsing, order management, delivery coordination
   - Live URL: https://ubianfoodhub.web.app/
   - Category: Web Development
   - Status: Featured Project, Client Project (University of Batangas Students Only)
   - Note: Account creation restricted to UB students and staff

5. DecoBlu USA
   - Description: Professional e-commerce platform for architectural finish solutions
   - Technologies: React, Node.js
   - Products: INFeel architectural films, luxury vinyl flooring, window films, interior decoration
   - Features: Product catalogs, specifications, professional consultation services
   - Live URL: https://decobluusa.com/
   - Category: Web Development
   - Status: Featured Project

General Skills & Technologies:
- Frontend: React, Vue.js, Angular, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, Python
- Databases: PostgreSQL, MongoDB, Firebase
- Cloud & DevOps: AWS, Docker
- Tools: Git, Webpack, Vite

Availability & Contact:
- Currently available for new projects and job opportunities
- Open to both local and remote work
- Flexible with international time zones
- Contact through the website's contact form, email, or phone

Instructions:
- Be friendly, professional, and helpful
- When asked about projects, provide specific details about technologies, features, and purpose
- If asked about a specific project, give comprehensive information
- Encourage visitors to check out the live projects or contact James
- If you don't know something, be honest and suggest they contact James directly
- Keep responses concise but informative
`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: PORTFOLIO_CONTEXT
          },
          {
            role: "user",
            content: message
          }
        ],
        max_completion_tokens: 500,
      });

      const botReply = response.choices[0].message.content;

      res.json({ message: botReply });

    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        message: 'Sorry, I encountered an error. Please try again.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
