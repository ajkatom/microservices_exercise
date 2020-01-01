const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const accessEnv = require('../helpers/accessEnv');
const setRoutes = require('./routes').default;

const PORT = accessEnv('PORT', 7100);

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

setRoutes(app);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`listing server listining on port ${PORT}`);
});
