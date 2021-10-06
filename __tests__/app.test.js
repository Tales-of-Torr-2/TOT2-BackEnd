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
    heroOject = {
      hp: 5,
      stm: 5,
      ac: 5,
      spt: 5,
      atk: 5,
      level: 5,
      gold: 5,
      xp: 5,
    };

    heldGearObject = {
      id: 1,
      name: 'item',
      price: 5,
      hp: 0,
      ac: 0,
      spd: 0,
      atk: 0,
    }; 

    itemObject = {
      id: 1, 
      name: 'item', 
      effect: 'function', 
    }

    const userObject = {
      google_id: 'googleid',
      score: 0,
      hero_stats: heroOject,
      held_gear: [heldGearObject],
      items: [itemObject],
      achievements: ['string'],
      location: 1,
    };

    const res = await request(app).post('/api/v1/users').send(userObject); 

    expect(res.body).toEqual({
      id: '1', 
      ...userObject, 
    })
  });
});
