import UserService from '#root/adapters/UsersService';

const UserSession = {
  user: async userSession => {
    return await UserService.fetchUser({ userId: userSession.userId });
  },
};

export default UserSession;
