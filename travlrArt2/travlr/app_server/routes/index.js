const express = require('express');
const router = express.Router();
const ctrlMain = require('../Controllers/main');



    

/* GET home page. */
router.get('/', ctrlMain.index);
    

module.exports = router;
