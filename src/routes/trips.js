const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController")

router.get("/trips", tripController.index);

module.exports = router;