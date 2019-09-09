import request from 'supertest';
import app from '../../src/app';

import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Giovanni Antonaccio',
        email: 'giovanniantonaccio@gmail.com',
        password_hash: '123456',
      });

    expect(response.status).toBe(400);
  });
});
