const multer = require("multer");

multer().single('data');

const validateUserPas = (schema) => async(req, res, next) => {
 
  try {
    const value = await schema.validateAsync(req.body.data);
    next();
  } catch (err) {
    res.status(400).send(err);
  }
}
  
module.exports = validateUserPas;