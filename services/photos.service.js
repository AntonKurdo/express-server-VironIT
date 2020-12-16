const sequelize = require('../db');
const Photo = require('../db/models/Photo.model');
const User = require('../db/models/User.model');

class PhotosService {
  constructor() {
    (async () => {
      await sequelize.sync();  
    })()
  }
  getAllPics = async () => {
    const data = await Photo.findAll({
      raw: true
    })
    return data;
  }
  addPic = async (photo, login) => {
    try {
      const user = await User.findOne({where: {
        name: login
      }})
      photo.user_id = user.id
      const newPhoto = await Photo.create(photo);
      return newPhoto;
    } catch (err) {
      return err.message;
    }
  }
  updatePic = async(id, body, login) => {
    const user = await User.findOne({where: {
      name: login
    }})
    body.user_id = user.id
    const photo = await Photo.findOne({where: {
      id:id
    }})
    if(photo) {
      const newPhoto = await photo.update(body);
      return newPhoto;
    }
  }  
  removePic = async (id) => {
    const photo = await Photo.destroy({
      where: {
        id: id
      }
    })
    if (photo === 0) {
      return 'Not found!'
    } else {
      return 'Photo was deleted!'
    }
  }
}

module.exports = PhotosService;