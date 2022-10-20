import { gql } from '@apollo/client';

export const GQL_DELETE_POST = gql`
  mutation DELETE_POST($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;
