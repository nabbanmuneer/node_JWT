const express = require("express");
const router = express.Router();
const passport = require("passport") 

const homeController = require("../controllers/homeController");
const authCheck = require('../middlerware/auth')

router.post('/register',homeController.register);
router.post('/login',homeController.Login)
router.post('/post/:id',passport.authenticate,homeController.post);
router.post('loactionSearch',passport.authenticate,homeController.post);
router.get('/status',passport.authenticate,homeController.status);

module.exports = router;