const formidable = require('formidable');
const db = require('../models/db');


module.exports.get = (req, res) => {
    res.render('pages/index');
}

module.exports.sendMessage = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err)
        }
        console.log(`send message with data: ${fields.name}`)
        db.get('messages')
            .push({name: fields.name, email: fields.email, message: fields.message})
            .write();

    })
        res.redirect(`/?msgsemail=Сообщение отправлено.`);
}