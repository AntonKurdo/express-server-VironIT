const uuid = require('uuid');

const addId = (req, res, next) => {
  req.body.id = uuid.v4();
  next();
}

module.exports = addId;