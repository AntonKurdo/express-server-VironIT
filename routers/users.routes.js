const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const logBody = require('../middlewares/log-path');

const controller = new UsersController();

router
  .get('/', controller.getAll)
  .get('/:id',  controller.getUser)
  .post('/', logBody, controller.add)
  .put('/:id', logBody, controller.rewrite)
  .delete('/:id', controller.delete)

module.exports = router;  