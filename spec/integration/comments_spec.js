const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/trips";

const sequelize = require("../../src/db/models/index").sequelize;
const Trip = require("../../src/db/models").Trip;
const Comment = require("../../src/db/models").Comment;

describe("routes : comments", () => {

  beforeEach((done) => {
    this.trip;
    this.comment;

    sequelize.sync({force: true}).then((res) => {

      Trip.create({
        title: "Winter Adventures in the Alpes",
        description: "The time I found a Yeti...named Freddie"
      })
      .then((trip) => {
        this.trip = trip;

        Comment.create({
          body: "So much snow!",
          tripId: this.trip.id
        })
        .then((comment) => {
          this.comment = comment;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /trips/:tripId/comments/new", () => {

    it("should render a new comment form", (done) => {
      request.get(`${base}/${this.trip.id}/comments/new`, (err, res, body) => {
        expect(err).toBeNull();
        console.log(err)
        expect(body).toContain("New Comment");
        done();
      });
    });

  });

  describe("POST /trips/:tripId/comments/create", () => {

    it("should create a new comment and redirect", (done) => {
       const options = {
         url: `${base}/${this.trip.id}/comments/create`,
         form: {
           body: "I love skiing!!!! Maybe I should plan a trip to the Alpes!"
         }
       };
       request.post(options,
         (err, res, body) => {
           Comment.findOne({where: {body: "I love skiing!!!! Maybe I should plan a trip to the Alpes!"}})
           .then((comment) => {
             expect(comment).not.toBeNull();
             expect(comment.body).toBe("I love skiing!!!! Maybe I should plan a trip to the Alpes!");
             expect(comment.tripId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });

     it("should not create a new post that fails validations", (done) => {
      const options = {
        url: `${base}/${this.trip.id}/comments/create`,
        form: {
          body: "b"
        }
      };

      request.post(options,
        (err, res, body) => {
          Comment.findOne({where: {body: "b"}})
          .then((comment) => {
              expect(comment).toBeNull();
              done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
 
  });

  describe("POST /trips/:tripId/comments/:id/destroy", () => {

    it("should delete the comment with the associated ID", (done) => {
      expect(this.comment.id).toBe(1);

      request.post(`${base}/${this.trip.id}/comments/${this.comment.id}/destroy`, (err, res, body) => {
        Comment.findByPk(1)
        .then((comment) => {
          expect(err).toBeNull();
          expect(comment).toBeNull();
          done();
        })
      });

    });

  });


});