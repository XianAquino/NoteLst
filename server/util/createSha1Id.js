const crypto = require('crypto');

module.exports = (string) => (
  crypto.createHash('sha1').update(string).digest('hex')
);
