const pool = require('../utils/pool.js');

const userModel = class User {
  id;
  googleId;
  score;
  heroStats;
  heldGear;
  items;
  achievements;
  location;

  constructor(row) {
    this.id = row.id;
    this.googleId = row.google_id;
    this.score = row.score;
    this.heroStats = row.hero_stats;
    this.heldGear = row.held_gear;
    this.items = row.items;
    this.achievements = row.achievements;
    this.location = row.location;
  }

  static async insert({
    googleId,
    score,
    heroStats,
    heldGear,
    items,
    achievements,
    location,
  }) {
    const { rows } = await pool.query(
      `
        INSERT INTO users (google_id, score, hero_stats, held_gear, items, achievements,
        location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `,
      [googleId, score, heroStats, heldGear, items, achievements, location]
    );
    return new User(rows[0])
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE google_id=$1', [id]);

      return new User(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from users');

      return rows.map((row) => new User(row));
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE google_id=$1 RETURNING *', [id]);

      return new User(rows[0]);
  }
}


module.exports = userModel; 