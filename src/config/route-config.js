module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const tripRoutes = require("../routes/trips");

    app.use(staticRoutes);
    app.use(tripRoutes);
  }

}