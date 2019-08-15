module.exports = {

  // landing(req, res, next){
  //   res.render("static/landing", {title: "Welcome to TravelerZ"})
  // },

  index(req, res, next){
    res.render("static/index", {title: "Welcome to TravelerZ"});
  }

}