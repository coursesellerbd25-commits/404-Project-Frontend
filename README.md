# 404 Assessment Frontend

Frontend for the **404 Assessment**, built with **React, TypeScript, Vite, Tailwind CSS, Zustand, React Konva, and React Router**.

This application provides a modern Kanban task management system with an image annotation module that allows users to upload images and draw polygon annotations.

---

# Live Demo

Frontend: **(Add your deployed frontend URL here)**

Backend API: **(Add your deployed backend URL here)**

---

# Features

## Authentication

- JWT Login
- Protected API requests
- Token storage using Local Storage

---

## Task Management

- Create tasks
- Edit tasks
- Delete tasks
- Kanban board
- Drag & Drop between columns
- Date filtering
- Task priorities
- Tags
- Due dates

---

## Image Annotation

- Upload images
- Preview uploaded images
- Image slider
- Previous / Next navigation
- Draw polygons
- Save polygon annotations
- Load saved polygons
- Delete polygons
- Persistent annotations after refresh

---

## UI Features

- Responsive layout
- Hover animations
- Smooth transitions
- Modern card design
- Empty states
- Loading states
- Error handling

---

# Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Zustand
- React Hook Form
- Zod
- React Konva
- use-image
- @dnd-kit/core

---

# Folder Structure

```
src/
│
├── assets/
│
├── components/
│   ├── annotation/
│   ├── tasks/
│   ├── Navbar.tsx
│   ├── DateSelector.tsx
│   ├── KanbanBoard.tsx 
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── TasksPage.tsx
│   └── AnnotationPage.tsx
│
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── task.ts
│   ├── image.ts
│   └── polygon.ts
│
├── store/
│   └── useTaskStore.ts
├── types/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Installation

Clone the repository

```bash
git clone <frontend-repository-url>
```

Go to the project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For production, update it to your deployed backend API.

---

# Run Development Server

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

Preview build

```bash
npm run preview
```

---

# Main Pages

| Route | Description |
|--------|-------------|
| / | Redirects to login |
| /login | User login |
| /tasks | Kanban task board |
| /annotations | Image annotation page |

---

# API Integration

The frontend communicates with the Django REST backend using Axios.

Main endpoints include:

```
POST /api/login/

GET /api/tasks/
POST /api/tasks/
PUT /api/tasks/:id/
DELETE /api/tasks/:id/

POST /api/annotations/upload/

GET /api/annotations/polygon/
POST /api/annotations/polygon/
DELETE /api/annotations/polygon/:id/
```

---

# State Management

Zustand is used for:

- Task state
- Selected date
- Modal state
- API fetching

---

# Image Annotation Workflow

```
Upload Image
      │
      ▼
Select Image
      │
      ▼
Draw Polygon
      │
      ▼
Save Annotation
      │
      ▼
Stored in Backend
      │
      ▼
Reload Page
      │
      ▼
Annotation Persists
```

---

# Challenges

During development several technical challenges were encountered, including:

- Implementing JWT authentication
- Synchronizing Kanban updates with the backend
- Integrating drag-and-drop functionality
- Managing application state with Zustand
- Building an image annotation interface using React Konva
- Persisting polygon annotations after page refresh
- Filtering tasks dynamically by date
- Managing image navigation with a slider

---

# Solutions

These challenges were addressed by:

- Using Django REST Framework with JWT authentication
- Creating reusable API service modules
- Implementing Zustand for centralized state management
- Separating API logic from UI components
- Using React Konva for interactive canvas rendering
- Persisting annotations through backend APIs
- Structuring components for maintainability and scalability

---

# Package Versions

Example versions used:

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Zustand
- React Hook Form
- Zod
- React Konva
- use-image
- @dnd-kit/core

(Refer to package.json for exact versions.)

---

# Deployment

Frontend can be deployed using:

- Vercel
- Netlify

Ensure the backend API URL is correctly configured in the environment variables before deployment.

---

# Future Improvements

- Edit existing polygons
- Polygon labels
- Undo/Redo support
- Zoom and pan for canvas
- Dark mode
- Skeleton loaders
- Toast notifications
- User profiles
- Search and filtering enhancements

---

# Author

**Sultana Jahan Tahmina**

Full Stack Web Developer

GitHub: https://github.com/coursesellerbd25-commits

LinkedIn: www.linkedin.com/in/sultana-jahan-tahmina-621aa2243

Portfolio: https://coursesellerbd25-commits.github.io/My-Portfolio-2025/

Email: sultanajahantahmina19@gmail.com