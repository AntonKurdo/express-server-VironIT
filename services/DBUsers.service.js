const db = require('../db');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

class DBUserService {
    constructor() {
        (async() => {
            await db.sequelize.sync();
            await db.User.create({
                name: 'Anton Kurdo',
                password: '$2y$10$nt.VH1bFpkQ4Cv6tbXJy3uGjaxesBl8HorKMHa1zsavlJ7uXwxhnK'
            });            
            await db.User.create({
                name: 'Zhanna',
                password: '$2y$10$nt.VH1bFpkQ4Cv6tbXJy3uGjaxesBl8HorKMHa1zsavlJ7uXwxhnK'
            });            
        })()
    };

    login = (body) => {     
        const access = jwt.sign({login: body.name, type: 'access'}, 'secret', {expiresIn: 300});
        const refresh = jwt.sign({login: body.name, type: 'refresh'}, 'secret', {expiresIn: '24h'});
        return {
            access, 
            refresh
        };
    }
    refreshAccess = (login) => {    
        return {
            token: jwt.sign({login, type: 'access'}, 'secret', {expiresIn: 300})
        }
    }
    getMySelf = (body) => {
        return body;
    }
    getAllUsers = async() => {
        const data = await db.User.findAll({raw: true});
        return data;
    }
    getUser = async(id) => {        
        const user = await db.User.findOne({
                where: {
                    id: id
                }
            });
        if (user === null) {
            return 'User is not found!'
        } else {
            return user;
        }
    }
    addUser = async(user) => {
        try {
         const newUser = await db.User.create(user);  
         return newUser;
        } catch(err) {
            return err.message;
        }       
    }
    rewriteUsers = async(body, id) => {
        const user = await db.User.findOne({
                where: {
                    id: id
                }
            });
             
        if (user === null) {
           return 'Not found!'
        } else {
            if(user.avatar) {
                fs.unlink(path.parse(__dirname).dir + '/' + user.avatar, err => {
                    if(err) {
                        console.log(err)
                    }
                })
            }
            user.update(body);
            return user;
        }
    }
    deleteUser = async(id) => {
        const user = await db.User.destroy({
                where: {
                    id: id
                }
            })
            if(user === 0) {
                return 'Not found!'
            } else {
                return 'User was deleted!'
            }
    }
};

module.exports = DBUserService;