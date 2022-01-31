/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "thisIsAValidGameName",
  description: "Best Game Ever",
  released: "1994-03-28",
  rating: 4,
  platforms: ["Nintendo", "Playstation"],
};

describe("Videogame Get routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );

  describe("GET /videogames will fail if the route no have a page", () => {
    it("should get 404", function () {
      return agent.get("/videogames").expect(404);
    });
  });

  describe("GET /videogames will pass if the route have a page", () => {
    it("should get 200", function () {
      return agent.get("/videogames?page=1").expect(200);
    });
  });

  describe("GET /videogames will fail if the route has a invalid name pass by query", () => {
    it("should get 404", function () {
      return agent.get("/videogames?page=1&name=thisIsAnInvalidName").expect(404);
    });
  });

  describe("GET /videogames will pass if the route has a valid name pass by query", () => {
    it("should get 200", function () {
      return agent.get("/videogames?page=1&name=thisIsAValidGameName").expect(200);
    });
  });

});
