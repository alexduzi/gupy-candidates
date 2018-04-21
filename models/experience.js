const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
  company: String,
  position: String,
  order: Number,
  jobDescription: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  finalDate: {
    type: Date,
    default: undefined
  },
  isCurrentJob: Boolean,
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'candidate'
  }
});

const Experience = mongoose.model('experience', ExperienceSchema);

module.exports = Experience;
