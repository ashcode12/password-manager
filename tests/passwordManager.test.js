const request = require('supertest');
const app = require('../src/server'); // Import the app without starting the server

describe('Password Manager API', () => {
  it('should add a password successfully', async () => {
    const response = await request(app)
      .post('/add-password')
      .send({
        name: 'testSite',
        password: 'testPassword123'
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Password for "testSite" added successfully');
  });

  it('should retrieve a password by name', async () => {
    await request(app)
      .post('/add-password')
      .send({
        name: 'retrieveTest',
        password: 'retrievePassword123'
      });

    const response = await request(app)
      .get('/get-password/retrieveTest');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('retrieveTest');
    expect(response.body.password).toBe('retrievePassword123');
  });

  it('should list all password names', async () => {
    const response = await request(app)
      .get('/list-passwords');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
