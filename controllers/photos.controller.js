const PhotoService = require('../services/photos.service');

class PhotosController {
  constructor() {
    this.service = new PhotoService();
  }
  getAllPics = async (req, res) => {
    res
      .status(200)
      .send(await this.service.getAllPics());
  }
  addPic = async (req, res) => {
    req.body = JSON.parse(req.body.data);
    req.body.filepath = req.file.path;    
    res
      .status(201)
      .send(await this.service.addPic(req.body, req.login))
  }
  updatePic = async (req, res) => {
    req.body = JSON.parse(req.body.data);
    req.body.filepath = req.file.path;  
    res
      .status(200)
      .send(await this.service.updatePic(req.params.id, req.body, req.login))
  }
  removePic = async (req, res) => {
    req.body.user_id = 1;
    res
      .status(200)
      .send(await this.service.removePic(req.params.id))
  }
}

module.exports = PhotosController;