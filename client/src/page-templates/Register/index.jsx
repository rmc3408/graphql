import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { DefaultContainer } from 'components/DefaultContainer';
import { FormButton } from 'components/FormButton';
import { RegisterForm } from 'components/RegisterForm';
import { GQL_LOGOUT } from 'graphql/mutations/auth';
import { GQL_CREATE_USER, GQL_DELETE_USER, GQL_UPDATE_USER } from 'graphql/mutations/user';
import { GQL_USER } from 'graphql/queries/user';
import { authVar } from 'graphql/vars/auth';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Register = () => {
  const auth = authVar.hydrate();
  const history = useHistory();
  //const client = useApolloClient();
  const [getUser, userData] = useLazyQuery(GQL_USER);
  const [logoutUser] = useMutation(GQL_LOGOUT, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (auth.isLoggedBefore && !userData?.data?.getUser) {
      getUser({
        variables: {
          getUserId: auth.userId,
        },
      });
    }
  }, [auth, userData?.data, getUser]);

  const handleLogout = async () => {
    try {
      logoutUser({
        variables: {
          userName: auth.userId,
        },
      });
      authVar.reset();
      window.location.href = '/login';
    } catch (error) {
      // catch
    }
  };

  const [createUser, createUserData] = useMutation(GQL_CREATE_USER, {
    onError() {},
    onCompleted() {
      toast.success('Account created. You can login now.');
      history.push('/login');
    },
  });
  const handleCreateUser = async (formData) => {
    await createUser({
      variables: {
        data: formData,
      },
    });
  };

  const [deleteUser, deleteUserData] = useMutation(GQL_DELETE_USER, {
    onError() {},
    onCompleted() {
      handleLogout();
    },
  });
  const handleDelete = async () => {
    const shouldDelete = confirm('Are you sure?');

    if (!shouldDelete) return;

    await deleteUser({
      variables: {
        deleteUserId: auth.userId,
      },
    });
  };

  const [updateUser, updateUserData] = useMutation(GQL_UPDATE_USER, {
    onError() {},
    onCompleted() {
      handleLogout();
    },
  });
  const handleUpdateUser = async (formData) => {
    const cleanedFormData = {};

    for (const key in formData) {
      if (formData[key]) {
        cleanedFormData[key] = formData[key];
      }
    }

    await updateUser({
      variables: {
        patchUserId: auth.userId,
        patchUserData: { ...cleanedFormData },
      },
    });
  };

  const handleSubmit = (formData) => {
    toast.success(<pre>{JSON.stringify(formData, null, 2)}</pre>);
    if (!auth.isLoggedBefore) return handleCreateUser(formData);
    return handleUpdateUser(formData);
  };

  return (
    <>
      <Helmet title="Register" />

      <RegisterForm
        handleSubmitCb={handleSubmit}
        authData={userData?.data?.getUser}
        formError={
          updateUserData?.error?.message ||
          createUserData?.error?.message ||
          deleteUserData?.error?.message ||
          userData?.error?.message
        }
        somethingLoading={
          updateUserData.loading || createUserData.loading || deleteUserData.loading || userData.loading
        }
      />

      {auth.isLoggedBefore && (
        <DefaultContainer>
          <FormButton bgColor="secondary" onClick={handleDelete}>
            Delete account
          </FormButton>
        </DefaultContainer>
      )}
    </>
  );
};
