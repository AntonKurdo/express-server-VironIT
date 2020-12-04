const UserService = require("../services/users.sevice");

class UsersController {
  constructor() {
    this.service = new UserService();
  }
  getAll = (req, res, next) => {
    res
      .status(200)
      .send(this.service.getAllUsers());
  }
  getUser = (req, res, next) => {
    res
      .status(200)
      .send(this.service.getUser(req.params.id));
  }
  add = (req, res, next) => {     
    res
      .status(201)  
      .send(this.service.addUser(req.body));
  }
  rewrite = (req, res, next) => {
    res
      .status(201)
      .send(this.service.rewriteUsers(req.body, req.params.id));
  }
  delete = (req, res, next) => {
    res
      .status(200)
      .send(this.service.deleteUser(req.params.id));
  }
};

module.exports = UsersController;