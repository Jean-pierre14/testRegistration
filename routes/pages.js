const exp = require('express')
const router = exp.Router()
const User = require('../models/userSchema')

router.use('/student', require('./Student'))


router.get('/', (req, res) => {
    User.find((results) => {
        res.json(results)
    })
})

router.get('/get/:id', (req, res) => {
        let id = req.params.id
        User.findById(id, (result) => {
            res.json(result)
        })
    })
    // post
router.post('/addUser', (req, res) => {
    const { username, fullname, email, password } = req.body

    if (!username || !fullname || !email || !password) {
        res.json("Error")
    } else {
        res.json("Pass no error")
    }

})

module.exports = router