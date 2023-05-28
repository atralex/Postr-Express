var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
    requestBody = req.body
    console.log(requestBody)
})

module.exports = router;