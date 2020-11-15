const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth')
// Welcome Page
router.get('/',(req, res) => res.render('../views/index'));

// router.get('/', ensureGuest, (req, res) => {
//     res.render('login', {
//       layout: 'login',
//     })
//   })

// Dashboard
// Get /dashboard
router.get('/dashboard',(req, res) =>{
    res.render('../views/dashboard')
})

// router.get('/dashboard',ensureAuthenticated,(req, res) =>{
//     res.render('../views/dashboard',{
//         name: req.user
//     })
// })


module.exports = router;