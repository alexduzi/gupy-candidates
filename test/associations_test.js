const assert = require('assert');
const Candidate = require('../models/candidate');
const Experience = require('../models/experience');

describe('Creating associations', () => {

  let newCandidate;

  beforeEach((done) => {
    newCandidate = new Candidate({
      name: 'Alex',
      lastName: 'Duzi',
      age: 27,
      title: 'Full stack developer',
      createdAt: Date.now()
    });

    const exp1 = new Experience({
      company: 'Gupy',
      position: 'Full stack dev',
      jobDescription: 'Develop high quality software using react / nodejs / python',
      startDate: Date.now(),
      finalDate: undefined,
      isCurrentJob: true
    });

    newCandidate.experiences.push(exp1);
    exp1.candidate = newCandidate;

    Promise.all([newCandidate.save(), exp1.save()])
      .then(() => done());
  });

  it('create new candidate with experiences', (done) => {

    Candidate.findOne({ name: 'Alex' })
      .populate('experiences')
      .then((candidate) => {
        console.log(candidate)
        assert(candidate.experiences.length > 0);
        assert(candidate.experiences[0].company === 'Gupy');
        done();
      });

  });

});
