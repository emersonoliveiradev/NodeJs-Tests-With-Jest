import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

// import User from '../../src/app/models/User';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    truncate();
  });

  /* it('A senha do usuário deve ser encriptada', async () => {
    const user = await User.create({
      name: 'Emerson',
      email: 'emersonhaw@gmail.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  }); */

  it('A senha do usuário deve ser encriptada', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('Deve ser possível se cadastrar', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  /* it('O usuário não deve poder se registrar na aplicação com um e-mail duplicado', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Emerson',
        email: 'emersonhaw@gmail.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Emerson',
        email: 'emersonhaw@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  }); */

  it('O usuário não deve poder se registrar na aplicação com um e-mail duplicado', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
