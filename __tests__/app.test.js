import pool, { end } from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('TOT2-BackEnd routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    end();
  });

  it('creates a user via POST', async () => {
    
  });
});
