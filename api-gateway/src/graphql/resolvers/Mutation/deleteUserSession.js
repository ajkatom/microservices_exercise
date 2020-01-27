import UsersService from '#root/adapters/UsersService';

const deleteUserSessionResolver = async (obj, { sessionId }, context) => {
  console.log('############');
  await UsersService.deleteUserSession({ sessionId });
  context.res.clearCookie('userSessionId');
  return true;
};

export default deleteUserSessionResolver;
