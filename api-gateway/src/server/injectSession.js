import UserService from '../adapters/UsersService';

const injectSession = async (req, res, next) => {
  console.log(req);
  if (req.cookies.userSessionId) {
    const userSession = await UserService.fetchUserSession({
      sessionId: req.cookies.userSessionId,
    });
    res.locals.userSession = userSession;
  }

  return next();
};

export default injectSession;
