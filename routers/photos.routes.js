const express = require('express');
const PhotosController = require('../controllers/photos.controller');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const uploadPic = require('../middlewares/uploadAva.middleware');

const controller = new PhotosController();

router
  .get('/', auth('access'), controller.getAllPics)
  .post('/', auth('access'), uploadPic, controller.addPic)
  .put('/:id', auth('access'), uploadPic, controller.updatePic)
  .delete('/:id', auth('access'), controller.removePic)

module.exports = router;