const exp = require('express')
const router = exp.Router()

router.get('/', (req, res) => {
    res.json('Api')
})

module.exports = router