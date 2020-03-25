const mongoose = require('mongoose')
const config = require('../config')

const initMongoose = async () => {
    const { userName, pwd, port, host, dbName } = config.db
    // const dbURL = `mongodb://${userName}:${pwd}@${host}:${port}/${dbName}`
    const dbURL = `mongodb://${host}:${port}/${dbName}`
    mongoose.connect(dbURL)
    const conn = mongoose.connection

    await new Promise((resolve, reject) => {
        conn.on('connected', function (err) {
            if (err) {
                console.log('数据库连接失败', err)
                // reject(err)
            }
            console.log(`数据库[${dbName}]连接成功!!`)
        })

        conn.on('open', function (err) {
            if (err) {
                console.log('数据库连接失败', err)
                reject(err)
            }
            console.log(`数据库[${dbName}]opened!!!`)
            resolve()
        })

        conn.on('error', function (err) {
            console.log('连接错误', err)
            reject(err)
        })

        conn.on('disconnected', function () {
            console.log('disconnected')
            reject(Error('disconnected'))
        })

        process.on('SIGINT', function () {
            conn.close(function () {
                reject(Error('SIGINT'))
                console.log('Mongoose disconnected through app termination')
                process.exit(0)
            })
        })
    })
}

module.exports = initMongoose