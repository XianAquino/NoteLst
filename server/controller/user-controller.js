const users = require('../models/user-model.js');
const cloudinary = require('cloudinary');
const config = require('../config.js')
cloudinary.config(config.cloudinary);
const formidable = require('formidable');

module.exports = {
  get: (req, res) => {
    const query = req.query;
    if(!query.name) {
      res.send([]);
    } else {
      users.getUsers(query, (users) => {
        res.json(users);
      });
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
    users.update(id, req.body);
    res.send('Updated');
  },
  delete: (req, res) => {
    const id = req.params.user_id;
    users.delete(id);
    res.send('Deleted');
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
  changeAvatar: (req, res) => {
    const id = req.params.user_id;
    var newForm = formidable.IncomingForm();
    const resize = { width: 300, crop: 'scale' }
    newForm.keepExtensions = true;
    newForm.parse(req, (err, fields, file) => {
    cloudinary.v2.uploader.upload(file.image.path, resize, (error, result) => {
      const newImage = {image: result.url};
      users.update(id, newImage);
      res.redirect('/settings');
      });
    });
  }
}
