const mongoose = require('mongoose');

const Candidate = mongoose.model('candidate');
const Experience = mongoose.model('experience');

module.exports = app => {

  app.get('/api/candidate', async (req, res) => {

    let { email, name } = req.query;

    if (email === '') email = undefined;
    if (name === '') name = undefined;

    let candidates = [];

    console.log('email', email)

    if (!email && !name) {
      candidates = await Candidate.find({ }).populate('experiences');
    } else {
      candidates = await Candidate.find({ $or: [ { email: new RegExp(email, 'i'), name: new RegExp(name, 'i') } ] } ).populate('experiences');
    }

    res.status(200).send({ candidates });
  });

  app.get('/api/candidate/:candidateId', async (req, res) => {

    const { candidateId } = req.params;

    const candidate = await Candidate.findOne({ _id: candidateId }).populate('experiences');

    res.status(200).send({ candidate });
  });

  app.post('/api/candidate', async (req, res) => {

    const { name, lastName, email, birthDate, age, title, phoneNumber } = req.body;

    const newCandidate = new Candidate({ name, lastName, email, birthDate, age, title, phoneNumber });

    try {

      await newCandidate.save();

      const candidate = await Candidate.findOne({ _id: newCandidate._id });

      res.status(200).send({ candidate });
    } catch (e) {

    }

  });

  app.put('/api/candidate', async (req, res) => {

    const { name, lastName, email, birthDate, age, title, _id, phoneNumber } = req.body;

    try {
      await Candidate.findByIdAndUpdate(_id, { name, lastName, email, birthDate, age, title, phoneNumber });

      res.status(200).send({ });
    } catch (e) {

    }

  });

  app.delete('/api/candidate/:candidateId', async (req, res) => {

    const { candidateId } = req.params;

    try {
      await Candidate.findByIdAndRemove(candidateId);

      res.status(200).send({ });
    } catch (e) {

    }

  });

};
