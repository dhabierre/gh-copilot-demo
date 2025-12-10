import request from 'supertest';
import app from '../src/server';

describe('album-api-v2', () => {
  it('GET / should return info text', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Hit the /albums endpoint');
  });

  it('GET /albums should return seeded albums', async () => {
    const res = await request(app).get('/albums');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(6);
    const first = res.body[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('artist');
    expect(first).toHaveProperty('price');
    expect(first).toHaveProperty('image_url');
  });

  it('GET /albums/:id should return one album', async () => {
    const res = await request(app).get('/albums/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('POST /albums should create a new album', async () => {
    const payload = {
      title: 'Test Album',
      artist: 'Test Artist',
      price: 7.5,
      image_url: 'https://example.com/image.jpg',
    };
    const res = await request(app).post('/albums').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(payload);
    expect(typeof res.body.id).toBe('number');
  });

  it('PUT /albums/:id should update an album', async () => {
    const payload = {
      title: 'Updated Album',
      artist: 'Updated Artist',
      price: 9.99,
      image_url: 'https://example.com/updated.jpg',
    };
    const res = await request(app).put('/albums/1').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, ...payload });
  });

  it('DELETE /albums/:id should delete an album', async () => {
    const res = await request(app).delete('/albums/2');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    const check = await request(app).get('/albums/2');
    expect(check.status).toBe(404);
  });
});
