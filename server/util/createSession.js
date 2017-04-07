module.exports = createSession = (req, res, token, username) => {
  return req.session.regenerate(function () {
   req.session.token = token;
   res.json('success');
 });
};
