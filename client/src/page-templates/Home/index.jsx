import P from 'prop-types';
import * as Styled from './styles';
import { Heading } from 'components/Heading';
import { Post } from 'components/Post';
import { Helmet } from 'react-helmet';
import { useQuery, gql } from '@apollo/client';
import { Loading } from 'components/Loading';
import { DefaultError } from 'components/DefaultError';
import { GQL_POSTS } from 'graphql/queries/post';

export const Home = () => {
  const { loading, error, data } = useQuery(GQL_POSTS);

  if (loading) return <Loading loading={loading} />;
  if (error) return <DefaultError error={error} />;
  if (!data) return <h1>empty data</h1>;

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
            />
          );
        })}
      </Styled.PostsContainer>
    </>
  );
};

Home.propTypes = {
  children: P.node,
};
