import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Si($amount: SignUpInput!, $description: String!) {
    addExpense(amount: $amount, description: $description) {
      id
      amount
      description
    }
  }
`;
