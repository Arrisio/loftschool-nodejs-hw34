const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const db = require('../models/db');


module.exports.get = (req, res) => {
    res.render('pages/admin', {title: 'Admin'});
};

module.exports.addSkill = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err)
        }
        console.log(`add skill : ${fields.name}`)
        db.get('skills')
            .push({age: fields.age, concerts: fields.concerts, cities: fields.cities, years: fields.years})
            .write();
    })
    res.redirect(`/admin?msg=скил добавлен`);
}

module.exports.addProcuct = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public', 'upload')

    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err)
        }
        console.log(`add procuct : ${fields.name}`)
        //
        db.get('products')
            .push({photo: files.photo.path, name: fields.name, price: fields.price})
            .write();
    })
    res.redirect(`/admin?msg=продукт добавлен`);
}