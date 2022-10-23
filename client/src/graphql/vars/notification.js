import { makeVar } from '@apollo/client';

const NOTICATION = '__notification__';
const initialVar = false;

const notificationVarFunction = makeVar(initialVar);

export const notificationVar = {
  get() {
    let localData = JSON.parse(localStorage.getItem(NOTICATION));

    if (!localData) {
      notificationVar.set(initialVar);
    }
    return localData;
  },
  set(data) {
    localStorage.setItem(NOTICATION, data);
    notificationVarFunction(data);
  },
  reset() {
    localStorage.removeItem(NOTICATION);
    notificationVarFunction(initialVar);
  },
};
