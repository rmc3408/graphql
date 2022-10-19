import P from 'prop-types';
import { Footer } from 'components/Footer';
import { Menu } from 'components/Menu';
import { authVar } from 'graphql/vars/auth';
import { GQL_LOGOUT } from 'graphql/mutations/auth';
import { useMutation } from '@apollo/client';

export const Main = ({ children }) => {
  let dataLogin = authVar.hydrate();
  const [logoutUser] = useMutation(GQL_LOGOUT, {
    errorPolicy: 'all',
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    logoutUser({
      variables: {
        userName: dataLogin.userId,
      },
    });
    authVar.reset();
    window.location.href = '/login';
  };

  return (
    <>
      <Menu data={dataLogin} handleLogout={handleLogout} />
      {children}
      <Footer />
    </>
  );
};

Main.propTypes = {
  children: P.node,
};
