require('./setup');
const request = require('supertest');
const express = require('express');
const authRoutes = require('../src/routes/authRoutes');
const itemRoutes = require('../src/routes/itemRoutes');
const errorHandler = require('../src/middlewares/errorHandler');
const User = require('../src/models/User');
const Item = require('../src/models/Item');

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use(errorHandler);

describe('Item Endpoints', () => {
  let token;

  beforeEach(async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    token = response.body.data.token;
  });

  describe('POST /api/items', () => {
    it('deberia crear un nuevo item correctamente', async () => {
      const itemData = {
        title: 'Test Item',
        description: 'Test Description',
        status: 'pending'
      };

      const response = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send(itemData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(itemData.title);
      expect(response.body.data).toHaveProperty('_id');
    });

    it('deberia fallar sin autenticacion', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ title: 'Test', description: 'Test' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/items', () => {
    it('deberia obtener todos los items del usuario', async () => {
      await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Item 1', description: 'Description 1' });

      const response = await request(app)
        .get('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('deberia fallar sin autenticacion', async () => {
      const response = await request(app)
        .get('/api/items')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/items/:id', () => {
    it('deberia obtener un item por ID', async () => {
      const createResponse = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Item', description: 'Test Description' });

      const itemId = createResponse.body.data._id;

      const response = await request(app)
        .get(`/api/items/${itemId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test Item');
    });

    it('deberia devolver 404 si el item no existe', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const response = await request(app)
        .get(`/api/items/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/items/:id', () => {
    it('deberia actualizar un item correctamente', async () => {
      const createResponse = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Item', description: 'Test Description' });

      const itemId = createResponse.body.data._id;

      const response = await request(app)
        .patch(`/api/items/${itemId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Title' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Title');
    });

    it('deberia devolver 404 si el item no existe', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const response = await request(app)
        .patch(`/api/items/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('deberia eliminar un item correctamente', async () => {
      const createResponse = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Item', description: 'Test Description' });

      const itemId = createResponse.body.data._id;

      const response = await request(app)
        .delete(`/api/items/${itemId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('deberia devolver 404 si el item no existe', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const response = await request(app)
        .delete(`/api/items/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
