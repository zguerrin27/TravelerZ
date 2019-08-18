const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController")

router.get("/trips/:tripId/comments/new", commentController.new);
router.post("/trips/:tripId/comments/create", commentController.create);
router.post("/trips/:tripId/comments/:id/destroy", commentController.destroy);

module.exports = router;