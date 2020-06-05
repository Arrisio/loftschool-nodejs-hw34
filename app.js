const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))


app.use(
    session({
        secret: 'loftschool',
        key: 'sessionkey',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 5*60*1000
        },
        saveUninitialized: false,
        resave: false
    })
)
app.use(flash());
app.use('/', require('./routes/'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500)
    res.render('pages/error', {
        message: err.message,
        error: err
    })
})

// const server = app.listen(port, () => console.log(`Example app listening on port ${port}`));
const server = app.listen(process.env.PORT || 3000 , () => {
    console.log('Example app listening on port ' + server.address().port);
});