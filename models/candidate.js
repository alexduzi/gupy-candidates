const mongoose = require('mongoose');
const { Schema } = mongoose;

const CandidateSchema = new Schema({
  name: String,
  lastName: String,
  age: Number,
  title: String,
  email: String,
  phoneNumber: String,
  birthDate: { type: Date, default: undefined },
  createdAt: { type: Date, default: Date.now },
  experiences: [{
    type: Schema.Types.ObjectId,
    ref: 'experience'
  }]
},{
  usePushEach: true
});

const Candidate = mongoose.model('candidate', CandidateSchema);

module.exports = Candidate;
