const mongoose = require('mongoose');

const Candidate = mongoose.model('candidate');
const Experience = mongoose.model('experience');

module.exports = app => {

  app.post('/api/candidate/:candidateId/experience', async (req, res) => {

    const { candidateId } = req.params;
    const { experiences } = req.body;

    try {

      let candidate = await Candidate.findOne({ _id: candidateId });

      for (experience of experiences) {

        let newExperience = new Experience({
          ...experience,
          order: 0,
          candidate: candidate
        });

        await newExperience.save();

        candidate.experiences.push(newExperience);

        await candidate.save();
      }

      res.status(200).send({ });

    } catch (e) {
      console.log(e)
      res.status(500).send({ e });
    }

  });

  app.put('/api/candidate/:candidateId/experience', async (req, res) => {

    const { candidateId } = req.params;
    const { experiences } = req.body;

    try {

      let candidate = await Candidate.findOne({ _id: candidateId });

      for (experience of experiences) {
        if (experience._id) {
          await Experience.findByIdAndUpdate(experience._id, {
            company: experience.company,
            position: experience.position,
            jobDescription: experience.jobDescription,
            finalDate: experience.finalDate,
            isCurrentJob: experience.isCurrentJob,
            order: experience.order,
            startDate: experience.startDate
          });

        } else {
          let newExperience = new Experience({
            ...experience,
            order: 0,
            candidate: candidate
          });

          await newExperience.save();

          candidate.experiences.push(newExperience);

          await candidate.save();

        }
      }

      res.status(200).send({ });

    } catch (e) {
      console.log(e)
      res.status(500).send({ e });
    }

  });

  app.delete('/api/candidate/:candidateId/experience/:experienceId', async (req, res) => {

    const { candidateId, experienceId } = req.params;

    try {

      let candidate = await Candidate.findOne({ _id: candidateId }).populate('experiences');
      console.log(experienceId)
      candidate.experiences.pull(experienceId);

      await candidate.save();

      res.status(200).send({ });

    } catch (e) {
      console.log(e)
      res.status(500).send({ e });
    }

  });

};
