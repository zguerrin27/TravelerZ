const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController")

router.get("/trips", tripController.index);
router.get("/trips/new", tripController.new);
router.post("/trips/create", tripController.create);
router.get("/trips/:id", tripController.show);
router.post("/trips/:id/destroy", tripController.destroy);
router.get("/trips/:id/edit", tripController.edit);
router.post("/trips/:id/update", tripController.update);

module.exports = router;