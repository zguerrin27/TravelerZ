module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const tripRoutes = require("../routes/trips");
    const commentRoutes = require("../routes/comments");
    const userRoutes = require("../routes/users");

    app.use(staticRoutes);
    app.use(tripRoutes);
    app.use(commentRoutes);
    app.use(userRoutes);
  }

}