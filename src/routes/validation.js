module.exports = {
  validatePosts(req, res, next) {

    if(req.method === "POST") {
      req.checkParams("tripId", "must be valid").notEmpty().isInt();
      req.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("username", "must be valid").isLength({max: 35})
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }
    const errors = req.validationErrors();
    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }


}