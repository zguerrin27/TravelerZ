const Trip = require("./models").Trip;
const Comment = require("./models").Comment;

module.exports = {
  
  addComment(newComment, callback){
    return Comment.create(newComment)
    .then((comment) => {
      callback(null, comment);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteComment(id, callback){
    return Comment.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  }
  
}