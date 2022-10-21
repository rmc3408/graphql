import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_GET_POST } from 'graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from 'components/Loading';
import { GQL_CREATE_POST, GQL_UPDATE_POST } from 'graphql/mutations/crud-post';

export const PostEditor = () => {
  const { id } = useParams();

  const [getPost, { loading, error: getError, data }] = useLazyQuery(GQL_GET_POST);
  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST);
  const [createPost, { error: createError }] = useMutation(GQL_CREATE_POST, {
    onError() {},
    onCompleted() {
      toast.success('Post created!');
      window.location.href = '/';
    },
  });

  const handleSubmit = (value) => {
    toast.success(<pre>{JSON.stringify(value, null, 2)}</pre>);
    if (id) {
      handleUpdate(value);
    } else {
      handleCreate(value);
    }
  };

  const handleUpdate = async (value) => {
    await updatePost({
      variables: {
        pId: id,
        pData: {
          title: value.title,
          body: value.body,
        },
      },
    });
    window.location.href = '/';
  };

  const handleCreate = async (value) => {
    await createPost({
      variables: {
        pData: {
          title: value.title,
          body: value.body,
        },
      },
    });
  };

  useEffect(() => {
    async function fetchPost() {
      await getPost({
        variables: { getPostId: id },
      });
    }

    if (!id) return;
    fetchPost();
  }, [id, getPost]);

  if (loading) return <Loading loading={loading} />;

  const formError = getError
    ? getError.message
    : updateError
    ? updateError.message
    : createError
    ? createError.message
    : '';

  return (
    <>
      <Helmet title="Edit/Create Post" />
      <PostForm handleSubmitCb={(sentValues) => handleSubmit(sentValues)} post={data?.getPost} formError={formError} />
    </>
  );
};
