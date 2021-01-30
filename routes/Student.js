const exp = require('express')
const router = exp.Router()
const User = require('../models/userSchema')

router.get('/', (req, res) => {
    User.find((results) => {
        res.json(results)
    })
})


module.exports = router