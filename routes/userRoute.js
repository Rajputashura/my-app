const express = require("express");
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const verifyEmail  = require('../controllers/emailVerifyController');
const profileController = require('../controllers/profileController');
const messageContoller = require('../controllers/messageController');
 const peopleContoller = require('../controllers/peopleController');
 const router = express.Router();

 router.post("/register",registerController);
 router.post("/login",loginController);
 router.get("/:id/verify/:token",verifyEmail);
 router.get("/profile",profileController.profileController);
 router.get("/messages/:userId",messageContoller);
 router.get("/people",peopleContoller);
 router.put("/profile/update",profileController.profileController);

 module.exports = router;

 