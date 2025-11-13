# Portfolio Project

## Overview
This is a full-stack portfolio website built with React, TypeScript, Express, and Vite. The project is configured to run on Replit for development and deploy to Vercel for production.

## Project Architecture

### Frontend (Client)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion

### Backend
- **Development (Replit)**: Express.js server (`server/`)
- **Production (Vercel)**: Serverless functions (`api/`)

### Email Service
- **Provider**: Brevo (free tier - 1,000 emails/month)
- **Configuration**: Requires `BREVO_API_KEY` environment variable
- **Recipient**: jamesmatthewcastillo4@gmail.com

## Key Features
- Portfolio showcase with project cards
- Contact form with email notifications
- Dark/light theme support
- Responsive design
- Notification system

## Development (Replit)
The Express server handles API routes during development:
- Contact form endpoint: `/api/contact`
- Projects endpoint: `/api/projects`

## Production (Vercel)
Serverless functions in `/api` folder handle API requests:
- `api/contact.ts` - Handles contact form submissions using Brevo

## Environment Variables Required for Vercel

### Required:
- `BREVO_API_KEY` - Brevo API key for sending emails

### Setup Instructions:
1. Sign up at https://www.brevo.com/
2. Get API key from Settings → SMTP & API → API Keys
3. Add to Vercel project environment variables

## Recent Changes
- **2025-01-13**: Restructured backend for Vercel deployment compatibility
- **2025-01-13**: Added Brevo email integration for serverless contact form
- **2025-01-13**: Created vercel.json configuration
- **2025-01-13**: Migrated from Replit Agent to Replit environment

## Deployment

### Vercel Deployment:
1. Push code to GitHub
2. Connect repository to Vercel
3. Add `BREVO_API_KEY` environment variable
4. Deploy

### Replit Publishing:
- Can be published directly from Replit using the Publish button

## User Preferences
- Prefers Vercel for production deployment
- Email recipient: jamesmatthewcastillo4@gmail.com
- Free tier email service (Brevo)