import { gql } from '@apollo/client';

export const GQL_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      firstName
      lastName
      userName
      createdAt
    }
  }
`;
