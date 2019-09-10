import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('email', user.email);
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should compare a password with the corresponding hash', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const checkPassword = await user.checkPassword('123456');

    expect(checkPassword).toBe(true);
  });

  it('should not be able to register user without sending param name', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'giovanniantonaccio@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
    expect(response.body.messages[0].message).toBe('name is a required field');
  });

  it('should not be able to register user without sending param email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Giovanni Antonaccio',
        password: '123456',
      });

    expect(response.status).toBe(400);
    expect(response.body.messages[0].message).toBe('email is a required field');
  });

  it('should not be able to register user without sending param password', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Giovanni Antonaccio',
        email: 'giovanniantonaccio@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.messages[0].message).toBe(
      'password is a required field'
    );
  });

  it('should be able to change password', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Giovanni Antonaccio',
        email: 'giovanniantonaccio@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.messages[0].message).toBe(
      'password is a required field'
    );
  });
});
