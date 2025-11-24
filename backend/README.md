# Task Manager Backend API

A RESTful API built with Node.js, Express.js, and PostgreSQL using Sequelize ORM for task management.

## Features

- ✅ RESTful API endpoints for CRUD operations
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Task model with: id, title, description, status, createdAt
- ✅ Unit and integration tests with Jest
- ✅ Docker support for easy deployment

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL credentials:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanager
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

### 3. Create PostgreSQL Database

```bash
# Using psql
psql -U postgres
CREATE DATABASE taskmanager;
\q
```

Or using createdb command:
```bash
createdb taskmanager
```

### 4. Run the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete a task

### Health Check

- `GET /health` - Server health check

## API Examples

### Create a Task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "pending"
  }'
```

### Get All Tasks

```bash
curl http://localhost:3001/api/tasks
```

### Update a Task

```bash
curl -X PUT http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "status": "completed"
  }'
```

### Toggle Task Status

```bash
curl -X PATCH http://localhost:3001/api/tasks/1/toggle
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3001/api/tasks/1
```

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Docker Setup

### Using Docker Compose (Recommended)

This will start both PostgreSQL and the backend service:

```bash
docker-compose up -d
```

To stop:
```bash
docker-compose down
```

### Using Dockerfile Only

1. Build the image:
```bash
docker build -t taskmanager-backend .
```

2. Run the container (make sure PostgreSQL is running):
```bash
docker run -p 3001:3001 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=taskmanager \
  -e DB_USER=postgres \
  -e DB_PASSWORD=postgres \
  taskmanager-backend
```

## Project Structure

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
├── .env.example          # Environment variables template
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── server.js             # Application entry point
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for PostgreSQL
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **Docker** - Containerization

## License

ISC

