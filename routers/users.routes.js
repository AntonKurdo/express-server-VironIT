const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const comparePasswords = require('../middlewares/comparePasswords.middleware');
const identification = require('../middlewares/identification.middleware');
const passwordCrypt = require('../middlewares/pasCrypt.middleware');

const controller = new UsersController();

router
  .get('/', auth('access'), controller.getAll)
  .get('/me',  auth('access'), controller.getMySelf)
  .get('/refreshAccess',  auth('refresh'), controller.refreshAccess )
  .get('/:id',  auth('access'), controller.getUser) 
  .post('/', passwordCrypt, controller.add)
  .post('/login', identification, comparePasswords, controller.login)
  .put('/:id', auth('access'), passwordCrypt, controller.rewrite)
  .delete('/:id',  auth('access'), controller.delete);

module.exports = router;