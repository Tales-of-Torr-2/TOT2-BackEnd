const pool = require('../utils/pool.js');

const userModel = class User {
  id;
  googleId;
  username;
  score;
  heroStats;
  heldGear;
  items;
  achievements;
  location;

  constructor(row) {
    this.id = row.id;
    this.googleId = row.google_id;
    this.username = row.username;
    this.score = row.score;
    this.heroStats = row.hero_stats;
    this.heldGear = row.held_gear;
    this.items = row.items;
    this.achievements = row.achievements;
    this.location = row.location;
  }

  static async insert({
    googleId,
    username,
    score,
    heroStats,
    heldGear,
    items,
    achievements,
    location,
  }) {
    const { rows } = await pool.query(
      `
        INSERT INTO users (google_id, username, score, hero_stats, held_gear, items, achievements,
        location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
      `,
      [googleId, username, score, heroStats, heldGear, items, achievements, location]
    );
    return new User(rows[0])
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE google_id=$1', [ id ]);
    console.log(rows[ 0 ]);
    if (rows.length > 0) {
        
      return new User(rows[0]);
      }
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from users');

      return rows.map((row) => new User(row));
  }

  static async updateById(
    id,
    { score,
      heroStats,
      heldGear,
      items,
      achievements,
      location
    }
  ) {
    const existingUser = await User.getById(id);
    const newScore = score ?? existingUser.score;
    const newHeroStats = heroStats ?? existingUser.heroStats;
    const newHeldGear = heldGear ?? existingUser.heldGear;
    const newItems = items ?? existingUser.items;
    const newAchievements = achievements ?? existingUser.achievements;
    const newLocation = location ?? existingUser.location;
    
    const { rows } = await pool.query(
      `UPDATE users
        SET score=$1,
          hero_stats=$2,
          held_gear=$3,
          items=$4,
          achievements=$5,
          location=$6
        WHERE google_id=$7
        RETURNING *`,
      [
        newScore,
        newHeroStats,
        newHeldGear,
        newItems,
        newAchievements,
        newLocation,
        id
      ]
    );
    return new User(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE google_id=$1 RETURNING *', [id]);

      return new User(rows[0]);
  }
}


module.exports = userModel; 