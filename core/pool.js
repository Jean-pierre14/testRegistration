const util = require('util')
const mysql = require('mysql')
const { success, error } = require('consola')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodes'
})

pool.getConnection((err, connection) => {
    if (err) error({ message: `${err}`, badge: true })
    if (connection) {
        success({ message: `Connected to the database`, badge: true })
        connection.release()
    }
    return
})

pool.query = util.promisify(pool.query)

module.exports = pool