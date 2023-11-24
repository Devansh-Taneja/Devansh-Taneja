const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')


router.get('/',authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user // Pass the user object to the template
    });
});
router.get('/register', (req, res) => {
    res.render('register');
})
router.get('/index', (req, res) => {
    res.render('index');
})
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/profile', authController.isLoggedIn, (req, res) => {
    if(!req.user){
        res.redirect('login')
    }
    else {
        res.render('profile', { user: req.user });
    }
    
});

module.exports = router;