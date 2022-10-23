import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_SUB_CREATE_COMMENT = gql`
  subscription SUB_CREATE_COMMENT {
    onCreatedComment {
      comment
    }
  }
`;
