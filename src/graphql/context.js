import jwt from 'jsonwebtoken';

export const context = ({ req, res }) => {
  let loggedUserID = verifyAuthHeaders(req.headers.authorization);

  if (loggedUserID === 'wrong') {
    if (req && req.headers && req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserID = verifyAuthHeaders('bearer ' + jwtToken);
    }
  }

  return {
    loggedUserID,
    response: res,
  };
};

export const contextWS = (auth) => {
  let loggedUserID = verifyAuthHeaders(auth);

  if (loggedUserID === 'wrong') {
    if (auth.includes('jwtToken')) {
      const { jwtToken } = cookieParser(auth);
      loggedUserID = verifyAuthHeaders('bearer ' + jwtToken);
    }
  }

  return {
    loggedUserID,
    response: 'Hello',
  };
};

export function verifyAuthHeaders(fulltoken) {
  try {
    const [bearer, token] = fulltoken.split(' ');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user.userId;
  } catch (error) {
    //console.log(error.message);
    return 'wrong';
  }
}

const cookieParser = (cookiesHeader) => {
  // The final goal is to return an object with key/value reflecting
  // the cookies. So, this functions always returns an object.

  // If we do not receive a string, we won't do anything.
  if (typeof cookiesHeader != 'string') return {};

  const cookies = cookiesHeader.split(/;\s*/);

  // If we have something similar to cookie, we want to add them
  // to the final object
  const parsedCookie = {};
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    parsedCookie[key] = value;
  }

  // The reason I'm using JSON here is to make sure the final
  // object won't have any undefined value.
  return JSON.parse(JSON.stringify(parsedCookie));
};
