const assert = require('assert');
const Candidate = require('../models/candidate');
const Experience = require('../models/experience');

describe('Creating records', () => {

  it('create new candidate', (done) => {

    const newCandidate = new Candidate({
      name: 'Alex',
      lastName: 'Duzi',
      age: 27,
      title: 'Full stack developer',
      createdAt: Date.now()
    });

    newCandidate.save()
      .then(() => Candidate.findOne({ name: 'Alex' }))
      .then((candidate) => {
        assert(!newCandidate.isNew);
        assert(candidate.name === 'Alex');
        assert(candidate.lastName === 'Duzi');
        assert(candidate.age === 27);
        done();
      });
  });

});
