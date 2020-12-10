const db = require('../db/index');

const identification = async (req, res, next) => {
  db.sequelize.sync();
  const user = await db.User.findOne({ where: {
    name: req.body.name
  }});  
 
  if (user === null) {
   res.send('Incorrect login!')
  } else {
    next(user.password)
  }
}

module.exports = identification;