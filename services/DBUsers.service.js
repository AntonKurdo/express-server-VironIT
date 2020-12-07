const db = require('../db');

class DBUserService {
    constructor() {
        (async() => {
            await db.sequelize.sync();
            await db.User.create({name: 'Anton Kurdo'});
            await db.User.create({name: 'Jane Doe'});
        })()
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
            return 'Not found!'
        } else {
            return user;
        }
    }
    addUser = async(user) => {
       const newUser = await db.User.create(user);  
       return newUser;
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
        return 'User was deleted'
    }
};

module.exports = DBUserService;