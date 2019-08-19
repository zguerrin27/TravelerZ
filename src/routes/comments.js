const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");
const validation = require("./validation");

router.get("/trips/:tripId/comments/new", commentController.new);
router.post("/trips/:tripId/comments/create", validation.validatePosts, commentController.create);
router.post("/trips/:tripId/comments/:id/destroy", commentController.destroy);

module.exports = router;