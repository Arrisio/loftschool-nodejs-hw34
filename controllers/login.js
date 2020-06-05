const formidable = require('formidable');
const db = require('../models/db');


module.exports.get = (req, res) => {
    res.render('pages/login', {title: 'Login'});
};


module.exports.logIn = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (err)  next(err);

        console.log(`logIn : ${fields.email}`)
        req.session.isAdmin = true;
        res.redirect('/admin');
    })

}

