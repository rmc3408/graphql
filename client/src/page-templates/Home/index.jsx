import P from 'prop-types';
import * as Styled from './styles';
import { Heading } from 'components/Heading';
import { Post } from 'components/Post';
import { Helmet } from 'react-helmet';
import { useQuery, gql } from '@apollo/client';
import { Loading } from 'components/Loading';
import { DefaultError } from 'components/DefaultError';
import { GQL_POSTS } from 'graphql/queries/post';
import { FormButton } from 'components/FormButton';
import { authVar } from 'graphql/vars/auth';

export const Home = () => {
  const { loading, error, data, fetchMore, previousData } = useQuery(GQL_POSTS, {
    notifyOnNetworkStatusChange: true,
  });
  const { userId } = authVar.hydrate();

  if (loading && !previousData) return <Loading loading={loading} />;
  if (error) return <DefaultError error={error} />;
  if (!data) return <h1>empty data</h1>;

  const handleLoadMore = async () => {
    if (data.getPosts.length === 0) return;

    await fetchMore({
      variables: {
        start: data.getPosts.length,
      },
    });
  };

  return (
    <>
      <Helmet title="Home - GraphQL + Apollo-Client" />

      <Styled.HeadingContainer>
        <Heading>Posts</Heading>
      </Styled.HeadingContainer>

      {/* MOCKED RESULTS */}
      <Styled.PostsContainer>
        {data.getPosts.map((post) => {
          const uniqueKey = `home-post-${post.id}`;
          return (
            <Post
              key={uniqueKey}
              id={post.id}
              title={post.title}
              body={post.body}
              user={post.user}
              createdAt={post.createdAt}
              loggedUserId={userId}
            />
          );
        })}
      </Styled.PostsContainer>

      <Styled.HeadingContainer>
        <FormButton clickedFn={handleLoadMore} disabled={loading}>
          {loading ? 'loading' : 'Load More'}
        </FormButton>
      </Styled.HeadingContainer>
    </>
  );
};

Home.propTypes = {
  children: P.oneOfType([P.node, P.string]),
};
