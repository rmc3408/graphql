import { AuthenticationError } from 'apollo-server';

export function checkOwnership(logged, userId) {
  checkIsLoggedIn(logged);
  if (logged !== userId) throw new AuthenticationError('cannot change info from other user');
}

export function checkIsLoggedIn(logged) {
  if (!logged || logged === 'wrong') throw new AuthenticationError('you must be logged in');
}
