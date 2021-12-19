require('dotenv').config()
const express = require('express')
const models = require('./models')
const cors = require('cors')
const router = require('./routes/')
const sequelize = require('./db')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()