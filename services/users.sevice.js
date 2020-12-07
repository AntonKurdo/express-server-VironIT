const fs = require('fs');
const path = require('path');
const filePath = path.parse(__dirname).dir + '/data/users.js';
const uuid = require('uuid');

class UserService {
  constructor() {
    this.usersList = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  getAllUsers = () => {
    return this.usersList;
  }
  getUser = (id) => {
    return this.usersList.filter(user => user.id === id)[0];
  }
  addUser = (user) => {
    user.id = uuid.v4();
    this.usersList.push(user);
    this.saveData();
    return this.usersList;
  }
  rewriteUsers = (body, id) => {
    this.usersList.forEach(user => {
      if (user.id === id) {
        user.name = body.name;
      }
    })
    this.saveData();
    return this.usersList
  }
  deleteUser = (id) => {
    this.usersList = this.usersList.filter(user => user.id !== id);
    this.saveData();
    return this.usersList
  }
  saveData = () => {
    fs.writeFile(filePath, JSON.stringify(this.usersList), err => {
      if (err) {
        throw err;
      }
    })
  }
};

module.exports = UserService;