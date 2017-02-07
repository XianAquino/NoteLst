const users = require('../models/user-model.js');
const createSession = require('../util/createSession.js');
const uuid = require('uuid/v1');

module.exports = {
  get: (req, res) => {
    const query = req.query;
    users.getAllUsers(query,function(users){
      res.json(users);
    })
  },
  create: (req, res) => {
    const params = req.body;
    users.createUser(params, (err, response) => {
      if(response.insertId) {
        const sessionId = uuid();
        const userInfo = {
          isLoggedIn: true,
          id: response.insertId,
          username: params.username,
          email: params.email,
          name: params.name
        };
        createSession(req, res, sessionId, userInfo);
      }
    });
  },
  login: (req, res) => {
    const params = req.body;
    const username = params.username;
    const pwd = params.pwd;
    const sessionId = uuid();
    let loginInfo = { isLoggedIn: false }
    users.getUser(username, (err,info) => {
      if (!info) {
        res.json(Object.assign(loginInfo,
          { userExist: false }
        ));
      } else if (info.pwd !== pwd) {
        res.json(Object.assign(loginInfo,
          { passwordMatch: false }
        ));
      } else {
        const userInfo = Object.assign(loginInfo, {
          isLoggedIn: true,
          id: info.id,
          username: info.username,
          name: info.name,
          email: info.email
        });
        createSession(req, res, sessionId, userInfo);
      }
    });
  },
  getUser: (req, res) => {
    const id = req.params.user_id;
    users.getUser(id,function(err,info){
      res.json(info);
    });
  },
  update: (req, res) => {
    const id = req.params.user_id;
    users.update(id,req.body);
    res.send("Updated!");
  },
  delete: (req, res) => {
    const id = req.params.user_id;
    users.delete(id);
    res.send("Deleted!");
  }
}
