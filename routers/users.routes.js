const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const addId = require('../middlewares/addId');

const controller = new UsersController();

router
  .get('/', controller.getAll)
  .get('/:id',  controller.getUser)
  .post('/', addId, controller.add)
  .put('/:id', controller.rewrite)
  .delete('/:id', controller.delete)

module.exports = router;  