const {
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = require('../index');
const Photo = require('./Photo.model');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING    
  },
usersPics: {    
  type: DataTypes.ARRAY(DataTypes.DECIMAL)
}
})

User.hasMany(Photo, {
  foreignKey: {
    name: 'user_id'
  }
});

module.exports = User;