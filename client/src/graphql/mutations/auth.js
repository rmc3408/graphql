import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation AUTH_IN($data: SignInInput) {
    signInUser(data: $data) {
      userId
      token
    }
  }
`;
