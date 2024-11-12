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