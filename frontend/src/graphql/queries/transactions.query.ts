import { gql } from "@apollo/client";

export const GET_ALL_TRANSACTION = gql`
 query getAllTransactions {
   transactions {
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
`


export const GET_TRANSACTION_BY_ID = gql`
  query GetTransactionById($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
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