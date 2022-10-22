import { Post } from 'components/Post';
import { Comment } from 'components/Comment';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CommentForm } from 'components/CommentForm';

// MOCKED DATA
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { Loading } from 'components/Loading';
import { GQL_GET_POST } from 'graphql/queries/post';
import { authVar } from 'graphql/vars/auth';

export const PostDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, data } = useQuery(GQL_GET_POST, {
    variables: { getPostId: id },
  });

  const auth = authVar.hydrate();
  if (loading) return <Loading loading={loading} />;
  if (!data) return null;
  const { getPost } = data;

  return (
    <>
      <Helmet title="Post Details" />

      <Post
        id={getPost.id}
        title={getPost.title}
        body={getPost.body}
        user={getPost.user}
        createdAt={getPost.createdAt}
        loggedUserId={auth.userId}
      />

      {getPost.comment.map((comment) => {
        return (
          <Comment
            key={`post-details-comment-${comment.id}`}
            comment={comment.comment}
            createdAt={comment.createdAt}
            id={comment.id}
            user={comment.user}
          />
        );
      })}

      <CommentForm handleSubmit={(comment) => toast.success(`Your comment is: ${comment}`)} />
    </>
  );
};
