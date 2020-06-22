import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    truncate();
  });

  it('Deve ser possível se cadastrar', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Emerson',
        email: 'emersonhaw@gmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('O usuário não deve poder se registrar na aplicação com um e-mail duplicado', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Emerson',
        email: 'emersonhaw@gmail.com',
        password_hash: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Emerson',
        email: 'emersonhaw@gmail.com',
        password_hash: '123456',
      });

    expect(response.status).toBe(400);
  });
});
