const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const landing = "http://localhost:3000/landing";

describe("routes : static", () => {

  describe("GET /landing", () => {

    it("should return status code 200", (done) => {
      request.get(landing, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("GET /", () => {

    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

});