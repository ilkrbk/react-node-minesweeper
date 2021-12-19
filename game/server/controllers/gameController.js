const {Game, User} = require('../models/index')

class GameController {
    async create(req, res) {
        const {isWin, level, timeAmount, date, percentageOfPassing, userId} = req.body
        const game = await Game.create({isWin, level, timeAmount, date, percentageOfPassing, userId})
        return res.json(game)
    }

    async delete(req, res) {
        const {gameId} = req.body
        const game = await Game.destroy({where: {id: gameId}})
        return res.json(game)
    }

    async getWinGames(req, res) {
        const games = await Game.findAll({
            where: {isWin: true},
            include: [{
                model: User,
                required: true
            }]
        })
        return res.json(games)
    }

    async getAllGames(req, res) {
        const games = await Game.findAll({
            include: [{
                model: User,
                required: true
            }]
        })
        return res.json(games)
    }
}

module.exports = new GameController()