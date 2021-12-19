const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    raiting: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isWin: {type: DataTypes.BOOLEAN, allowNull: false},
    level: {type: DataTypes.STRING, allowNull: false},
    timeAmount: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    percentageOfPassing: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasMany(Game)
Game.belongsTo(User)

module.exports = {
    User,
    Game
}