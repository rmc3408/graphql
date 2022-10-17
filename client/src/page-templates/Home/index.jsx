import P from 'prop-types';
import * as Styled from './styles';
import { Heading } from 'components/Heading';
import { useState } from 'react';
import { Post } from 'components/Post';
import { Helmet } from 'react-helmet';
import { useQuery, gql } from '@apollo/client';

//import GET_POSTS_MOCK from 'mock/posts';
const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      user {
        firstName
        id
      }
      title
      body
      createdAt
    }
  }
`;

export const Home = () => {
  //const [dataMock] = useState(GET_POSTS_MOCK.data);
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Helmet title="Home - GraphQL + Apollo-Client - Otávio Miranda" />

      <Styled.HeadingContainer>
        <Heading>Posts</Heading>
      </Styled.HeadingContainer>

      {/* MOCKED RESULTS */}
      <Styled.PostsContainer>
        {data.getPosts.slice(-3).map((post) => {
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
