const sequelize = require('../db');
const User = require('../db/models/User.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const passwordCrypt = require('../utils/pasCrypt.utils');

class DBUserService {
    constructor() {
        (async () => {
            await sequelize.sync();
            await User.create({
                name: 'Anton',
                password: '$2y$10$nt.VH1bFpkQ4Cv6tbXJy3uGjaxesBl8HorKMHa1zsavlJ7uXwxhnK'
            });
            await User.create({
                name: 'Zhanna',
                password: '$2y$10$nt.VH1bFpkQ4Cv6tbXJy3uGjaxesBl8HorKMHa1zsavlJ7uXwxhnK'
            });
            fs.readdir(path.parse(__dirname).dir + '/public', (err, files) => {
                if (err) {
                    console.log(err)
                    return;
                }
                if (files.length !== 0) {
                    files.forEach(file => {
                        fs.unlink(path.parse(__dirname).dir + '/public/' + file, err => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    })
                }
            })
        })()
    };

    login = async (body) => {
        try {
            const candidate = await User.findOne({
                where: {
                    name: body.name
                }
            });
            if (candidate) {
                const match = await bcrypt.compare(body.password, candidate.password);
                if (match) {
                    const access = jwt.sign({
                        login: body.name,
                        type: 'access'
                    }, 'secret', {
                        expiresIn: 300
                    });
                    const refresh = jwt.sign({
                        login: body.name,
                        type: 'refresh'
                    }, 'secret', {
                        expiresIn: '24h'
                    });
                    return {
                        access,
                        refresh
                    };
                } else {
                    return 'Wrong password...'
                }
            } else {
                return 'User not found...'
            }
        } catch (e) {
            return e.message
        }
    }
    refreshAccess = (login) => {
        return {
            token: jwt.sign({
                login,
                type: 'access'
            }, 'secret', {
                expiresIn: 300
            })
        }
    }
    getMySelf = (body) => {
        return body;
    }
    getAllUsers = async () => {
        try {
            const data = await User.findAll({
                raw: true
            });
            return data;
        } catch (e) {
            return e.message
        }
    }
    getUser = async (id) => {
        try {
            const user = await User.findOne({
                where: {
                    id: id
                }
            });
            return {
                ...user.dataValues,
                userPics: await user.getPhotos({
                    raw: true
                })
            };
        } catch (e) {
            return e.message
        }
    }
    addUser = async (user) => {
        try {
            user.password = await passwordCrypt(user.password);
            const newUser = await User.create(user);
            return newUser;
        } catch (err) {
            return err.message;
        }
    }
    rewriteUsers = async (body, id) => {
        const user = await User.findOne({
            where: {
                id: id
            }
        });
        if (user === null) {
            return 'Not found!'
        } else {
            if (user.avatar) {
                fs.unlink(path.parse(__dirname).dir + '/' + user.avatar, err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
            body.password = await passwordCrypt(body.password);
            user.update(body);
            return user;
        }
    }
    deleteUser = async (id) => {
        const user = await User.destroy({
            where: {
                id: id
            }
        })
        if (user === 0) {
            return 'Not found!'
        } else {
            return 'User was deleted!'
        }
    }
    getPartData = async (query) => {
        const data = await User.findAndCountAll({
            offset: query.page === '1' ? 0 : (query.page * query.count) - query.count,
            limit: query.count,
            where: {},
        });
        return {
            content: data.rows,
            page: query.page,
            count: query.count,
            totalCount: data.count,
            totalPages: Math.ceil(data.count / query.count)
        };
    }
};

module.exports = DBUserService;