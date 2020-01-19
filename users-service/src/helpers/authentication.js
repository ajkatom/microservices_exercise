import bcrypt from 'bcryptjs';

const authentication = (passwordToTest, passwordHash) =>
  bcrypt.compareSync(passwordToTest, passwordHash);

export default authentication;
