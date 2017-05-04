const users = require('../models/user-model.js');
const createSession = require('../util/createSession.js');
const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  checkAuth: (req, res) => {
    if (req.session.token) {
      res.json({isAuthenticated: true});
    } else {
      res.json({isAuthenticated: false});
    }
  },
  login: (req, res) => {
    const params = req.body;
    const { username, pwd } = params;
    users.getUser(username, (err,info) => {
      if (!info) {
        res.status(401).send({ error: `username don't exist` });
      } else if (!bcrypt.compareSync(pwd, info.pwd)) {
        res.status(401).send({ error: 'incorrect password' });
      } else {
        const sessionId = uuid();
        createSession(req, res, sessionId, info.username);
      }
    });
  },
  signUp: (req, res) => {
    let params = req.body;
    const username = params.username
    users.getUser(username, (err, exist) =>{
      if (exist) {
        res.send('existing username')
      } else {
        const hashPwd = bcrypt.hashSync(params.pwd, salt);
        params.pwd = hashPwd;
        users.createUser(params, (err, result) => {
          if(result) {
            const sessionId = uuid();
            createSession(req, res, sessionId, username);
          }
        });
      }
    })
  },
  getInitialInfo: (req, res) => {
    users.getUser(req.session.username, (err, result) => {
      userinfo = {
        id: result.id,
        username: result.username,
        name: result.name,
        email: result.email,
        image: result.image,
      }
      res.json(userinfo);
    });
  },
  changePwd: (req, res) => {
    const id = req.params.user_id;
    const {oldPwd, newPwd, username} = req.body;
    users.getUser(username, (err, info) => {
      if(bcrypt.compareSync(oldPwd, info.pwd)){
        users.update(id, {pwd: bcrypt.hashSync(newPwd, salt)});
        res.send('success');
      } else {
        res.send('incorrect');
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy( () => {
      res.json({ isLoggedIn: false });
    })
  }
};
