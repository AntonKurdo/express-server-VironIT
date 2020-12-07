const User = require("../db");
const DBUserService = require("../services/DBUsers.service");
const UserService = require("../services/users.sevice");


class UsersController {
  constructor() {
    // this.service = new UserService();
    this.service = new DBUserService();
  }
  getAll = async(req, res, next) => {
    res
      .status(200)
      .send(await this.service.getAllUsers());      
  }
  getUser =  async(req, res, next) => {
    res
      .status(200)
      .send(await this.service.getUser(req.params.id));
  }
  add = async(req, res, next) => {     
    res
      .status(201)  
      .send(await this.service.addUser(req.body));
  }
  rewrite = async(req, res, next) => {
    res
      .status(201)
      .send(await this.service.rewriteUsers(req.body, req.params.id));
  }
  delete = async(req, res, next) => {
    res
      .status(200)
      .send(await this.service.deleteUser(req.params.id));
  }
};

module.exports = UsersController;