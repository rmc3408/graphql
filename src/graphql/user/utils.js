import { UserInputError, ValidationError } from "apollo-server";
import bcrypt from 'bcrypt';

export const creatingUserFunction = async (values, dataSource) => {
  await checkUserFields(values, true);

  const indexRefUser = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });
  const indexRef = indexRefUser[0].indexRef + 1;

  const foundUser = await userExists(values.userName, dataSource);

  if (typeof foundUser !== 'undefined') {
    throw new ValidationError(
      `userName ${values.userName} has already been taken`,
    );
  }

  return dataSource.post('', {
    ...values,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};


const validateUserName = (userName) => {
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) {
    throw new ValidationError(`userName must match ${userNameRegExp}`);
  }
};

const validateUserPassword = (password) => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{3,12}$/;

  if(!password.match(passRegex)) {
    throw new UserInputError('must have at least one number, one lowercase and one uppercase letter')
  }
};

const userExists = async (userName, dataSource) => {
  // /users/?userName=nomeBuscado
  const found = await dataSource.get('', {
    userName,
  });
  return found[0];
};

const checkUserFields = async (user, allFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName', 'password'];

  for (const field of userFields) {
    if (!allFieldsRequired) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }

    if (field === 'userName') {
      validateUserName(user[field]);
    }

    if (field === 'password') {
      validateUserPassword(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }

  if (user.password && !user.passwordHash) {
    const { password } = user;
    const passwordHash = await bcrypt.hash(password, 2)
    
    user['passwordHash'] = passwordHash 
    delete user['password']
    console.log(user)
  }
};


export const updatingUserFunction = async (id, values, dataSource) => {
  if (!id) {
    throw new ValidationError('Missing user Id');
  }

  if (values?.userId) {
    await postExists(values.indexRef, dataSource)
  }

  if (typeof values.firstName !== 'undefined' || typeof values.lastName !== 'undefined') {
    if (values.lastName === '' || values.lastName === '') {
      throw new ValidationError('Not accept empty in any names')
    }
  }

  return await dataSource.patch(id, { ...values });
};

export const deletingUserFunction = async (id, dataSource) => {
  if (!id) {
    throw new ValidationError('Missing user Id');
  }

  const result = await dataSource.delete(id);
  return !!result;
};
