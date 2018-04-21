const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect(keys.mongoURI, { useMongoClient: true });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  // mongoose.connection.db.listCollections({ name: 'candidates' })
  //   .next(function(err, collinfo) {
  //       if (collinfo) {
  //           const { candidates, experiences } = mongoose.connection.collections;
  //           candidates.drop(() => {
  //             experiences.drop(() => done());
  //           });
  //       }
  //   });
  done();
});
