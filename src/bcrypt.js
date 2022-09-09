import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

(async () => {
  const password = '123456';
  const passwordHash = await bcrypt.hash(password, 2);
  console.log('Hash ', passwordHash)

  const secondPassword = '123456';

  const passwordIsValid = await bcrypt.compare(secondPassword,passwordHash);

  console.log('Is equal ',passwordIsValid);
})();

(async () => {
  const JWT_SECRET = 'rmcSECRET';

  let token = jwt.sign({ userId: 'Raphael' }, JWT_SECRET, { expiresIn: '2d' });
  console.log('TOKEN ', token)

  const delay = () => new Promise((r) => setTimeout(r, 5000));
  await delay();

  const tokenData = jwt.verify(token, JWT_SECRET);

  console.log(tokenData);
})();