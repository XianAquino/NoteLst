const db = require('../db');

module.exports = {
  create: (name, userId, callback) => {
    const admin = {name, creator: userId};
    db.query('INSERT INTO groups SET ?', admin, (err, res) => {
      if (err) console.log(err);
      callback(res.insertId);
    });
  },
  get: (userId, callback) => {
    const createdGroupsSQL = `SELECT g.id as group_id, g.name, no_of_members,
      g.created_at AS date, creator, u.name as creator_name FROM groups AS g
      JOIN users AS u ON creator = u.id WHERE creator = ?`;
    const joinedGroupsSQL = `SELECT g.id as group_id, g.name, no_of_members,
      g.created_at AS date, creator, u.name as creator_name, date_joined FROM
      group_members JOIN groups as g ON group_id = g.id JOIN users AS u ON
      creator = u.id WHERE user_id = ?`
    db.query(createdGroupsSQL, userId, (err, res) => {
      if(err) console.log(err);
      const createdGroups = res;
      db.query(joinedGroupsSQL, userId, (err, res) => {
        if(err) console.log(err);
        const joinedGroups = res;
        callback([...createdGroups, ...joinedGroups]);
      })
    });
  },
  search: (target, userId, callback) => {
    const sql = `SELECT g.id AS group_id, g.name, no_of_members, g.created_at AS
    date, creator, u.name as creator_name, (SELECT COUNT(*) FROM group_members
    WHERE group_id = g.id AND user_id = ${userId}) as member FROM groups AS g
    JOIN users AS u ON creator = u.id WHERE creator != ${userId} AND
    (g.name LIKE '%${target}%' OR u.name like '%${target}%')`;
    db.query(sql, (err, res) => {
      if(err) console.log(err);
      callback(res);
    });
  },
  join: (params) => {
    const { group_id, user_id } = params;
    const groupSQL = 'UPDATE groups SET no_of_members = no_of_members + 1 WHERE id = ?';
    const memberSQL = 'INSERT INTO group_members SET ?';
    db.query(groupSQL, group_id, (err, res) => {
      if(err) console.log(err);
      db.query(memberSQL, {group_id, user_id}, (err, res) => {
        if(err) console.log(err);
      });
    });
  },
  getGroup: (groupId, callback) => {
    const sql =`SELECT g.id, g.name, no_of_members, u.id AS adminId,
      u.name AS admin, u.username AS adminUserName FROM groups AS g
      JOIN users AS u ON creator = u.id WHERE g.id = ${groupId}`;
    db.query(sql, (err, res) => {
      if(err) console.log(err);
      callback(res[0]);
    });
  },
  getMembers: (groupId, callback) => {
    const sql = `SELECT user_id, users.name, users.username FROM
      group_members JOIN users ON user_id = users.id WHERE group_id = ${groupId}`;
    db.query(sql, (err, res) => {
      if(err) console.log(err);
      callback(res);
    });
  },
  getPosts: (groupId, callback) => {
    const sql = `SELECT gn.id as postId, group_id, time_posted, likes, title, u.name,
      u.image FROM group_notes AS gn JOIN notes AS n ON gn.note_id = n.id
      JOIN users AS u ON n.user_id = u.id WHERE group_id = ${groupId}`;
    db.query(sql, (err, res) => {
      if(err) console.log(err);
      callback(res);
    });
  },
  deleteGroup: (groupId) => {
    db.query('DELETE FROM groups WHERE id = ?', groupId, (err, res) => {
      if(err) console.log(err);
    })
  }
};
