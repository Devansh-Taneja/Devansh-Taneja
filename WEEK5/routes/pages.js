const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')


router.get('/', (req, res) => {
    res.render('index', {
        user: req.user // Pass the user object to the template
    });
});
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})
router.get("/index",(req,res) =>{
    res.render('index');
});
router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log("this is the user from the req of the profile", req.user)
    // Route logic for the profile page for authenticated users
    res.render('profile', { user: req.user }); // req.user contains the user information
});

module.exports = router;