const users = require('../models/user-model.js');
const createSession = require('../util/createSession.js');
const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  get: (req, res) => {
    const query = req.query;
    users.getAllUsers(query,function(users){
      res.json(users);
    })
  },
  create: (req, res) => {
    let params = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPwd = bcrypt.hashSync(params.pwd, salt);
    params.pwd = hashPwd;
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
    let loginInfo = { isLoggedIn: false }
    users.getUser(username, (err,info) => {
      if (!info) {
        res.json(Object.assign(loginInfo,
          { userExist: false }
        ));
      } else if (!bcrypt.compareSync(pwd, info.pwd)) {
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
        const sessionId = uuid();
        createSession(req, res, sessionId, userInfo);
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy( () => {
      res.json({ isLoggedIn: false });
    })
  },
  checkAuth: (req, res) => {
    if (req.session.token) {
      res.json({isAuthenticated: true});
    } else {
      res.json({isAuthenticated: false});
    }
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
