import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      ...user
    }
  }
  ${GQL_FRAGMENT_USER}
`;
