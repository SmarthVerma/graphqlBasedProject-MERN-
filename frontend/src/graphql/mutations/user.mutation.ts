import { gql } from "@apollo/client";

// Define the SIGNUP mutation
export const SIGNUP = gql`
  mutation SignupUser($input: SignUpInput!) {
    signup(input: $input) {
      _id
      username
      name
      gender
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      name
      gender
    }
  }
`;
