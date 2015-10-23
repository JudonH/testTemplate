//引入express模块
var express = require('express');
//路由级中间件
var router = express.Router();


router.get('/testCompile',function(req, res, next){

});
router.get('/testRender',function(req, res,next){

});
router.get('/test',function(req,res,next){

});

//错误处理
router.use(function(err,req,res,next){
	console.error(err.message);
	next(err);
});

module.exports = router;