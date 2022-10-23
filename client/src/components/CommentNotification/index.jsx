import { CommentPropTypes } from 'components/Post/prop-types';
import { authVar } from 'graphql/vars/auth';
import P from 'prop-types';
import * as Styled from './styles';

export const CommentNotification = ({ comment }) => {
  const auth = authVar.hydrate();

  console.log(comment);
  return (
    <Styled.ToastNotificationContainer>
      <p>
        <strong>{auth.userName}</strong> comentou:
      </p>
      <p>
        {comment.slice(0, 12)} {comment.length > 12 && '...'}
      </p>
    </Styled.ToastNotificationContainer>
  );
};

CommentNotification.propTypes = {
  comment: P.shape(CommentPropTypes.propTypes),
};
