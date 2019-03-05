var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, orderItems: ["cocacola", "french-fries"]},
    {id: 2, orderItems: ["cocacola", "french-fries"]}
  ]);
});

module.exports = router;
