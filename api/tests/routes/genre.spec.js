/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Genre, conn } = require("../../src/db.js");

const agent = session(app);

describe("Genre Get route", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );


  describe("GET /genre", () => {

    before(() => Genre.sync({ force: true }));

    it("Genre should have no genres", async function () {
      const genres = await  Genre.findAll()
      expect(genres.length).to.be.equal(0)
    });

    it("should get 200", function () {
      return agent.get("/genre").expect(200);
    });

    it("Genre should have 19 genres in it", async function () {
      const genres = await  Genre.findAll()
      expect(genres.length).to.be.equal(19)
    });

  });

});
