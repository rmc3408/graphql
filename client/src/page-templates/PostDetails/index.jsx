import { Post } from 'components/Post';
import { Comment } from 'components/Comment';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CommentForm } from 'components/CommentForm';

// MOCKED DATA
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from 'components/Loading';
import { GQL_GET_POST } from 'graphql/queries/post';
import { authVar } from 'graphql/vars/auth';
import { GQL_CREATE_COMMENT } from 'graphql/mutations/comment';
import { GQL_FRAGMENT_COMMENT } from 'graphql/fragments/comment';
import { GQL_USER } from 'graphql/queries/user';

export const PostDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const auth = authVar.hydrate();

  const { loading, data } = useQuery(GQL_GET_POST, {
    variables: { getPostId: id },
  });

  const [createComment, { loading: loadingCreate }] = useMutation(GQL_CREATE_COMMENT, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({ __typename: 'Post', id }),
        fields: {
          comment(existing, args) {
            const commentRef = cache.writeFragment({
              fragment: GQL_FRAGMENT_COMMENT,
              data: data.createComment,
            });
            return [commentRef, ...existing];
          },
        },
      });
    },
  });

  const { data: dataUser } = useQuery(GQL_USER, {
    variables: {
      getUserId: auth.userId,
    },
  });

  const handleCreateComment = async (comment, callbacksetComment) => {
    toast.success(`Your comment is: ${comment}`);
    await createComment({
      variables: {
        data: {
          comment,
          postId: id,
        },
      },
    });
    callbacksetComment();
  };

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
        numberOfComments={getPost.numberOfcomments}
      />

      {getPost.comment.map((comment) => {
        return (
          <Comment
            key={`post-details-comment-${comment.id}`}
            comment={comment.comment}
            createdAt={comment.createdAt}
            id={comment.id}
            user={dataUser.getUser}
          />
        );
      })}

      <CommentForm handleSubmit={handleCreateComment} buttonDisabled={loadingCreate} />
    </>
  );
};
