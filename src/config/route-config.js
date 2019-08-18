module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const tripRoutes = require("../routes/trips");
    const commentRoutes = require("../routes/comments");

    app.use(staticRoutes);
    app.use(tripRoutes);
    app.use(commentRoutes);
  }

}