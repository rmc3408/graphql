import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

(async () => {
  const password = '123456';
  const passwordHash = await bcrypt.hash(password, 2);
  console.log('Hash ', passwordHash)

  const secondPassword = '123456';

  const passwordIsValid = await bcrypt.compare(secondPassword,passwordHash);

  console.log('Password between Hash and sent is equal =',passwordIsValid);
})();

(async () => {
  const JWT_SECRET = 'rmcSECRET';

  let token = jwt.sign({ userId: 'Raphael' }, JWT_SECRET, { expiresIn: '10s' });
  console.log('TOKEN ', token)

  const delay = () => new Promise((r) => setTimeout(r, 2000));
  await delay();

  const tokenData = jwt.verify(token, JWT_SECRET);

  console.log(tokenData);
})();