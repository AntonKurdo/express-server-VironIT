const bcrypt = require('bcrypt');

const passwordCrypt = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      console.log(err.message);
      process.exit();
    } else {
      req.body.password = hash;
      next();
    }    
  })
}

module.exports = passwordCrypt;