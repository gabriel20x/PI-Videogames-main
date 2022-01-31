const { Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

const NAME = 'Action'

describe('Genre model testing', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {

    beforeEach(async function() {
      await Genre.sync({ force: true });
    });

    describe('Name Validation', () => {

      it('should throw an error if name is null', (done) => {
        Genre.create({
          name : null,
        })
          .then(() => done(new Error('Videogame was created, it should not')))
          .catch(() => done());
      });

      it('should work when its a valid name', (done) => {
        Genre.create({
          name: NAME,
        })
          .then(() => done())
          .catch(() => done(new Error('Videogame was not created, not has a valid name')));
      });

    });
  });
});
