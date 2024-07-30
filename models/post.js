const db = require('./database');

class Post {
  static getPosts(callback) {
    db.all('SELECT * FROM posts ORDER BY timestamp DESC', (err, rows) => {
      callback(err, rows);
    });
  }

  static createPost(username, content, callback) {
    db.run('INSERT INTO posts (username, content) VALUES (?, ?)', [username, content], function(err) {
      callback(err, this.lastID);
    });
  }
}

module.exports = Post;