const tripQueries = require("../db/queries.trips.js");

module.exports = {

  index(req, res, next){
    tripQueries.getAllTrips((err, trips) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("trips/index", {trips});
      }
    })
  }

}