const db = require('../db');

module.exports = {
  getPosts: (groupId, userId, callback) => {
    const sql = `SELECT gn.id as postId, group_id, time_posted, likes, title,
      u.id AS postedById, u.name, u.image, (SELECT COUNT(*) FROM likes WHERE
      post_id = gn.id AND user_id = ${userId}) AS liked FROM group_notes AS gn
      JOIN notes AS n ON gn.note_id = n.id JOIN users AS u ON n.user_id = u.id
      WHERE group_id = ${groupId} ORDER BY time_posted DESC`;
    db.query(sql, (err, res) => {
      if(err) console.log(err);
      callback(res);
    });
  },
  likePost: (params) => {
    const postSQL = `UPDATE group_notes SET likes = likes + 1 WHERE id = ${params.post_id}`;
    const likeSQL = `INSERT INTO likes SET ?`;
    db.query(postSQL, (err, res) => {
      if(err) console.log(err);
      db.query(likeSQL, params, (err, res) => {
        if(err) console.log(err);
      });
    });
  },
  unlikePost: (params) => {
    const postSQL = `UPDATE group_notes SET likes = likes - 1 WHERE id = ${params.post_id}`;
    const unlikeSQL = `DELETE FROM likes WHERE user_id = ?`;
    db.query(postSQL, (err, res) => {
      if(err) console.log(err);
      db.query(unlikeSQL, params.user_id, (err, res) => {
        if(err) console.log(err);
      });
    });
  },
};
