import { makeVar, useReactiveVar } from '@apollo/client';

const initialVar = {
  userName: '',
  password: '',
};

const loginVarFunction = makeVar(initialVar);

export const loginFormVar = {
  get() {
    return loginVarFunction();
  },
  set(p) {
    loginVarFunction(p);
  },
  reset() {
    loginVarFunction({ ...initialVar });
  },
  useLoginVars() {
    return useReactiveVar(loginVarFunction);
  },
};
