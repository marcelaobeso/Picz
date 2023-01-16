const { Pool } = require("pg");
const { DBHOST, DBUSER, DBPASS, DBNAME, DBPORT } = require("./environment");

const pool = new Pool({
  host: DBHOST,
  user: DBUSER,
  password: DBPASS,
  database: DBNAME,
  port: DBPORT,
});

module.exports = pool;
