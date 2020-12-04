const logBody = (req, res, next) => {
  console.log(req.body);
  next();
}



module.exports = logBody;

