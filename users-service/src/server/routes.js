const { User } = require('../db/models');
const generateUUID = require('../helpers/generateUUID');
const hashPassword = require('../helpers/hashPassword');

const setRoutes = app => {
  app.post('/users', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error('invalid body!'));
    }

    try {
      const newUser = await User.create({
        email: req.body.email,
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
      });

      return res.json(newUser);
    } catch (e) {
      return next(e);
    }
  });
};

export default setRoutes;
