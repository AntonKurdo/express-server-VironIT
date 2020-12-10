const workWithFD = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  req.body.avatar = req.file.path;
  next();  
}

module.exports = workWithFD;