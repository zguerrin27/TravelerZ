const sequelize = require("../../src/db/models/index").sequelize;
const Trip = require("../../src/db/models").Trip;
const Comment = require("../../src/db/models").Comment;

describe("Comment", () => {

  beforeEach((done) => {
    this.trip;
    this.comment;
    sequelize.sync({force: true}).then((res) => {

      Trip.create({
        title: "Expeditions to the North Pole",
        description: "A set of reports from our trip to the great north."
      })
      .then((trip) => {
        this.trip = trip;
        Comment.create({
          body: "I saw some dead people.",
          tripId: this.trip.id
        })
        .then((comment) => {
          this.comment = comment;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a comment object with a body, and assigned trip", (done) => {
      Comment.create({
        body: "This looks like a super fun trip!!!",
        tripId: this.trip.id
      })
      .then((comment) => {
        expect(comment.body).toBe("This looks like a super fun trip!!!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a comment with missing body, or assigned topic", (done) => {
      Comment.create({
        tripId: this.trip.id
      })
      .then((comment) => {
       // the code in this block will not be evaluated since the validation error
       // will skip it. Instead, we'll catch the error in the catch block below
       // and set the expectations there
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Comment.body cannot be null");
        done();
 
      })
    });

  });

  describe("#setTrip()", () => {

    it("should associate a trip and a comment together", (done) => {
      Trip.create({
        title: "Problems in Botswanna",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTrip) => {
        expect(this.comment.tripId).toBe(this.trip.id);
        this.comment.setTrip(newTrip)
        .then((comment) => {
          expect(comment.tripId).toBe(newTrip.id);
          done();
        });
      })
    });

  });

  describe("#getTrip()", () => {

    it("should return the associated trip", (done) => {

      this.comment.getTrip()
      .then((associatedTrip) => {
        expect(associatedTrip.title).toBe("Expeditions to the North Pole");
        done();
      });

    });

  });


});