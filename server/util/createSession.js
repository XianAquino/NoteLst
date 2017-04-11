module.exports = createSession = (req, res, token, username) => {
  return req.session.regenerate(() => {
    req.session.token = token;
    req.session.username = username;
    res.json('success');
  });
};
