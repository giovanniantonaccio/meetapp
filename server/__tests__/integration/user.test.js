import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

async function createUserAndGetToken(known_password = null) {
  const user =
    known_password === null
      ? await factory.attrs('User')
      : await factory.attrs('User', {
          password: known_password,
        });

  // create new user
  await request(app)
    .post('/users')
    .send(user);

  // login with new user
  const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: user.password,
    });

  expect(response.body).toHaveProperty('token');
  return response.body;
}

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  /**
   * User check password test
   */
  it('should compare a password with the corresponding hash', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const checkPassword = await user.checkPassword('123456');

    expect(checkPassword).toBe(true);
  });

  /**
   * User store tests
   */
  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('email', user.email);
    expect(response.status).toBe(200);
  });

  it('should NOT be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('error', 'User already exists');
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register without sending param name', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body.messages[0].message).toBe('Name is required');
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register without sending param email', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        password: user.password,
      });

    expect(response.body.messages[0].message).toContain(
      'email is a required field'
    );
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register without sending param password', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        email: user.email,
      });

    expect(response.body.messages[0].message).toBe(
      'password is a required field'
    );
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register if email is not in valid format', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        email: 'wrong-email-format',
        password: user.password,
      });

    expect(response.body.messages[0].message).toBe(
      'email must be a valid email'
    );
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register if password length is less than 6', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        email: user.email,
        password: '123',
      });

    expect(response.body.messages[0].message).toBe(
      'password must be at least 6 characters'
    );
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register if password is not a string', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        email: user.email,
        password: 123,
      });

    expect(response.body.messages[0].message).toContain(
      'password must be a `string` type'
    );
    expect(response.status).toBe(400);
  });

  it('should NOT be able to register if name is not a string', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({
        name: 1234,
        email: user.email,
        password: user.password,
      });

    expect(response.body.messages[0].message).toContain(
      'name must be a `string` type'
    );
    expect(response.status).toBe(400);
  });

  /**
   * User update tests
   */
  it('should be able to change email if new email is NOT in use', async () => {
    const { token } = await createUserAndGetToken();
    const newUser = await factory.attrs('User');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: newUser.email,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', newUser.email);
  });

  it('should NOT be able to change email if new email is in use', async () => {
    const { user: user1 } = await createUserAndGetToken();
    const { token: token2 } = await createUserAndGetToken();

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token2}`)
      .send({
        email: user1.email,
      });

    expect(response.body).toHaveProperty('error', 'Email already in use');
    expect(response.status).toBe(400);
  });

  it('should NOT allow updates if he does NOT have a valid token', async () => {
    await createUserAndGetToken();
    const newUser = await factory.attrs('User');

    /** Token is NOT being atatched in header */
    const response = await request(app)
      .put('/users')
      .send({
        email: newUser.email,
      });

    expect(response.body).toHaveProperty('error', 'Token not provided');
    expect(response.status).toBe(401);
  });

  it('should NOT allow updates if token is incorrect', async () => {
    await createUserAndGetToken();
    const newUser = await factory.attrs('User');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer random_token`)
      .send({
        email: newUser.email,
      });

    expect(response.body).toHaveProperty('error', 'Token invalid');
    expect(response.status).toBe(401);
  });

  it('should update password if user send oldPassword, and password is equal to confirmPassword', async () => {
    const { user, token } = await createUserAndGetToken('123456');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456',
        password: '1234567',
        confirmPassword: '1234567',
      });

    expect(response.body).toHaveProperty('name', user.name);
    expect(response.status).toBe(200);
  });

  it('should NOT update password if user send wrong oldPassword', async () => {
    const { token } = await createUserAndGetToken('123456');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456789',
        password: '1234567',
        confirmPassword: '1234567',
      });

    expect(response.body).toHaveProperty('error', 'Password does not match');
    expect(response.status).toBe(401);
  });

  it('should NOT update password if user send oldPassword, and password is NOT equal to confirmPassword', async () => {
    const { token } = await createUserAndGetToken('123456');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456',
        password: '1234567',
        confirmPassword: '12345678',
      });

    expect(response.body.messages[0].message).toBe('Passwords does not match');
    expect(response.status).toBe(400);
  });

  it('should NOT update password if user dont send confirmPassword', async () => {
    const { token } = await createUserAndGetToken('123456');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456',
        password: '1234567',
      });

    expect(response.body.messages[0].message).toBe(
      'confirmPassword is a required field'
    );
    expect(response.status).toBe(400);
  });

  it('password should remain the same if password is not informed', async () => {
    const { user, token } = await createUserAndGetToken('123456');

    /** Send the update request without password param */
    await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456',
        confirmPassword: '1234567',
      });

    /** Try to login using the old password */
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should NOT update if email is the same of the previous user and oldPassword is not informed', async () => {
    const { user, token } = await createUserAndGetToken();

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
      });

    expect(response.body).toHaveProperty('email', user.email);
    expect(response.status).toBe(200);
  });

  it('should NOT update if user dont send any parameter', async () => {
    const { user, token } = await createUserAndGetToken();

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body).toHaveProperty('email', user.email);
    expect(response.status).toBe(200);
  });

  it('should NOT update new password dont have at least 6 characters', async () => {
    const { token } = await createUserAndGetToken('123456');

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456',
        password: '123',
        confirmPassword: '123',
      });

    expect(response.body.messages[0].message).toBe(
      'password must be at least 6 characters'
    );
    expect(response.status).toBe(400);
  });
});
