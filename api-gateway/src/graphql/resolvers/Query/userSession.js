const UserSessionsResolver = async (obj, args, context) => {
  if (args.me !== true) throw new Error('unsupported argument');
  return context.res.locals.userSession;
};

export default UserSessionsResolver;
