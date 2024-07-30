const db = require('./database');

class User {
  static findUser(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      callback(err, row);
    });
  }

  static createUser(username, password, callback) {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = User;