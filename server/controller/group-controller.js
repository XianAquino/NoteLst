const groups = require('../models/group-model');

module.exports = {
  get: (req, res) => {
    const { userId, search } = req.query;
    if (userId) {
      groups.get(userId, (groups) => {
        res.json(groups);
      });
    } else if (search) {
      groups.search(search, (groups) => {
        res.json(groups);
      });
    } else {
      res.send([]);
    }
  },
  create: (req, res) => {
    const { userId, name } = req.body;
    groups.create(name, userId, (insertId) => {
      res.json({groupId: insertId});
    });
  },
  getGroup: (req, res) => {
    res.send('test')
  },
  updateGroup: (req, res) => {
    res.send('test')
  },
  deleteGroup: (req, res) => {
    const { group_id } = req.params;
    groups.deleteGroup(group_id);
    res.send('deleted');
  }
};
