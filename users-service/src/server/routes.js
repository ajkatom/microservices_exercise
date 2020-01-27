import addHours from 'date-fns/addHours';
import { User, UserSession } from '#root/db/models';
import authentication from '#root/helpers/authentication';
import generateUUID from '#root/helpers/generateUUID';
import hashPassword from '#root/helpers/hashPassword';

const userSessionTimeLimitHrs = 1;

const setRoutes = app => {
  app.post('/sessions', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error('!invalid body!'));
    }

    try {
      const user = await User.findOne({ attributes: {}, where: { email: req.body.email } });
      if (!user) return next(new Error('invalid email'));

      if (!authentication(req.body.password, user.passwordHash)) {
        return next(new Error('invalid password!'));
      }
      const expiresAt = addHours(new Date(), userSessionTimeLimitHrs);
      const sessionId = generateUUID();

      const userSession = await UserSession.create({
        expiresAt: expiresAt,
        id: sessionId,
        userId: user.id,
      });

      return res.json(userSession);
    } catch (e) {
      return next(e);
    }
  });

  app.get('/sessions/:sessionId', async (req, res, next) => {
    try {
      const userSession = await UserSession.findByPk(req.params.sessionId);
      if (!userSession) return new Error('invalid session id');
      return res.json(userSession);
    } catch (e) {
      return next(e);
    }
  });
  app.delete('/sessions/:sessionId', async (req, res, next) => {
    try {
      const userSession = await UserSession.findByPk(req.params.sessionId);
      if (!userSession) return new Error('invalid session id');
      await userSession.destroy();
      return res.end();
    } catch (e) {
      return next(e);
    }
  });

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

  app.get(`/users/:userId`, async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) return new Error('invalid user ID');
      return res.json(user);
    } catch (e) {
      return next(e);
    }
  });
};

export default setRoutes;
