const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'public/assets/img/products/' })

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
        // то всё хорошо :)
        return next()
    }
    // если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/login')
}

router.get('/', ctrlHome.get);
router.post('/', ctrlHome.sendMessage);

router.get('/login', ctrlLogin.get);
router.post('/login', ctrlLogin.logIn);

router.get('/admin', isAdmin, ctrlAdmin.get);
router.post('/admin/skills', isAdmin, ctrlAdmin.addSkill);
router.post('/admin/upload', isAdmin, ctrlAdmin.addProcuct);

module.exports = router