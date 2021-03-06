const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/index')

const generateJwt = (id, username, role) => {
    return jwt.sign(
        {id, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, password, role} = req.body
        if (!username || !password) {
            return next('Некорректный username или password')
        }
        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            return next('Пользователь с таким username уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, role, password: hashPassword})
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {username, password} = req.body
        const user = await User.findOne({where: {username}})
        if (!user) {
            return next('Пользователь не найден')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next('Указан неверный пароль')
        }
        const token = generateJwt(user.dataValues.id, user.dataValues.username, user.dataValues.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()