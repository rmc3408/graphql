import jwt from 'jsonwebtoken';
import { UsersApi } from './user/datasources';

export const context = async ({ req }) => {

  const isLogIn = await authorizingUser(req.headers.authorization || 'bearer  ');
  return {
    isLogIn,
  };
};

async function authorizingUser(auth) {
  try {
    const [ bearer, token ] = auth.split(' ');
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi();
    userApi.initialize({});
    const foundUser = await userApi.getUser(user.userId);

    if (foundUser.token !== token) return '';

    return user.userId;
  } catch (error) {
    //console.log(error.message);
    return ''
  }
}