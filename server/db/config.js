const { Pool } = require("pg");

const pool = new Pool({
    user: 'josee.lozanojr.',
    database: 'fec',
    port: 5432
});

module.exports = pool;
