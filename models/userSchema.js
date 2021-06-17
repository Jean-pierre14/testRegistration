const db = require('../config/db')
class User {
    static find(cb) {
        let sql = "SELECT * FROM users ORDER BY id"
        db.query(sql, (err, results) => {
            if (err) throw err
            cb(results)
        })
    }
    static findById(id, cb) {
        let sql = "SELECT * FROM users WHERE id = ?"
        db.query(sql, [id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static UpdateById(id, cb) {
        let sql = `UPDATE users SET username = ?, fullname, password = ? WHERE id = ?`
        db.query(sql, [username, fullname, password, id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static DeleteById(id, cb) {
        let sql = `DELETE FROM users WHERE id = ?`
        db.query(sql, [id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static DeleteAll(cb) {
        let SQL = `DELETE FROM users`
        db.query(SQL, (err, results) => {
            if (err) throw err
            cb(results)
        })
    }
}
module.exports = User