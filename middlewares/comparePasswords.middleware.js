const bcrypt = require('bcrypt');

const comparePassword = async (password, req, res, next) => { 
  const match = await bcrypt.compare(req.body.password, password);  
  if(match) {
    next();
  } else {
    res.send('Incorrect password!')
  }    
}

module.exports = comparePassword;