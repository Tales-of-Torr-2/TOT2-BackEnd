const pool = require('../utils/pool.js');

export default class User {
  id;
  google_id;
  score;
  hero_stats;
  held_gear;
  items;
  achievements;
  location;

  constructor(row) {
      this.id = row.id;
      this.google_id = row.googleId;
      this.score = row.score;
      this.hero_stats = row.heroStats;
      this.held_gear = row.heldGear;
      this.items = row.items;
      this.achievements = row.achievements;
      this.location = row.location;
  }

  
}
