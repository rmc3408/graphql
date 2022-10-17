import { AuthForm } from 'components/AuthForm';
import { Helmet } from 'react-helmet';
import { resetApolloContext, useMutation } from '@apollo/client';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { Loading } from 'components/Loading';
//import { DefaultError } from 'components/DefaultError';

export const Login = () => {
  const [addUser, { data, loading, error }] = useMutation(GQL_LOGIN, {
    onError: ({ networkError, graphQLErrors }) => {
      console.log('👮🏻‍♀️ Network error', networkError.message);
      console.log('👮🏻‍♀️ GraphQL error', graphQLErrors[0]?.message);
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
  };

  if (loading) return <Loading loading={loading} />;
  //if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login" />
      <AuthForm handleLogin={handleLogIn} formDisabled={false} formError={error?.message} />
    </>
  );
};
