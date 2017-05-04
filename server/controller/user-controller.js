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
    users.getUser(req.params.username, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const userinfo = {
          id: result.id,
          username: result.username,
          name: result.name,
          email: result.email,
          image: result.image,
        };
        res.json(userinfo);
      }
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
