# YumPlan – Recipe & Grocery Planner

## Project Overview
YumPlan is a full-stack web application that helps users organize meals in one place. 
Users can create recipes, save them to a database, edit or delete recipes, and discover new meal inspiration through an external API. 
The goal of the app is to make meal planning less stressful and more organized for students, home cooks, and busy individuals.

# Features
- User registration and login authentication
- Logout functionality
- Create recipes
- View saved recipes
- Edit recipes
- Delete recipes
- External API integration using TheMealDB
- Recipe inspiration generator
- Recipe source credit button
- Responsive design for mobile and desktop
- Custom UI styling


# Technologies Used

## Frontend
- React
- React Router
- CSS
- Vite

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL
- Neon Database

## Authentication
- bcrypt
- JSON Web Tokens (JWT)

## External API
- TheMealDB API

## Deployment
- Render (Backend)
- Vercel (Frontend)


# GitHub Repository

https://github.com/Erney100/YumPlan-Final-Project-/


# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Erney100/YumPlan-Final-Project-/
```

---

## Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

---

# Database Schema

## Users Table
Stores registered users:

- id
- username
- email
- password

## Recipes Table
Stores recipe information:

- id
- title
- ingredients
- instructions

---

# Live Deployment

## Frontend URL

https://yum-plan-final-project-qljrxgpue-erney100s-projects.vercel.app/


## Backend URL

https://yumplan-backend.onrender.com/

---

# Reflection Write-Up

Building YumPlan was one of the most challenging projects I have completed because it required me to combine everything I learned throughout the semester into one application. 
At the beginning of the project, I underestimated how difficult it would be to connect a frontend, backend, database, authentication system, external API, and deployment platform all at once.
One of the biggest things I learned was that full-stack development requires a lot of patience and problem solving. 
I spent a significant amount of time debugging issues such as API connection errors, database setup problems, deployment configuration issues, image import errors, and authentication bugs. 
Many problems took multiple attempts to solve, which taught me how important persistence is when developing software.
I am most proud of successfully building a project that feels personal to me. 
I wanted YumPlan to feel fun, colorful, and less stressful than traditional meal planning apps, and I believe I achieved that through the design and user experience choices I made.
If I were to restart this project, I would spend more time planning my backend architecture earlier and fully implementing dynamic grocery list functionality. Even though the project was difficult at times, it helped me better understand what full-stack developers do and made me more confident in my technical abilities.

---

# Design Choices

## Frontend Choice (React + Vite)
I chose React because I wanted a modern frontend framework that made it easier to build reusable components and create a smoother user experience. 
React Router helped me create multiple pages such as Home, Login, Register, Dashboard, and Add Recipe without requiring full page reloads.

Vite helped speed up development by providing fast local builds and hot reloading.

---

## Backend Choice (Node.js + Express)
I selected Node.js and Express because they allowed me to quickly build REST API routes for handling recipe CRUD operations and user authentication. 
Express made it easier to organize my backend into separate route files for recipes, authentication, and grocery functionality.

---

## Database Choice (PostgreSQL + Neon)
I used PostgreSQL with Neon because I needed permanent cloud storage for both users and recipes. 
This was much better than using local storage because users can return later and still access their saved accounts and recipes.

---

## UI/Design Decisions
I intentionally designed YumPlan to feel playful, colorful, and stress-free. 
I used warm colors, rounded buttons, recipe cards, hover animations, food imagery, and responsive layouts to create a fun experience that feels less 
intimidating than traditional meal planning apps.

---

# Challenges

## Connecting Frontend and Backend
One of the biggest challenges was understanding how my React frontend communicates with my Express backend since they were running on separate ports. 
I had to troubleshoot connection issues between localhost ports.

---

## Database Integration
Connecting PostgreSQL through Neon was challenging because I had never worked with cloud databases before. 
I had to learn how environment variables worked and how to properly connect my backend to Neon.

---

## Authentication Implementation
Authentication was one of the hardest features to implement. I originally considered using OAuth, 
but I realized it would take significantly more time to configure. Instead, I built authentication using bcrypt and JWT.

---

## External API Integration
Working with TheMealDB API was difficult because I had trouble understanding how to fetch external data and display it correctly in React.

---

## Deployment Issues
Deployment introduced several unexpected issues such as updating API URLs, configuring environment variables in Render, 
and making sure Vercel pointed to the correct frontend folder.

---

## Image/File Path Errors
I spent time troubleshooting image imports and file naming issues when adding custom food images to the homepage.

---

# Learning Outcomes

Through building YumPlan, I learned:

- How frontend and backend systems communicate through APIs
- How to build REST APIs
- How CRUD operations work
- How authentication works
- How PostgreSQL databases connect to applications
- How to integrate third-party APIs
- How deployment works
- How important debugging is in full-stack development
- How much planning goes into building user-friendly applications

This project helped me better understand full-stack development because I built every layer of the application from frontend design to backend logic and deployment.

---

# Future Work

If I had more time, I would improve YumPlan by adding:

- Fully dynamic grocery list generation
- Favorite recipe functionality
- Drag-and-drop grocery planning
- Nutrition tracking dashboard
- Google OAuth login
- Meal calendar scheduling
- Search/filtering by dietary preferences
- Better meal planning analytics
