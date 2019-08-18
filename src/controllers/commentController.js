const commentQueries = require("../db/queries.comments.js");

module.exports = {

  new(req, res, next){
    res.render("comments/new", {tripId: req.params.tripId} ); 
  },

  create(req, res, next){
    let newComment = {
      body: req.body.body,
      tripId: req.params.tripId
    };
    commentQueries.addComment(newComment, (err, comment) => {
      if(err){
        res.redirect(500, "/comments/new");
      } else {
        res.redirect(303, `/trips/${newComment.tripId}/comments/${comment.id}`);
      }
    });
  }

}