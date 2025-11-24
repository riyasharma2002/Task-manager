# Task Management Application - Full Stack Project

This is a full-stack task management application built for the Cent Stage assessment. The project consists of two separate repositories: a backend API and a frontend application.

## Project Structure

```
Notesapp/
├── backend/          # Node.js + Express + PostgreSQL API
└── frontend/         # Next.js + Tailwind CSS Frontend
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

4. Create PostgreSQL database:
   ```bash
   createdb taskmanager
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **Jest** - Testing framework
- **Docker** - Containerization (bonus)

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **SWR** - Data fetching and caching

## Features Implemented

### Backend 
- RESTful API with CRUD operations
- Task model: id, title, description, status, createdAt
- PostgreSQL database with Sequelize ORM
- Unit and integration tests with Jest
- Docker support with Dockerfile and docker-compose.yml
- CORS enabled for frontend communication

### Frontend 
- Responsive UI with Tailwind CSS
- Task list display with pending/completed sections
- Add new tasks with form validation
- Edit existing tasks
- Toggle task status (pending ↔ completed)
- Delete tasks with confirmation
- Real-time data updates using SWR
- Beautiful, modern interface

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete a task
- `GET /health` - Health check

## Testing

### Backend Tests

Run tests from the backend directory:
```bash
cd backend
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Docker Deployment

### Using Docker Compose (Recommended)

From the backend directory:
```bash
cd backend
docker-compose up -d
```

This will start both PostgreSQL and the backend service.

### Manual Docker Build

1. Build the backend image:
   ```bash
   cd backend
   docker build -t taskmanager-backend .
   ```

2. Run PostgreSQL separately or use docker-compose



### Environment Variables for Deployment

**Backend:**
- `PORT` - Server port (default: 3001)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `NODE_ENV` - Environment (development/production)

**Frontend:**
- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., `https://your-backend.railway.app`)

## Repository Structure

### Backend Repository
```
backend/
├── config/
│   └── database.js       # Sequelize configuration
├── models/
│   └── Task.js           # Task model
├── routes/
│   └── tasks.js          # Task routes
├── tests/
│   └── tasks.test.js     # Test suite
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
├── README.md
└── server.js
```

### Frontend Repository
```
frontend/
├── app/
│   ├── components/
│   │   ├── TaskList.js
│   │   ├── TaskItem.js
│   │   └── TaskForm.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── .eslintrc.json
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```




