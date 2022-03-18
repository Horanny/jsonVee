const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const favicon = require('serve-favicon');
const config = require('./server/config');
const baseRouter = require('./server/router');
const app = express();

/////////////我是分割线/////////////
const model = require('./server/model/Data');
const datafunc = require('./server/myfunc/datafunc');
var testmodel = model.Testmodel;
var daily_salesmodel = model.Daily_SalesModel;
var findall = datafunc.findall;
var selectid = datafunc.selectID;
/////////////我是分割线/////////////

// const middlewares = require('./server/middleware');
const helmet = require('helmet');//防注入中间件
// const session = require('express-session');
// let DCacheUtil = null;
// let DCacheSessionStore = null;

//从绝对路径中读取网页图标
app.use(favicon(__dirname + '/client/assets/image/favicon.ico'))

//X-Powered-By是网站响应头信息其中的一个，
//出于安全的考虑，一般会修改或删除掉这个信息。
app.disable('x-powered-by');

//在node中，有全局变量process表示的是当前的node进程。
//NODE_ENV是一个用户自定义的变量，
//在webpack中它的用途是判断生产环境或开发环境。
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'local';
}
//output应为local
console.log("Node 的版本是？" + process.env.NODE_ENV);

app.use(require('cors')());

//express 使用html模板
//模板配置
if(Object.is(process.env.NODE_ENV,'local')){
    //将ejs模板映射到.html文件
    //上面实际上是调用了ejs的.renderFile()方法
    //ejs.__express是该方法在ejs内部的另一个名字。
    //因为加载的模板引擎后调用的是同一个方法.__express，
    //所以如果使用的是ejs模板，不用配置该项。
    app.engine('.html', require('ejs').__express);

    //在.set()方法的参数中，有一项是'view engine'，
    //表示没有指定文件模板格式时，默认使用的引擎插件；
    //如果这里设置为html文件，设置路由指定文件时，
    //只需写文件名，就会找对应的html文件。
    app.set('view engine', 'html');
    // app.set('views', __dirname + '/server/mock/views');
}

//使用helmet模块保证应用安全性
app.use(helmet());
//压缩请求
app.use(compress());
//这个方法返回一个仅仅用来解析json格式的中间件。
//这个中间件能接受任何body中任何Unicode编码的字符。
//支持自动的解析gzip和 zlib。
app.use(bodyParser.json(config.bodyParserJsonOptions));
//这个方法也返回一个中间件，
//这个中间件用来解析body中的urlencoded字符， 
//只支持utf-8的编码的字符。同样也支持自动的解析gzip和 zlib
/////////////////////////////////////
//bodyParser.json是用来解析json数据格式的。
//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，
//也就是请求头中包含这样的信息： 
//Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(config.bodyParserUrlencodedOptions));
//方便操作客户端中的cookie值。
app.use(cookieParser());

//拦截请求,添加参数校验
baseRouter.ptorHttp(app);
//在进入首页或详情页时session check
app.use(async function (req, res, next) {
    console.log('goto web page' + req.path);
    // TODO
    next();
});

//使用静态文件？
app.use(express.static(path.join(__dirname, './dist')));

app.get('/test', async function(req,res){
    findall(daily_salesmodel).then(doc =>{
        res.send(doc);
    })
})

app.get('/selectID', async function(req,res){
    let ID = req.query.ID;
    ID = parseInt(ID);
    console.log(ID);
    selectid(daily_salesmodel,ID).then(doc =>{
        res.send(doc);
    })
})

app.get('/',function(req,res){
    res.send('hello');
})

// app.use(session({
//     secret: 'foo',
//     cookie: { secure: false, maxAge: 1000 * 60 * 60 * 8 },
//     //cookie: {secure: false, maxAge: 1000 * 60 },
//     resave: false,//是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
//     rolling: true,//是否按照原设定的maxAge值重设session同步到cookie中，要保证session有操作的时候必须设置这个属性为true
//     saveUninitialized: true,//是否设置session在存储容器中可以给修改
//     store: DCacheSessionStore ? new DCacheSessionStore({
//         client: DCacheUtil
//     }) : undefined
//     //unset:'keep'//设置req.session在什么时候可以设置;destory:请求结束时候session摧毁;keep:session在存储中的值不变，在请求之间的修改将会忽略，而不保存
// }));

// app.use(middlewares());

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(`path : ${req.path}`, err);

    res.json({
        code: -1001,
        msg: err.message
    });

});
app.set('host', process.env.IP || 'localhost');
app.set('port', process.env.PORT || 8050);

const server = app.listen(app.get('port'), app.get('host'), function () {
    console.log('server listening on port', server.address().port);
});
