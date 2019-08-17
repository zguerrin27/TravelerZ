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
  },

  new(req, res, next){
    res.render("trips/new");
  },

  create(req, res, next){
    let newTrip = {
      title: req.body.title,
      description: req.body.description
    };
    tripQueries.addTrip(newTrip, (err, trip) => {
      if(err){
        res.redirect(500, "/trips/new");
      } else {
        res.redirect(303, `/trips/${trip.id}`);
      }
    });
  },

  show(req, res, next){
    tripQueries.getTrip(req.params.id, (err, trip) => {
      if(err || trip == null){
        res.redirect(404, "/");
      } else {
        res.render("trips/show", {trip});
      }
    });
  },

  destroy(req, res, next){
    tripQueries.deleteTrip(req.params.id, (err, trip) => {
      if(err){
        console.log("EERRROR FROM DESTROY ROUTE IN CONTROLLER")
        res.redirect(500, `/trips/${trip.id}`)
      } else {
        res.redirect(303, "/trips")
      }
    });
  },

  edit(req, res, next){
    tripQueries.getTrip(req.params.id, (err, trip) => {
      if(err || trip == null){
        res.redirect(404, "/");
      } else {
        res.render("trips/edit", {trip});
      }
    });
  },

  update(req, res, next){
    tripQueries.updateTrip(req.params.id, req.body, (err, trip) => {
      if(err || trip == null){
        res.redirect(404, `/trips/${req.params.id}/edit`);
      } else {
        res.redirect(`/trips/${trip.id}`);
      }
    });
  }

}