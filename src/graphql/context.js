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
  // If we do not receive a string, we won't do anything.
  if (typeof cookiesHeader != 'string') return {};

  const cookies = cookiesHeader.split(/;\s*/);

  const parsedCookie = {};
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    parsedCookie[key] = value;
  }

  return JSON.parse(JSON.stringify(parsedCookie));
};

export const contextWS = (auth) => {
  let loggedUserID = verifyAuthHeaders(auth);

  if (!loggedUserID || loggedUserID === 'wrong') {
    if (auth.includes('jwtToken')) {
      const { jwtToken } = cookieParser(auth);
      loggedUserID = verifyAuthHeaders('bearer ' + jwtToken);
    }
  }

  return {
    loggedUserID,
  };
};
