const express = require("express");
const avatarController = require('../controllers/avatarcontroller');
const router = express.Router();

router.post("/", avatarController.avatarController);
router.get("/", avatarController.getAllAvatars);

module.exports= router;