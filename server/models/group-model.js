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
  }
};
