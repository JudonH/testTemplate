//引入express模块
var express = require('express');
//引入路劲解析模块
var path = require('path');
//引入腾讯模板引擎
var template=require('art-template');


//初始化controller
var CONTROLLER_PATH=__dirname+'controller\\';
var test_template=require('./controller/ajax/TestTemplate');

//配置全局变量
global={
	STATICS_URL:'/!__.__!'
};

//实例化一个express对象
var app = express();

//不开启缓存，用于开发阶段使用
template.config('cache', false);
//设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.engine('.html', template.__express);
//设置模板后缀
app.set('view engine', 'html');


//设置静态模块文件，建立'虚拟'目录为'/!__.__!'
app.use('/!__.__!', express.static(path.join(__dirname, 'statics')));
//设置多个静态资源
app.use('/',express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'public')));

//设置中间组件
app.use('/ajax',test_template);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//监听
var server = app.listen(3000,function() {
	//主机名
	var host = server.address().address;
	//端口
	var port = server.address().port;
	console.log('App listening at http://localhost:%s', port);
});