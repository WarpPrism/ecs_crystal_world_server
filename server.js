const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const app = express();


const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = (env == 'development')?true:false;
app.set('env', env);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'static')));

const router = require('./routers/main');
app.use(router);


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// app.use(favicon(__dirname + '/static/favicon.ico'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log("------------------------------------------");    
    console.log("         niwe            gpod            ");
	console.log("      sqstruesdq      jvswarmqwe         ");
	console.log("     ogivemepassideslonmayigetint        ");
	console.log("     woyourheartbewygarlsrigndokw        ");
	console.log("     eijustwanttobeyoursideandgir        ");
	console.log("      rvemewhatihaveletusstepint         ");
	console.log("       jtusdfimissyouasdfgvfert          ");
	console.log("        vsasdwvbcaniowwyourhea           ");
	console.log("         byouarebeautifulrigh            ");
	console.log("          dtvbhfransfesgniet             ");
	console.log("            cdqwesdvfgansd               ");
	console.log("              eswasdwssd                 ");
	console.log("                 ader                    ");
    console.log("                  y                      ");
    console.log("------------------------------------------\n");
    console.log('ECS_Crystal_World_Sever Started At Port: @' + server.address().port);
    console.log('Built With ❤️');
    console.log('http://127.0.0.1:' + server.address().port);
})
