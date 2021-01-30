const pool = require('./pool')
const bcrypt = require('bcrypt')

function User() { }

User.prototype = {
    find: function (user = null, callback) {

        if (user) {
            var field = Number.isInteger(user) ? id : username
        }

        let sql = `SELECT * FROM users WHERE ${field} = ?`
        pool.query(sql, user, function (err, result) {
            if (err) throw err
            callback(result)
        })
    }, create: function (body, callback) {
        let pwd = body.password
        body.password = bcrypt.hashSync(pwd, 10)

        let pass = body.password

        pool.query(`INSERT INTO users(username, fullname, password) VALUES("${body.username}", "${body.fullname}", "${pass}")`, function (err, lastId) {
            if (err) throw err
            console.log(body)
            callback(lastId)
        })
    },
    login: function (username, password, callback) {
        // console.log(username, password)
        let pass = bcrypt.hashSync(password, 10)
        let sql = `SELECT * FROM users WHERE username = "${username}" AND password = "${pass}"`
        console.log(pass, username)
        pool.query(sql, function (err, user) {
            if (err) throw err
            callback(user)
        })
        // this.find(username, function (user) {
        //     console.log("Find" + username)
        //     if (user) {
        //         if (bcrypt.compareSync(password, user.password)) {
        //             callback(user)
        //             return
        //         }
        //     }
        //     callback(null)
        // })
    }
}

module.exports = User