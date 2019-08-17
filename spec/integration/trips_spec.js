const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/trips/";
const sequelize = require("../../src/db/models/index").sequelize;
const Trip = require("../../src/db/models").Trip;

describe("routes : trips", () => {

  beforeEach((done) => {
    this.trip;
    sequelize.sync({force: true}).then((res) => {

     Trip.create({
       title: "Amsterdam Trip",
       description: "It was a fun one"
     })
      .then((trip) => {
        this.trip = trip;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  
  describe("GET /trips", () => {

    it("should return a status code 200 and all topics", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Trips");
        expect(body).toContain("Amsterdam Trip");
        done();
      });
    });
         
  });

  describe("GET /trips/new", () => {

    it("should render a new trip form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Trip");
        done();
      });
    });

  });

  describe("POST /trips/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Trip to India",
        description: "What's your favorite type of food?"
      }
    };

    it("should create a new topic and redirect", (done) => {
      request.post(options,
        (err, res, body) => {
          Trip.findOne({where: {title: "Trip to India"}})
          .then((trip) => {
            expect(res.statusCode).toBe(303);
            expect(trip.title).toBe("Trip to India");
            expect(trip.description).toBe("What's your favorite type of food?");
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

  describe("GET /trips/:id", () => {

    it("should render a view with the selected trip", (done) => {
      request.get(`${base}${this.trip.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Amsterdam Trip");
        done();
      });
    });

  });

  describe("POST /trips/:id/destroy", () => {

  it("should delete the trip with the associated ID", (done) => {
    Trip.findAll()
    .then((trips) => {
      const tripCountBeforeDelete = trips.length;
      expect(tripCountBeforeDelete).toBe(1);
      request.post(`${base}${this.trip.id}/destroy`, (err, res, body) => {
        Trip.findAll()
        .then((trips) => {
          expect(err).toBeNull();
          expect(trips.length).toBe(tripCountBeforeDelete - 1);
          done();
        })

      });
    });

   });

  });

  describe("GET /trips/:id/edit", () => {

    it("should render a view with an edit trip form", (done) => {
      request.get(`${base}${this.trip.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Trip");
        expect(body).toContain("Amsterdam Trip");
        done();
      });
    });

  });

  describe("POST /trips/:id/update", () => {

    it("should update the trip with the given values", (done) => {
       const options = {
          url: `${base}${this.trip.id}/update`,
          form: {
            title: "Amsterdam Trip",
            description: "It was a really really really good time."
          }
        };
        request.post(options,
          (err, res, body) => {
          expect(err).toBeNull();
          Trip.findOne({
            where: { id: this.trip.id }
          })
          .then((trip) => {
            expect(trip.title).toBe("Amsterdam Trip");
            done();
          });
        });
    });

  });


});