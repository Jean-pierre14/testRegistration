const exp = require('express')
const User = require('../core/user')
const router = exp.Router()
const user = new User

router.get('/', (req, res) => {
    let user = req.session.user

    if (user) {
        res.redirect('/home')
        return
    }
    res.render('index')
})

router.get('/home', (req, res) => {
    let user = req.session.user

    if (user) {
        res.render('home', { opp: req.session.opp, name: user.fullname })
        return
    }
    res.redirect('/')
})

router.post('/login', (req, res) => {
    user.login(req.body.username, req.body.password, (result) => {
        if (result) {
            req.session.user = result
            req.session.opp = 1

            res.redirect('/home')
        } else {
            res.send('Username or password incorrect')
        }
    })
})
router.post('/register', (req, res) => {
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    }

    user.create(userInput, (lastId) => {
        if (lastId) {
            user.find(lastId, function (result) {
                req.session.user = result
                req.session.opp = 0
                res.redirect('/home')
            })
        } else {
            console.log('Error creating a new user...')
        }
    })
})

// Loggout
router.get('/loggout', (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(function () {
            res.redirect('/')
        })
    }
})

module.exports = router