module.exports = createSession = (req, res, token, userInfo) => {
  return req.session.regenerate(function () {
   req.session.token = token;
   res.json(userInfo);
 });
};
