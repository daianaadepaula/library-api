import request from 'supertest';
import app from '../app';
import helloRoutes from '../routes/hello.routes';

app.use('/api', helloRoutes);

describe('GET /api/hello', () => {
  it('should return hello world message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Hello world! 🚀');
  });
});
