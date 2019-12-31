// const Listings = require('../db')

const setRoutes = app => {
  app.get('/users', (req, res, next) => {
    return res.json({ msg: 'users works' });
  });
};

export default setRoutes;
