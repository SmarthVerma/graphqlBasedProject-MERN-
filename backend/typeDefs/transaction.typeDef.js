const transactionTypeDef = `#graphql

  enum Category {
        SAVING
        EXPENSE
        INVESTMENT
    }
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: Category!
        amount: Float!
        location: String
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category: Category!
        amount: Float!
        location: String
        date: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
`

export default transactionTypeDef