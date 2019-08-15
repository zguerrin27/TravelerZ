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
});