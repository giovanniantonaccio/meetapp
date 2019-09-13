import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be created when user login with the correct credentials', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should NOT be created if user is NOT on database', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should NOT be created if password is NOT correct', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'random_password',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Password does not match');
  });

  it('should NOT be created if email is NOT informed', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        password: user.password,
      });

    expect(response.status).toBe(400);
    expect(response.body.messages[0].message).toBe('email is a required field');
  });

  it('should NOT be created if password is NOT informed', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
      });

    expect(response.status).toBe(400);
    expect(response.body.messages[0].message).toBe(
      'password is a required field'
    );
  });
});
