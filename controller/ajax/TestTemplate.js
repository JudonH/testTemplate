//引入express模块
var express = require('express');
//路由级中间件
var router = express.Router();
var template=require('art-template');
var juicer=require('juicer');
var doT=require('dot');
var ejs=require('ejs');
var jade=require('jade');
var Handlebars=require('handlebars');
var underscore=require('underscore');
var baiduTemplate=require('baidutemplate');
var mustache=require('mustache');
// var easyTemplate=require('e')


var data={
	list:[]
};

var templatelist={
	art_template:'<ul><% for (i = 0, l = list.length; i < l; i ++) { %><li><%=list[i].index%>. 用户: <%=list[i].user%>/ 网站：<%=list[i].site%></li><% } %></ul>',
	baidu_template:'<ul><% for (var val, i = 0, l = list.length; i < l; i ++) { %><% val = list[i]; %><li><%:=val.index%>. 用户: <%:=val.user%>/ 网站：<%:=val.site%></li><% } %></ul>',
	underscore:'<ul><% for (var i = 0, l = list.length; i < l; i ++) { %><li><%=list[i].index%>. 用户: <%=list[i].user%>/ 网站：<%=list[i].site%></li><% } %></ul>',
};

// 待测试的引擎列表
var testList = {list:[

    {
        name: 'artTemplate',
        tester: function () {
            template.isEscape = false;
            var source = templatelist.art_template;
            for (var i = 0; i < data.times; i ++) {
                var fn = template.compile(source);
                fn(data);
            }
        },
        comp: function () {
            template.isEscape = false;
            var source = templatelist.art_template;
            for (var i = 0; i < data.times; i ++) {
                var fn = template.compile(source);
            }
        },
        render: function () {
            template.isEscape = false;
            var source = templatelist.art_template;
            var fn = template.compile(source);
            for (var i = 0; i < data.times; i ++) {
                fn(data);
            }
        }
    },
    {
        name: 'baiduTemplate',
        tester: function () {
            var bt=baiduTemplate.template;
            bt.ESCAPE = false;
            for (var i = 0; i < data.times; i ++) {
                var fun = baiduTemplate.template('baidu-template');
                var html1 = fun(data);
                // bt('baidu-template', data);
            }
        },
        comp: function () {
            var bt=baiduTemplate.template;
            bt.ESCAPE = false;
            var source=
            for (var i = 0; i < data.times; i ++) {
                var fun = baiduTemplate.template(,);
                // var html1 = fun(data);
                // bt('baidu-template', data);
            }
        },
        render: function () {
            var bt=baiduTemplate.template;
            bt.ESCAPE = false;
            var fun = baiduTemplate.template('baidu-template');
            for (var i = 0; i < data.times; i ++) {
                var html1 = fun(data);
            }
        }
    }    
]};

//初始化数据
function initData(req){
	data.isCache=req.query.isCache || true;
	data.length=req.query.length || 100;
	data.times=req.query.times||1000;
	for(var i=0;i<data.length;i++){
		data.list.push({
			index:i,
			user:'<strong style="color:red">Mike</strong>',
			age:'29',
			title:'this is a test',
			site:'http://example.com'
		});
	}
}

var startComp = function (list) {
	var data=[];
    var Timer = function (){
        this.startTime = + new Date;
    };

    Timer.prototype.stop = function(){
        return + new Date - this.startTime;
    };  
    var comp = function (target) {   
        var result={};
        result.name=target.name;
        var time = new Timer;
        target.comp();
        var endTime = time.stop();      
        result.time=endTime;
        data.push(result);   
    };
    for(var i=0;i<list.length;i++){
    	comp(list[i]);
    }
    
    return data;

};

router.get('/testCompile',function(req, res, next){
	initData(req);
	var data=startComp(testList.list);
	console.log(data);
	res.send(data);
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