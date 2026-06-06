# Feria Web Programming Project

This repository contains a full-stack website built with a React frontend and a Node.js backend.

## Project Structure

- `feria-client/`
  - React app using Vite
  - Client-side pages include Home, About, Article list, Article detail, Auth (login/signup), and Dashboard
  - Uses React Router for navigation and Material UI / Tailwind CSS for UI styling

- `feria-server/`
  - Express.js backend with MongoDB support
  - Handles authentication, article data, and user data via API routes

## Website Overview

The website provides:

- A landing page with featured content and navigation
- Article browsing and detail views
- User authentication (login and signup)
- A dashboard area with reports, user management, and article management
- Responsive layout for client-side navigation

## Getting Started

### Frontend

1. Open a terminal in `feria-client/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Open a terminal in `feria-server/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

> Make sure your backend is configured to connect to a MongoDB database if the server requires one.

## Notes

- The client uses React Router and a layout-based structure for public, auth, and dashboard pages.
- The server includes routes, controllers, models, and middleware for a simple API.
- This repository is designed for learning and development of a full-stack web app.
