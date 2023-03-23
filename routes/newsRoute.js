const express = require('express')
const router = express.Router();

const newsController = require('../controllers/newsController.js')

router.post('/newsapi', newsController.api)
router.get('/news', newsController.getData)

module.exports = router;