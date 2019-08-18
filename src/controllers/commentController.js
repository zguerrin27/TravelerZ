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
        console.log(err)
        res.redirect(500, "/comments/new");
      } else {
        res.redirect(303, `/trips/${newComment.tripId}`);
      }
    });
  },

  destroy(req, res, next){
    commentQueries.deleteComment(req.params.id, (err, deletedRecordsCount) => {
      if(err){
        res.redirect(500, `/trips/${req.params.tripId}/comments/${req.params.id}`)
      } else {
        res.redirect(303, `/trips/${req.params.tripId}`)
      }
    });
  }

}