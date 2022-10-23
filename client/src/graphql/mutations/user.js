import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_CREATE_USER = gql`
  mutation CREATE_USER($data: CreateUserInput) {
    createUser(data: $data) {
      ...user
    }
  }
  ${GQL_FRAGMENT_USER}
`;

export const GQL_DELETE_USER = gql`
  mutation DELETE_USER($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

export const GQL_UPDATE_USER = gql`
  mutation UPDATE_USER($patchUserId: ID!, $patchUserData: UpdateUserInput!) {
    patchUser(id: $patchUserId, data: $patchUserData) {
      ...user
    }
  }
  ${GQL_FRAGMENT_USER}
`;
