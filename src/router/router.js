const express = require('express')
const router = express.Router()

router.use(function timelog(req, res, next) {
	console.log('Time is ' + Date.now());
	next();
})

router.get('/', function (req, res) {
	console.log('1111');
	res.send({a: '1111'});
})

router.get('/test', function (req, res) {
	console.log('test');
	res.send('test');
})

module.exports = router
