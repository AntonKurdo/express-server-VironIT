const {
  Sequelize,  
  DataTypes
} = require('sequelize');

const sequelize = require('../index');

const Photo = sequelize.define('photo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  filepath: {
    type: DataTypes.STRING
  } 
})


Photo.assotiate = model => {
  Photo.belongsTo(models.User)
}


module.exports = Photo;