const request = require('supertest');
const { app, server } = require('../src/index');

describe('PokeDex API Tests', () => {
  
  afterAll((done) => {
    server.close(done);
  });

  test('Health check should return OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('Should get Pikachu info', async () => {
    const response = await request(app).get('/pokemon/pikachu');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('pikachu');
    expect(response.body.types).toContain('electric');
  }, 10000);

  test('Should return 404 for non-existent pokemon', async () => {
    const response = await request(app).get('/pokemon/notapokemon123');
    expect(response.status).toBe(404);
  });

  test('Should get random pokemon', async () => {
    const response = await request(app).get('/pokemon/random/get');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('id');
  }, 10000);

  test('Root endpoint should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
