import jwt from 'jsonwebtoken';

export const context = ({ req }) => {

  const isLogIn = authorizingUser(req.headers.authorization || 'bearer  ');
  return {
    isLogIn,
  };
};

function authorizingUser(auth) {
  try {
    const [ bearer, token ] = auth.split(' ');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user.userId;
  } catch (error) {
    return ''
  }
}