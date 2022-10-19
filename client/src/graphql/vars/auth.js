import { makeVar, useReactiveVar } from '@apollo/client';
import { loginFormVar } from './login';

const LOCAL_AUTH = '__auth__';
const initialVar = {
  userName: '',
  token: '',
  userId: '',
  isLoggedBefore: false,
};

const authVarFunction = makeVar({ ...initialVar });

export const authVar = {
  get() {
    return authVarFunction();
  },
  set(data) {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_AUTH, stringifiedData);
    authVarFunction(data);
  },
  reset() {
    localStorage.removeItem(LOCAL_AUTH);
    authVarFunction({ ...initialVar });
    this.hydrate();
  },
  hydrate() {
    let formData = authVar.get();
    let localData = localStorage.getItem(LOCAL_AUTH);

    if (JSON.stringify(formData) !== localData && localData) {
      const { userName, userId, token } = JSON.parse(localData);
      authVar.set({
        userName,
        userId,
        token,
        isLoggedBefore: true,
      });
    }
    return authVar.get();
  },
};
