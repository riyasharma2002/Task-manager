# Task Manager Frontend

A modern, responsive task management application built with Next.js and Tailwind CSS.

## Features

- ✅ Responsive UI with Tailwind CSS
- ✅ Display list of tasks fetched from backend
- ✅ Add new tasks with form validation
- ✅ Toggle task status (pending/completed)
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation
- ✅ Real-time data updates using SWR
- ✅ Beautiful, modern interface

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If your backend is running on a different URL, update this value accordingly.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── TaskList.js      # Task list component with SWR
│   │   ├── TaskItem.js       # Individual task item
│   │   └── TaskForm.js       # Form for creating/editing tasks
│   ├── globals.css           # Global styles with Tailwind
│   ├── layout.js             # Root layout
│   └── page.js               # Home page
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Features in Detail

### Task List
- Automatically fetches tasks from the backend API
- Separates tasks into "Pending" and "Completed" sections
- Shows loading state while fetching
- Displays error message if backend is unavailable

### Task Form
- Create new tasks with title and optional description
- Edit existing tasks
- Form validation for required fields
- Status selection when editing

### Task Actions
- **Toggle Status**: Click the checkbox to toggle between pending and completed
- **Edit**: Click the Edit button to modify task details
- **Delete**: Click the Delete button to remove a task (with confirmation)

### Data Management
- Uses SWR for data fetching and caching
- Automatic revalidation on focus and reconnect
- Optimistic updates for better UX

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **SWR** - Data fetching and caching library

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_API_URL` with your backend URL
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the `NEXT_PUBLIC_API_URL` environment variable to point to your deployed backend.

## API Integration

The frontend expects the backend API to be available at the URL specified in `NEXT_PUBLIC_API_URL`. The API should have the following endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

See the backend README for detailed API documentation.

## Customization

### Styling
Modify `tailwind.config.js` to customize colors, spacing, and other design tokens.

### API URL
Update `NEXT_PUBLIC_API_URL` in `.env.local` or set it as an environment variable in your deployment platform.

## License

ISC

