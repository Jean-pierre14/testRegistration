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
    User.findById(id, (result) => {
        res.json(result)
    })
})

module.exports = router