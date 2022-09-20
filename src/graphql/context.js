import jwt from 'jsonwebtoken';

export const context = async ({req}) => {
  const loggedUserID = await authorizingUser(req.headers.authorization || 'bearer  ');
  return {
    loggedUserID,
  };
};

async function authorizingUser(auth) {
  try {
    const [ bearer, token ] = auth.split(' ');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user.userId;
  } catch (error) {
    //console.log(error.message);
    return 'wrong'
  }
}