const groups = require('../models/group-model');

module.exports = {
  get: (req, res) => {
    const { userId } = req.query;
    groups.get(userId, (groups) => {
      res.json(groups);
    });
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
