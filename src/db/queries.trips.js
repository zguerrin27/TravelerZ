const Trip = require("./models").Trip;
const Comment = require("./models").Comment;

module.exports = {

  getAllTrips(callback){
    return Trip.findAll()
    .then((trips) => {
      callback(null, trips);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addTrip(newTrip, callback){
    return Trip.create({
      title: newTrip.title,
      description: newTrip.description
    })
    .then((trip) => {
      callback(null, trip);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getTrip(id, callback){
    return Trip.findByPk(id, {
      include: [{
        model: Comment,
        as: "comments"
      }]
    })
    .then((trip) => {
      callback(null, trip);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteTrip(id, callback){
    return Trip.destroy({
      where: {id}
    })
    .then((trip) => {
      callback(null, trip);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateTrip(id, updatedTrip, callback){
    return Trip.findByPk(id)
    .then((trip) => {
      if(!trip){
        return callback("Trip not found");
      }
      trip.update(updatedTrip, {
        fields: Object.keys(updatedTrip)
      })
      .then(() => {
        callback(null, trip);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}