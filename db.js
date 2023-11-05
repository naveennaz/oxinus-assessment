const { Pool } = require('pg');

const pool = new Pool({
  user: 'account_user',
  host: 'localhost',
  database: 'account',
  password: 'account_pass',
  port: 5432,
});

module.exports = pool;
