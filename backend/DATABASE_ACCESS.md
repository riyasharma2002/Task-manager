# Database Access Guide

## Quick Access

### Connect to Database
```bash
psql -U riyasharma -d taskmanager
```

Or if you need to specify host:
```bash
psql -h localhost -U riyasharma -d taskmanager
```

## Common Database Commands

### Once Connected (inside psql):

**List all tables:**
```sql
\dt
```

**View table structure:**
```sql
\d tasks
```

**View all tasks:**
```sql
SELECT * FROM tasks;
```

**View tasks with formatting:**
```sql
SELECT id, title, status, "createdAt" FROM tasks ORDER BY "createdAt" DESC;
```

**Count tasks:**
```sql
SELECT COUNT(*) FROM tasks;
```

**View pending tasks:**
```sql
SELECT * FROM tasks WHERE status = 'pending';
```

**View completed tasks:**
```sql
SELECT * FROM tasks WHERE status = 'completed';
```

**Delete all tasks (be careful!):**
```sql
DELETE FROM tasks;
```

**Delete a specific task:**
```sql
DELETE FROM tasks WHERE id = 1;
```

**Update a task:**
```sql
UPDATE tasks SET status = 'completed' WHERE id = 1;
```

**Exit psql:**
```sql
\q
```

## One-Line Commands (from terminal)

**View all tasks:**
```bash
psql -U riyasharma -d taskmanager -c "SELECT * FROM tasks;"
```

**Count tasks:**
```bash
psql -U riyasharma -d taskmanager -c "SELECT COUNT(*) FROM tasks;"
```

**View table structure:**
```bash
psql -U riyasharma -d taskmanager -c "\d tasks"
```

**View pending tasks:**
```bash
psql -U riyasharma -d taskmanager -c "SELECT * FROM tasks WHERE status = 'pending';"
```

## Using a GUI Tool (Optional)

### pgAdmin
- Download from: https://www.pgadmin.org/
- Connect with:
  - Host: localhost
  - Port: 5432
  - Database: taskmanager
  - Username: riyasharma
  - Password: (leave empty)

### DBeaver
- Download from: https://dbeaver.io/
- Free database tool that works with PostgreSQL

### TablePlus (Mac)
- Download from: https://tableplus.com/
- Great GUI for Mac users

## Database Schema

The `tasks` table has the following structure:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

## Useful SQL Queries

**Get tasks created today:**
```sql
SELECT * FROM tasks WHERE DATE("createdAt") = CURRENT_DATE;
```

**Get tasks by status count:**
```sql
SELECT status, COUNT(*) as count FROM tasks GROUP BY status;
```

**Get latest 5 tasks:**
```sql
SELECT * FROM tasks ORDER BY "createdAt" DESC LIMIT 5;
```

**Search tasks by title:**
```sql
SELECT * FROM tasks WHERE title ILIKE '%search term%';
```

## Troubleshooting

**If you get "database does not exist":**
```bash
createdb taskmanager
```

**If you get "role does not exist":**
```bash
# Check your PostgreSQL username
whoami
# Then use that as the username
psql -U $(whoami) -d taskmanager
```

**Reset database (delete all tasks):**
```bash
psql -U riyasharma -d taskmanager -c "TRUNCATE TABLE tasks RESTART IDENTITY;"
```

