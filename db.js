const mysql = require('mysql');

function db(sql, callback) {
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'db_library'
  });
  conn.connect();

  conn.query(sql, callback);

  conn.end();
}

module.exports = db;
// db('select * from t_book', (err,result) => {
//   if (err) throw err;
//   console.log(result);
// })