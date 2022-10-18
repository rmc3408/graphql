import { AuthForm } from 'components/AuthForm';
import { Helmet } from 'react-helmet';
import { useMutation } from '@apollo/client';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { Loading } from 'components/Loading';
import { loginFormVar } from 'graphql/vars/login';
import { authVar } from 'graphql/vars/auth';

export const Login = () => {
  const [addUser, { data, loading, error }] = useMutation(GQL_LOGIN, {
    onError: ({ networkError, graphQLErrors }) => {
      console.log('👮🏻‍♀️ Network error', networkError?.message);
      console.log('👮🏻‍♀️ GraphQL error', graphQLErrors[0]?.message);
    },
    onCompleted: (data) => {
      authVar.set({
        userName: loginFormVar.get().userName,
        userId: data.signInUser.userId,
        token: data.signInUser.token,
        isLoggedBefore: true,
      });
      window.location.href = '/';
    },
  });

  const handleLogIn = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    addUser({
      variables: {
        data: {
          userName: username.value,
          password: password.value,
        },
      },
    });
    loginFormVar.set({
      userName: username.value,
      password: password.value,
    });
  };

  if (loading) return <Loading loading={loading} />;
  //if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login" />
      <AuthForm handleLogin={handleLogIn} formDisabled={loading} formError={error?.message} />
    </>
  );
};
