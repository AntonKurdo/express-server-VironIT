const User = require('../db/models/User.model');

const identification = async (req, res, next) => {
  const user = await User.findOne({ where: {
    name: req.body.name
  }});   
  if (user === null) {
   res.status(400).send('Incorrect login!')
  } else {
    next(user.password)
  }
}

module.exports = identification;