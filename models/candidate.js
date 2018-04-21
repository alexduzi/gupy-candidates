const mongoose = require('mongoose');
const { Schema } = mongoose;

const CandidateSchema = new Schema({
  name: String,
  lastName: String,
  age: Number,
  title: String,
  email: String,
  birthDate: { type: Date, default: undefined },
  createdAt: { type: Date, default: Date.now },
  experiences: [{
    type: Schema.Types.ObjectId,
    ref: 'experience'
  }]
});

CandidateSchema.virtual('experienceCount').get(function() {
  return this.experiences.length;
});

CandidateSchema.pre('remove', function(next) {
  const Experience = mongoose.model('experience');

  Experience.remove({ _id: { $in: this.experiences } })
    .then(() => next());
});

const Candidate = mongoose.model('candidate', CandidateSchema);

module.exports = Candidate;
