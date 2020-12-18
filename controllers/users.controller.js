const DBUserService = require("../services/DBUsers.service");
const UserService = require("../services/users.sevice");

class UsersController {
  constructor() {
    // this.service = new UserService();
    this.service = new DBUserService();
  }
  login = async(req, res, next) => {
    res
      .status(200)
      .send(await this.service.login(req.body));    
  }
  refreshAccess = (req, res, next) => {
    res
      .status(200)
      .send(this.service.refreshAccess(req.login))
  }
  getMySelf = async(req, res, next) => {
    res
      .status(200)
      .send(this.service.getMySelf(req.login))
  }
  getAll = async(req, res, next) => {
    if(!Object.keys(req.query).length) {
      res
      .status(200)
      .send({
        users: await this.service.getAllUsers(), 
        login: req.login
      });
    } else {
      res.status(200).send(await this.service.getPartData(req.query))
    }         
  }
  getUser =  async(req, res, next) => {
    res
      .status(200)
      .send({
        user: await this.service.getUser(req.params.id),
        login: req.login
      });
  }
  add = async(req, res, next) => {   
    res
      .status(201)  
      .send(await this.service.addUser(req.body));
  }
  rewrite = async(req, res, next) => {
    res
      .status(201)
      .send({
        user: await this.service.rewriteUsers(req.body, req.params.id),
        login: req.login
      });
  }
  delete = async(req, res, next) => {
    res
      .status(200)
      .send({
        message: await this.service.deleteUser(req.params.id),
        login: req.login
      });
  }
};

module.exports = UsersController;