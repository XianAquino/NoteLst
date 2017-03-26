const groups = require('../models/group-model');

module.exports = {
  get: (req, res) => {
    const { userId, search } = req.query;
    if (search) {
      groups.search(search, userId,(groups) => {
        res.json(groups);
      });
    } else if (userId) {
      groups.get(userId, (groups) => {
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
  join: (req, res) => {
    groups.join(req.params);
    res.send('joined');
  },
  getGroup: (req, res) => {
    const groupId = req.params.group_id
    groups.getGroup(groupId, (info) => {
      res.json(info);
    });
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
