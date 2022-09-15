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
  
  return { userId: id, token: newToken }
}

function checkHashPassword(data, hash) {
  return bcrypt.compare(data.password, hash)
}

function createToken(data) {
  const newtoken = jwt.sign({ userId: data }, process.env.JWT_SECRET, { expiresIn: '2d' });
  return newtoken
}
