const db = require('../db');

module.exports = {
  create: (name, userId) => {
    db.query('INSERT INTO groups SET ?', {name}, (err, res) => {
      if (err) console.log(err);
      const admin = {group_id: res.insertId, user_id: userId};
      db.query('INSERT INTO group_members SET ?', admin, (err, res) =>{
        if(err) console.log(err);
      });
    });
  }
};
