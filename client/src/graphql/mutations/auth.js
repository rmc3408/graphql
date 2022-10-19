import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation AUTH_IN($data: SignInInput) {
    signInUser(data: $data) {
      userId
      token
    }
  }
`;

export const GQL_LOGOUT = gql`
  mutation AUTH_OUT($userName: String!) {
    signOutUser(userName: $userName)
  }
`;
