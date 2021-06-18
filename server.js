const exp = require('express')
const path = require('path')
const session = require('express-session')
const router = require('./routes/pages')
const { success, error } = require('consola')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 5000
const app = exp()
const db = require('./config/db')

dotenv.config()
db.connect((err, con) => {
    if (err) throw err
    success({ message: `Connected to the database ${con.database}`, badge: true })
})

app.use(exp.urlencoded({ extended: false }))
app.use(exp.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'grace',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', router)

app.use((req, res, next) => {
    var err = new Error('Page not found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message)
})

app.listen(PORT, (err) => {
    if (err) error({ message: `${err}`, badge: true })
    success({ message: `SERVER run on port ${PORT}`, badge: true })
})