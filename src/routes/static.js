const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

// router.get("/landing", staticController.landing);
router.get("/", staticController.index);

module.exports = router;