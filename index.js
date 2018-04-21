const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const keys = require('./config/keys');

require('./models/candidate');
require('./models/experience');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'dev') {
  mongoose.set('debug', true);
}

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

require('./routes/candidateRoutes')(app);
require('./routes/experienceRoutes')(app);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
