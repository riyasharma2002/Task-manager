const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');
const sequelize = require('../config/database');

describe('Task API', () => {
  beforeAll(async () => {
    // Sync database before tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clean up tasks before each test
    await Task.destroy({ where: {}, truncate: true });
  });

  describe('GET /api/tasks', () => {
    it('should return an empty array when no tasks exist', async () => {
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      await Task.create({
        title: 'Test Task 1',
        description: 'Description 1',
        status: 'pending',
      });
      await Task.create({
        title: 'Test Task 2',
        description: 'Description 2',
        status: 'completed',
      });

      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('title', 'Test Task 2');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by id', async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      });

      const response = await request(app).get(`/api/tasks/${task.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', task.id);
      expect(response.body).toHaveProperty('title', 'Test Task');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Task not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'New Task',
        description: 'New Description',
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'New Task');
      expect(response.body).toHaveProperty('description', 'New Description');
      expect(response.body).toHaveProperty('status', 'pending');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ description: 'Description' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title is required');
    });

    it('should return 400 if title is empty', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '   ' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Title is required');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const task = await Task.create({
        title: 'Original Title',
        description: 'Original Description',
        status: 'pending',
      });

      const response = await request(app)
        .put(`/api/tasks/${task.id}`)
        .send({
          title: 'Updated Title',
          description: 'Updated Description',
          status: 'completed',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated Title');
      expect(response.body).toHaveProperty('description', 'Updated Description');
      expect(response.body).toHaveProperty('status', 'completed');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/999')
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id/toggle', () => {
    it('should toggle task status from pending to completed', async () => {
      const task = await Task.create({
        title: 'Test Task',
        status: 'pending',
      });

      const response = await request(app)
        .patch(`/api/tasks/${task.id}/toggle`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'completed');
    });

    it('should toggle task status from completed to pending', async () => {
      const task = await Task.create({
        title: 'Test Task',
        status: 'completed',
      });

      const response = await request(app)
        .patch(`/api/tasks/${task.id}/toggle`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'pending');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const task = await Task.create({
        title: 'Task to Delete',
        description: 'This will be deleted',
      });

      const response = await request(app)
        .delete(`/api/tasks/${task.id}`);

      expect(response.status).toBe(204);

      const deletedTask = await Task.findByPk(task.id);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/999');
      expect(response.status).toBe(404);
    });
  });
});

