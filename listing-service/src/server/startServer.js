import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import accessEnv from '#root/helpers/accessEnv';
import setRoutes from './routes';

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

app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`listing server listining on port ${PORT}`);
});
