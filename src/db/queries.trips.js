const Trip = require("./models").Trip;

module.exports = {

  getAllTrips(callback){
    return Trip.findAll()
    .then((trips) => {
      callback(null, trips);
    })
    .catch((err) => {
      callback(err);
    })
  }

}