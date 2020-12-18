const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const uploadAva = require('../middlewares/uploadAva.middleware');
const workWithFD = require('../middlewares/workWithFormData.middleware');
const createUserScheme = require('../validation-schemes/create-user.scheme');
const validateUserPas = require('../middlewares/validation.middleware');

const controller = new UsersController();

router 
  .get('/', auth('access'), controller.getAll) //  Request Example: http://localhost:3000/users?page=1&count=1 || http://localhost:3000/users
  .get('/me', auth('access'), controller.getMySelf)
  .get('/refreshAccess',  auth('refresh'), controller.refreshAccess )
  .get('/:id', controller.getUser)
  .post('/', uploadAva, workWithFD,  validateUserPas(createUserScheme), controller.add)
  .post('/login', controller.login)
  .put('/:id', auth('access'), uploadAva, workWithFD, validateUserPas(createUserScheme), controller.rewrite)
  .delete('/:id',  auth('access'), controller.delete);

module.exports = router;