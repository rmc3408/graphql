import { AuthenticationError } from "apollo-server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createLoginUserFunction(data, dataloader) { 
  const userFound = await dataloader.get('', 
    { userName: data.userName},
    { cacheOptions: { ttl: 0 }})
  
  const existUserFound = !!userFound.length;
  if (!existUserFound) throw new AuthenticationError('User not found')

  const { passwordHash, id } = userFound[0]
  const isValidHash = await checkHashPassword(data, passwordHash)
  if (!isValidHash) throw new AuthenticationError('Password invalid')
  
  const newToken = createToken(id)
  await dataloader.patch(id, { token: newToken }, { cacheOptions: { ttl: 0 } });
  
  //Create and save a cookie
  dataloader.context.response.cookie('jwtToken', newToken, {
    maxAge: 1000 * 60 * 60 * 24 * 5, //5 days
    secure: false, //only https or ssl
    httpOnly: true, //only acess by cookie
    path: '/',
    samesite: 'strict'
  })


  return { userId: id, token: newToken }
}


export async function logOutUserFunction(un, dataloader) { 
  const userFound = await dataloader.get('', 
    { userName: un},
    { cacheOptions: { ttl: 0 }})
  
  const existUserFound = !!userFound.length;
  if (!existUserFound) throw new AuthenticationError('User not found')

  const { id: userId } = userFound[0]

  if (userId !== dataloader.context.loggedUserID) throw new AuthenticationError('Cannot logout other users')
  
  await dataloader.patch(userId, { token: ''}, { cacheOptions: { ttl: 0 } });
  dataloader.context.response.clearCookie('jwtToken')

  return true
}

function checkHashPassword(data, hash) {
  return bcrypt.compare(data.password, hash)
}

function createToken(data) {
  const newtoken = jwt.sign({ userId: data }, process.env.JWT_SECRET, { expiresIn: '2d' });
  return newtoken
}
