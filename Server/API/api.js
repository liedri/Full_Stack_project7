const mysql = require('mysql2');

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Edri8980',
  database: 'project7'
}).promise();

module.exports = {pool};
