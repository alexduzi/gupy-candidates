const mongoose = require('mongoose');

const Candidate = mongoose.model('candidate');
const Experience = mongoose.model('experience');

module.exports = app => {

  app.get('/api/candidate', async (req, res) => {

    const candidates = await Candidate.find({ }).populate('experiences');

    res.status(200).send({ candidates });
  });

  app.get('/api/candidate/:candidateId', async (req, res) => {

    const { candidateId } = req.params;

    const candidates = await Candidate.find({ _id: candidateId }).populate('experiences');

    res.status(200).send({ candidates });
  });

  app.post('/api/candidate', async (req, res) => {

    const { name, lastName, email, birthDate, age, title } = req.body;

    const candidate = new Candidate({ name, lastName, email, birthDate, age, title });

    try {

      await candidate.save();

      res.status(200).send({ ok: !candidate.isNew });
    } catch (e) {

    }

  });

  app.post('/api/candidate/:candidateId/experience', async (req, res) => {

    const { candidateId } = req.params;
    const { experiences } = req.body;

    res.status(200).send({ candidates });
  });

  app.put('/api/candidate', async (req, res) => {

    const { candidate } = req.body;

    try {
      await Candidate.findByIdAndUpdate(candidate._id, { ...candidate });

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
