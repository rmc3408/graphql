import P from 'prop-types';
import { Footer } from 'components/Footer';
import { Menu } from 'components/Menu';
import { authVar } from 'graphql/vars/auth';
import { GQL_LOGOUT } from 'graphql/mutations/auth';
import { useMutation, useSubscription } from '@apollo/client';
import { GQL_SUB_CREATE_COMMENT } from 'graphql/subscription/comment';
import { toast } from 'react-toastify';
import { CommentNotification } from 'components/CommentNotification';
import { notificationVar } from 'graphql/vars/notification';

export const Main = ({ children }) => {
  let dataLogin = authVar.hydrate();
  const [logoutUser] = useMutation(GQL_LOGOUT, {
    errorPolicy: 'all',
  });

  useSubscription(GQL_SUB_CREATE_COMMENT, {
    skip: !notificationVar.get(),
    onData({ data, error, loading }) {
      const comment = data.data?.onCreatedComment;

      return toast.dark(<CommentNotification comment={comment} />, {
        autoClose: false,
        position: 'bottom-right',
        hideProgressBar: true,
      });
    },
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      logoutUser({
        variables: {
          userName: dataLogin.userId,
        },
      });
      authVar.reset();
      window.location.href = '/login';
    } catch (error) {
      // catch
    }
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
