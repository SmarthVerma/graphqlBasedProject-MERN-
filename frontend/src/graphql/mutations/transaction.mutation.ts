import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
