const mysql = require('mysql2');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'YourUsser',
    password : 'YourPassword',
    database:'happyCommerce',
    multipleStatements: true
  });
  
  db.connect();
  module.exports = db;