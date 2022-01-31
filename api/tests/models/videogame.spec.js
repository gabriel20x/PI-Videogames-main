const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

const DESCRIPTION = 'Best Game Ever'
const NAME = 'Zelda: Ocarine of time'
const RELEASED = '1994-03-28'
const RATING = 4
const PLATFORMS = ['Nintendo','Playstation']

describe('Videogame model testing', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {

    beforeEach(async function() {
      await Videogame.sync({ force: true });
    });

    describe('Name Validation', () => {

      it('should throw an error if name is null', (done) => {
        Videogame.create({
          name : null,
          description : DESCRIPTION,
          released: RELEASED,
          rating : RATING,
          platforms : PLATFORMS
        })
          .then(() => done(new Error('Videogame was created, it should not')))
          .catch(() => done());
      });

      it('should work when its a valid name', (done) => {
        Videogame.create({
          name: NAME,
          description : DESCRIPTION,
          released: RELEASED,
          rating : RATING,
          platforms : PLATFORMS
        })
          .then(() => done())
          .catch(() => done(new Error('Videogame was not created, not has a valid name')));
      });

    });
      describe('Description Validation', () => {

        it('should throw an error if description is null', (done) => {
          Videogame.create({
            name : NAME,
            description : null,
            released: RELEASED,
            rating : RATING,
            platforms : PLATFORMS
          })
            .then(() => done(new Error('Videogame was created, it should not')))
            .catch(() => done());
        });
  
        it('should work when its a valid description', (done) => {
          Videogame.create({
            name: NAME,
            description : DESCRIPTION,
            released: RELEASED,
            rating : RATING,
            platforms : PLATFORMS
          })
            .then(() => done())
            .catch(() => done(new Error('Videogame was not created, not has a valid description')));
        });
    });
  });
});
