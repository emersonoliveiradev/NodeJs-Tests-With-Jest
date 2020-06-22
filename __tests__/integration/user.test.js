import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
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
});
