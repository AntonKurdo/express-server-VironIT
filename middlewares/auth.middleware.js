const jwt = require("jsonwebtoken");
const db = require("../db");

const auth = (tokenType) => async (req, res, next) => {
  try {
    const [stratagy, token] = req.headers['authorization'].split(' ');
    const result = jwt.verify(token, 'secret');
    if(result.type !== tokenType) {
      throw new Error('Invalid type of token')
    }
    await db.sequelize.sync();
    const user = await db.User.findOne({
      where: {
        name: result.login
      }
    })
    if(user) {
      // req.body = JSON.stringify(user)
      req.login = result.login;
      next();
    } else {
      res.send('You have no access! User was removed...')
    }
    
  } catch (err) {
    res
      .status(401)
      .send(err.message)
  }
}

module.exports = auth;