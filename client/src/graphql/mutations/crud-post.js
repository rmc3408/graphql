import { gql } from '@apollo/client';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/post';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_DELETE_POST = gql`
  mutation DELETE_POST($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;

export const GQL_UPDATE_POST = gql`
  mutation updatePost($pId: ID!, $pData: UpdatePostInput!) {
    patchPost(id: $pId, data: $pData) {
      ...post
      user {
        ...user
      }
    }
  }
  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
`;

export const GQL_CREATE_POST = gql`
  mutation createPost($pData: CreatePostInput!) {
    createPost(data: $pData) {
      ...post
      user {
        ...user
      }
    }
  }
  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
`;
