const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const userModel = require('../lib/models/User.js');

describe('TOT2-BackEnd routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a user via POST', async () => {
    const heroOject = {
      hp: 5,
      stm: 5,
      ac: 5,
      spt: 5,
      atk: 5,
      level: 5,
      gold: 5,
      xp: 5,
    };

    const heldGearObject = {
      id: 1,
      name: 'item',
      price: 5,
      hp: 0,
      ac: 0,
      spd: 0,
      atk: 0,
    };

    const itemObject = {
      id: 1,
      name: 'item',
      effect: 'function',
    };

    const userObject = {
      googleId: 'googleid',
      username: 'MikeO',
      score: 0,
      heroStats: heroOject,
      heldGear: [heldGearObject],
      items: [itemObject],
      achievements: ['string'],
      location: 1,
    };

    const res = await request(app).post('/api/v1/users').send(userObject);

    expect(res.body).toEqual({
      id: '1',
      ...userObject,
    });
  });

  it('gets a user by id via GET', async () => {
    const heroOject = {
      hp: 5,
      stm: 5,
      ac: 5,
      spt: 5,
      atk: 5,
      level: 5,
      gold: 5,
      xp: 5,
    };

    const heldGearObject = {
      id: 1,
      name: 'item',
      price: 5,
      hp: 0,
      ac: 0,
      spd: 0,
      atk: 0,
    };

    const itemObject = {
      id: 1,
      name: 'item',
      effect: 'function',
    };

    const userObject = {
      googleId: 'googleid',
      username: 'MikeO',
      score: 0,
      heroStats: heroOject,
      heldGear: [heldGearObject],
      items: [itemObject],
      achievements: ['string'],
      location: 1,
    };
    const user = await userModel.insert(userObject);
    const res = await request(app).get(`/api/v1/users/${user.googleId}`);

    expect(res.body).toEqual(user);
  });

  it('gets all users via GET', async () => {
    const heroOject = {
      hp: 5,
      stm: 5,
      ac: 5,
      spt: 5,
      atk: 5,
      level: 5,
      gold: 5,
      xp: 5,
    };

    const heldGearObject = {
      id: 1,
      name: 'item',
      price: 5,
      hp: 0,
      ac: 0,
      spd: 0,
      atk: 0,
    };

    const itemObject = {
      id: 1,
      name: 'item',
      effect: 'function',
    };

    const userObject1 = {
      googleId: 'googleid',
      username: 'MikeO',
      score: 0,
      heroStats: heroOject,
      heldGear: [heldGearObject],
      items: [itemObject],
      achievements: ['string'],
      location: 1,
    };

    const userObject2 = {
      googleId: 'gooogleid',
      username: 'MikeP',
      score: 100,
      heroStats: heroOject,
      heldGear: [heldGearObject],
      items: [itemObject],
      achievements: ['strings'],
      location: 2,
    };

    const user1 = await userModel.insert(userObject1);
    const user2 = await userModel.insert(userObject2);

    const res = await request(app)
      .get('/api/v1/users');

    expect(res.body).toEqual([user1, user2]);
  });

  it('deletes an existing user by id via DELETE', async () => {
    const heroOject = {
      hp: 5,
      stm: 5,
      ac: 5,
      spt: 5,
      atk: 5,
      level: 5,
      gold: 5,
      xp: 5,
    };

    const heldGearObject = {
      id: 1,
      name: 'item',
      price: 5,
      hp: 0,
      ac: 0,
      spd: 0,
      atk: 0,
    };

    const itemObject = {
      id: 1,
      name: 'item',
      effect: 'function',
    };

    const userObject = {
      googleId: 'googleid',
      username: 'MikeO',
      score: 0,
      heroStats: heroOject,
      heldGear: [heldGearObject],
      items: [itemObject],
      achievements: ['string'],
      location: 1,
    };
    const user = await userModel.insert(userObject);

    const res = await request(app)
      .delete(`/api/v1/users/${user.googleId}`);

    expect(res.body).toEqual({
      message: 'This user has retired.'
    });
  });

  it('updates user by id via PUT', async () => {
    const heroOject = {
      hp: 5,
      stm: 5,
      ac: 5,
      spt: 5,
      atk: 5,
      level: 5,
      gold: 5,
      xp: 5,
    };

    const heldGearObject = {
      id: 1,
      name: 'item',
      price: 5,
      hp: 0,
      ac: 0,
      spd: 0,
      atk: 0,
    };

    const itemObject = {
      id: 1,
      name: 'item',
      effect: 'function',
    };

    const userObject = {
      googleId: 'googleid',
      username: 'MikeO',
      score: 0,
      heroStats: heroOject,
      heldGear: [heldGearObject],
      items: [itemObject],
      achievements: ['string'],
      location: 1,
    };
    const user = await userModel.insert(userObject);

    const res = await request(app)
      .put(`/api/v1/users/${user.googleId}`)
      .send({
        score: 100,
      });
    
    expect(res.body).toEqual({
      ...user,
      score: 100
    });
  });
});
